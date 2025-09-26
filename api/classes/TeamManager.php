<?php

class TeamManager {
    private $db;
    
    public function __construct($database) {
        $this->db = $database->getConnection();
    }
    
    // Create new team
    public function createTeam($data) {
        try {
            $stmt = $this->db->prepare("
                INSERT INTO teams (name, description, owner_id, created_at) 
                VALUES (?, ?, ?, NOW())
            ");
            
            $stmt->execute([
                $data['name'],
                $data['description'],
                $data['owner_id']
            ]);
            
            $team_id = $this->db->lastInsertId();
            
            // Add owner as team member
            $this->addTeamMember($team_id, $data['owner_id'], 'admin');
            
            return [
                'success' => true,
                'message' => 'Team created successfully',
                'team_id' => $team_id
            ];
            
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    // Add team member
    public function addTeamMember($team_id, $user_id, $role = 'member') {
        try {
            $stmt = $this->db->prepare("
                INSERT INTO team_members (team_id, user_id, role, joined_at) 
                VALUES (?, ?, ?, NOW())
            ");
            
            $stmt->execute([$team_id, $user_id, $role]);
            
            return ['success' => true, 'message' => 'Member added to team successfully'];
            
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    // Remove team member
    public function removeTeamMember($team_id, $user_id) {
        try {
            $stmt = $this->db->prepare("DELETE FROM team_members WHERE team_id = ? AND user_id = ?");
            $stmt->execute([$team_id, $user_id]);
            
            return ['success' => true, 'message' => 'Member removed from team successfully'];
            
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    // Invite to team
    public function inviteToTeam($team_id, $email, $role, $invited_by) {
        try {
            // Check for existing invitation
            $stmt = $this->db->prepare("SELECT id FROM team_invitations WHERE team_id = ? AND email = ? AND status = 'pending'");
            $stmt->execute([$team_id, $email]);
            if ($stmt->fetch()) {
                throw new Exception("Invitation already sent to this email");
            }
            
            // Check if user is already a member
            $stmt = $this->db->prepare("SELECT u.id FROM users u JOIN team_members tm ON u.id = tm.user_id WHERE u.email = ? AND tm.team_id = ?");
            $stmt->execute([$email, $team_id]);
            if ($stmt->fetch()) {
                throw new Exception("User is already a team member");
            }
            
            // Generate invitation token
            $invitation_token = bin2hex(random_bytes(32));
            $expires_at = date('Y-m-d H:i:s', strtotime('+7 days'));
            
            // Insert invitation
            $stmt = $this->db->prepare("
                INSERT INTO team_invitations (team_id, email, role, invitation_token, invited_by, expires_at) 
                VALUES (?, ?, ?, ?, ?, ?)
            ");
            
            $stmt->execute([$team_id, $email, $role, $invitation_token, $invited_by, $expires_at]);
            
            return [
                'success' => true,
                'message' => 'Invitation sent successfully',
                'invitation_token' => $invitation_token,
                'expires_at' => $expires_at
            ];
            
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    // Accept invitation
    public function acceptInvitation($invitation_token, $user_data) {
        try {
            // Validate invitation
            $stmt = $this->db->prepare("
                SELECT ti.*, t.name as team_name 
                FROM team_invitations ti 
                JOIN teams t ON ti.team_id = t.id 
                WHERE ti.invitation_token = ? AND ti.status = 'pending' AND ti.expires_at > NOW()
            ");
            $stmt->execute([$invitation_token]);
            $invitation = $stmt->fetch();
            
            if (!$invitation) {
                throw new Exception("Invalid or expired invitation");
            }
            
            // Check if user exists
            $stmt = $this->db->prepare("SELECT id FROM users WHERE email = ?");
            $stmt->execute([$invitation['email']]);
            $existing_user = $stmt->fetch();
            
            $user_id = null;
            
            if ($existing_user) {
                // User exists, add to team
                $user_id = $existing_user['id'];
            } else {
                // Create new user
                $hashed_password = password_hash($user_data['password'], PASSWORD_DEFAULT);
                
                $stmt = $this->db->prepare("
                    INSERT INTO users (name, email, password, company, role, status, created_at) 
                    VALUES (?, ?, ?, ?, 'user', 'active', NOW())
                ");
                
                $stmt->execute([
                    $user_data['name'],
                    $invitation['email'],
                    $hashed_password,
                    $user_data['company'] ?? ''
                ]);
                
                $user_id = $this->db->lastInsertId();
            }
            
            // Add user to team
            $stmt = $this->db->prepare("
                INSERT INTO team_members (team_id, user_id, role) 
                VALUES (?, ?, ?)
            ");
            $stmt->execute([$invitation['team_id'], $user_id, $invitation['role']]);
            
            // Update invitation status
            $stmt = $this->db->prepare("
                UPDATE team_invitations 
                SET status = 'accepted', accepted_at = NOW() 
                WHERE invitation_token = ?
            ");
            $stmt->execute([$invitation_token]);
            
            return [
                'success' => true,
                'message' => 'Invitation accepted successfully',
                'team_name' => $invitation['team_name'],
                'user_id' => $user_id
            ];
            
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
}
?>
