"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { api, Team, TeamMember, User } from "@/lib/api"
import { useLanguage } from "@/lib/providers"
import { Search, Plus, Users, Mail, UserPlus, UserMinus } from "lucide-react"
import { motion } from "framer-motion"

export function TeamManagement() {
  const { t } = useLanguage()
  const [teams, setTeams] = useState<Team[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)
  const [isManageDialogOpen, setIsManageDialogOpen] = useState(false)

  // Form states
  const [newTeam, setNewTeam] = useState({
    name: "",
    description: ""
  })

  const [inviteData, setInviteData] = useState({
    email: "",
    role: "member" as "admin" | "member"
  })

  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [selectedRole, setSelectedRole] = useState<"admin" | "member">("member")

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const usersResponse = await api.getUsers({ limit: 100 })
      if (usersResponse.success && usersResponse.data) {
        setUsers(usersResponse.data.users || [])
      }
      // Note: Teams API would need to be implemented
      // For now, we'll use mock data
      setTeams([
        {
          id: 1,
          name: "Development Team",
          description: "Main development team",
          owner_id: 1,
          created_at: "2024-01-01T00:00:00Z",
          members: []
        }
      ])
    } catch (error) {
      console.error("Failed to load data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTeam = async () => {
    try {
      const response = await api.createTeam(newTeam)
      if (response.success) {
        loadData()
        setIsCreateDialogOpen(false)
        setNewTeam({ name: "", description: "" })
      }
    } catch (error) {
      console.error("Failed to create team:", error)
    }
  }

  const handleInviteToTeam = async () => {
    if (!selectedTeam) return

    try {
      const response = await api.inviteToTeam(selectedTeam.id, inviteData.email, inviteData.role)
      if (response.success) {
        setIsInviteDialogOpen(false)
        setInviteData({ email: "", role: "member" })
      }
    } catch (error) {
      console.error("Failed to invite user:", error)
    }
  }

  const handleAddMember = async () => {
    if (!selectedTeam || !selectedUser) return

    try {
      const response = await api.addTeamMember(selectedTeam.id, selectedUser.id, selectedRole)
      if (response.success) {
        loadData()
        setIsManageDialogOpen(false)
        setSelectedUser(null)
      }
    } catch (error) {
      console.error("Failed to add member:", error)
    }
  }

  const handleRemoveMember = async (teamId: number, userId: number) => {
    if (confirm("Are you sure you want to remove this member?")) {
      try {
        const response = await api.removeTeamMember(teamId, userId)
        if (response.success) {
          loadData()
        }
      } catch (error) {
        console.error("Failed to remove member:", error)
      }
    }
  }

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Team Management</h2>
          <p className="text-muted-foreground">Create and manage teams</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Team
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search teams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Teams Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          filteredTeams.map((team) => (
            <motion.div
              key={team.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{team.name}</CardTitle>
                    </div>
                    <Badge variant="outline">
                      {team.members?.length || 0} members
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {team.description}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedTeam(team)
                        setIsInviteDialogOpen(true)
                      }}
                      className="gap-2"
                    >
                      <Mail className="h-4 w-4" />
                      Invite
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedTeam(team)
                        setIsManageDialogOpen(true)
                      }}
                      className="gap-2"
                    >
                      <UserPlus className="h-4 w-4" />
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Create Team Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Team</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="team-name">Team Name</Label>
              <Input
                id="team-name"
                value={newTeam.name}
                onChange={(e) => setNewTeam(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter team name"
              />
            </div>
            <div>
              <Label htmlFor="team-description">Description</Label>
              <Textarea
                id="team-description"
                value={newTeam.description}
                onChange={(e) => setNewTeam(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the team's purpose..."
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTeam}>
                Create Team
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Invite to Team Dialog */}
      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite to {selectedTeam?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="invite-email">Email Address</Label>
              <Input
                id="invite-email"
                type="email"
                value={inviteData.email}
                onChange={(e) => setInviteData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="user@example.com"
              />
            </div>
            <div>
              <Label htmlFor="invite-role">Role</Label>
              <Select
                value={inviteData.role}
                onValueChange={(value: "admin" | "member") =>
                  setInviteData(prev => ({ ...prev, role: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleInviteToTeam}>
                Send Invitation
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Manage Team Dialog */}
      <Dialog open={isManageDialogOpen} onOpenChange={setIsManageDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Manage {selectedTeam?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Add Member Section */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3">Add Member</h3>
              <div className="flex gap-2">
                <Select value={selectedUser?.id.toString()} onValueChange={(value) => {
                  const user = users.find(u => u.id === parseInt(value))
                  setSelectedUser(user || null)
                }}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select user" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id.toString()}>
                        {user.name} ({user.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedRole} onValueChange={(value: "admin" | "member") => setSelectedRole(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleAddMember} disabled={!selectedUser}>
                  Add
                </Button>
              </div>
            </div>

            {/* Team Members */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3">Current Members</h3>
              <div className="space-y-2">
                {selectedTeam?.members?.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <span className="font-medium">{member.name}</span>
                      <span className="text-sm text-muted-foreground ml-2">({member.email})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={member.role === 'admin' ? 'default' : 'secondary'}>
                        {member.role}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveMember(selectedTeam.id, member.id)}
                      >
                        <UserMinus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )) || (
                  <p className="text-muted-foreground">No members yet</p>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setIsManageDialogOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
