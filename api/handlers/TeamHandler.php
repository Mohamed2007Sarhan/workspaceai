<?php
require_once '../config/database.php';
require_once '../classes/Database.php';
require_once '../classes/Auth.php';
require_once '../classes/TeamManager.php';

class TeamHandler {
    private $auth;
    private $teamManager;
    
    public function __construct() {
        $db = new Database();
        $this->auth = new Auth($db);
        $this->teamManager = new TeamManager($db);
    }
    
    public function handleRequest($method, $action) {
        // Authenticate user
        $user = $this->authenticateUser();
        if (!$user) {
            $this->sendError('Unauthorized', 401);
            return;
        }
        
        switch ($action) {
            case 'create':
                if ($method === 'POST') {
                    $data = json_decode(file_get_contents('php://input'), true);
                    $data['owner_id'] = $user['id'];
                    
                    $result = $this->teamManager->createTeam($data);
                    echo json_encode($result);
                } else {
                    $this->sendError('Method not allowed', 405);
                }
                break;
                
            case 'add-member':
                if ($method === 'POST') {
                    $data = json_decode(file_get_contents('php://input'), true);
                    
                    $result = $this->teamManager->addTeamMember($data['team_id'], $data['user_id'], $data['role'] ?? 'member');
                    echo json_encode($result);
                } else {
                    $this->sendError('Method not allowed', 405);
                }
                break;
                
            case 'remove-member':
                if ($method === 'DELETE') {
                    $team_id = $_GET['team_id'] ?? '';
                    $user_id = $_GET['user_id'] ?? '';
                    
                    $result = $this->teamManager->removeTeamMember($team_id, $user_id);
                    echo json_encode($result);
                } else {
                    $this->sendError('Method not allowed', 405);
                }
                break;
                
            case 'invite':
                if ($method === 'POST') {
                    $data = json_decode(file_get_contents('php://input'), true);
                    
                    $result = $this->teamManager->inviteToTeam($data['team_id'], $data['email'], $data['role'], $user['id']);
                    echo json_encode($result);
                } else {
                    $this->sendError('Method not allowed', 405);
                }
                break;
                
            case 'accept-invitation':
                if ($method === 'POST') {
                    $data = json_decode(file_get_contents('php://input'), true);
                    
                    $result = $this->teamManager->acceptInvitation($data['invitation_token'], $data);
                    echo json_encode($result);
                } else {
                    $this->sendError('Method not allowed', 405);
                }
                break;
                
            default:
                $this->sendError('Action not found', 404);
        }
    }
    
    private function authenticateUser() {
        $headers = getallheaders();
        $token = $headers['Authorization'] ?? '';
        $token = str_replace('Bearer ', '', $token);
        
        return $this->auth->verifyToken($token);
    }
    
    private function sendError($message, $code = 400) {
        http_response_code($code);
        echo json_encode(['error' => $message, 'success' => false]);
        exit();
    }
}
?>
