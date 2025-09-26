"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Users, 
  Plus, 
  Search, 
  UserPlus, 
  UserMinus, 
  Crown, 
  Shield, 
  User,
  Mail,
  Building,
  Calendar,
  MoreVertical,
  Edit,
  Trash2,
  Eye
} from "lucide-react"

interface Team {
  id: number
  name: string
  description: string
  owner_id: number
  created_at: string
  members: TeamMember[]
}

interface TeamMember {
  id: number
  user_id: number
  name: string
  email: string
  role: 'admin' | 'moderator' | 'member'
  joined_at: string
}

interface User {
  id: number
  name: string
  email: string
  company: string
}

export default function TeamManagement() {
  const [teams, setTeams] = useState<Team[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [showInviteDialog, setShowInviteDialog] = useState(false)
  const [newTeam, setNewTeam] = useState({ name: "", description: "" })
  const [inviteData, setInviteData] = useState({ email: "", role: "member" })

  // Mock data - سيتم استبدالها بـ API calls
  useEffect(() => {
    const mockTeams: Team[] = [
      {
        id: 1,
        name: "فريق التطوير",
        description: "فريق تطوير منصة الذكاء الاصطناعي",
        owner_id: 1,
        created_at: "2024-01-01",
        members: [
          { id: 1, user_id: 1, name: "أحمد محمد", email: "ahmed@company.com", role: "admin", joined_at: "2024-01-01" },
          { id: 2, user_id: 2, name: "فاطمة أحمد", email: "fatima@company.com", role: "moderator", joined_at: "2024-01-02" },
          { id: 3, user_id: 3, name: "محمد علي", email: "mohammed@company.com", role: "member", joined_at: "2024-01-03" },
        ]
      },
      {
        id: 2,
        name: "فريق التسويق",
        description: "فريق التسويق والمبيعات",
        owner_id: 1,
        created_at: "2024-01-05",
        members: [
          { id: 4, user_id: 4, name: "سارة حسن", email: "sara@company.com", role: "admin", joined_at: "2024-01-05" },
          { id: 5, user_id: 5, name: "خالد أحمد", email: "khalid@company.com", role: "member", joined_at: "2024-01-06" },
        ]
      }
    ]

    const mockUsers: User[] = [
      { id: 6, name: "علي محمد", email: "ali@company.com", company: "شركة التقنية" },
      { id: 7, name: "نور الدين", email: "nour@company.com", company: "شركة التقنية" },
      { id: 8, name: "مريم أحمد", email: "mariam@company.com", company: "شركة التقنية" },
    ]

    setTeams(mockTeams)
    setUsers(mockUsers)
    setIsLoading(false)
  }, [])

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreateTeam = async () => {
    try {
      // API call to create team
      const response = await fetch('/api/teams/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify(newTeam)
      })

      if (response.ok) {
        setShowCreateDialog(false)
        setNewTeam({ name: "", description: "" })
        // Refresh teams list
        window.location.reload()
      }
    } catch (error) {
      console.error('Error creating team:', error)
    }
  }

  const handleInviteMember = async () => {
    if (!selectedTeam || !inviteData.email) return

    try {
      const response = await fetch('/api/teams/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({
          team_id: selectedTeam.id,
          email: inviteData.email,
          role: inviteData.role
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setShowInviteDialog(false)
        setInviteData({ email: "", role: "member" })
        alert('تم إرسال الدعوة بنجاح! سيتم إرسال رابط الدعوة للبريد الإلكتروني.')
        // إعادة تحميل بيانات الفرق
        window.location.reload()
      } else {
        alert(data.error || 'حدث خطأ في إرسال الدعوة')
      }
    } catch (error) {
      console.error('Error inviting member:', error)
      alert('حدث خطأ في الاتصال بالخادم')
    }
  }

  const handleRemoveMember = async (teamId: number, userId: number) => {
    try {
      const response = await fetch(`/api/teams/remove-member?team_id=${teamId}&user_id=${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      })

      if (response.ok) {
        // Refresh teams list
        window.location.reload()
      }
    } catch (error) {
      console.error('Error removing member:', error)
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Crown className="w-4 h-4 text-yellow-500" />
      case 'moderator': return <Shield className="w-4 h-4 text-blue-500" />
      default: return <User className="w-4 h-4 text-gray-500" />
    }
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin': return "default"
      case 'moderator': return "secondary"
      default: return "outline"
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">إدارة الفرق</h1>
          <p className="text-muted-foreground">إدارة الفرق وأعضاء الفريق</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              إنشاء فريق جديد
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إنشاء فريق جديد</DialogTitle>
              <DialogDescription>
                أدخل تفاصيل الفريق الجديد
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="team-name">اسم الفريق</Label>
                <Input
                  id="team-name"
                  value={newTeam.name}
                  onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                  placeholder="أدخل اسم الفريق"
                />
              </div>
              <div>
                <Label htmlFor="team-description">وصف الفريق</Label>
                <Textarea
                  id="team-description"
                  value={newTeam.description}
                  onChange={(e) => setNewTeam({ ...newTeam, description: e.target.value })}
                  placeholder="أدخل وصف الفريق"
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleCreateTeam}>
                  إنشاء الفريق
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="البحث في الفرق..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
          </div>
        </div>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTeams.map((team) => (
          <Card key={team.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    {team.name}
                  </CardTitle>
                  <CardDescription>{team.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Dialog open={showInviteDialog && selectedTeam?.id === team.id} onOpenChange={(open) => {
                    setShowInviteDialog(open)
                    if (open) setSelectedTeam(team)
                  }}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <UserPlus className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>إضافة عضو للفريق</DialogTitle>
                        <DialogDescription>
                          اختر المستخدم والدور في الفريق
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="invite-email">البريد الإلكتروني</Label>
                          <Input
                            id="invite-email"
                            type="email"
                            placeholder="example@company.com"
                            value={inviteData.email}
                            onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="invite-role">الدور</Label>
                          <Select value={inviteData.role} onValueChange={(value) => setInviteData({ ...inviteData, role: value })}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="member">عضو</SelectItem>
                              <SelectItem value="moderator">مشرف</SelectItem>
                              <SelectItem value="admin">مدير</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setShowInviteDialog(false)}>
                            إلغاء
                          </Button>
                          <Button onClick={handleInviteMember}>
                            إضافة العضو
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>عدد الأعضاء: {team.members.length}</span>
                  <span>تاريخ الإنشاء: {new Date(team.created_at).toLocaleDateString('ar-SA')}</span>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">أعضاء الفريق:</h4>
                  {team.members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-2 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-medium">{member.name.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="font-medium text-sm">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getRoleBadgeVariant(member.role)} className="flex items-center gap-1">
                          {getRoleIcon(member.role)}
                          {member.role === 'admin' ? 'مدير' : member.role === 'moderator' ? 'مشرف' : 'عضو'}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveMember(team.id, member.user_id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <UserMinus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTeams.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">لا توجد فرق</h3>
            <p className="text-muted-foreground text-center mb-4">
              ابدأ بإنشاء فريق جديد لإدارة أعضاء فريقك
            </p>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              إنشاء فريق جديد
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
