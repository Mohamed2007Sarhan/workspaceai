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
  Eye,
  Activity,
  BarChart3,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react"

interface TeamMember {
  id: number
  name: string
  email: string
  company: string
  role: 'admin' | 'moderator' | 'member'
  joined_at: string
  last_activity?: string
}

interface TeamData {
  id: number
  name: string
  description: string
  members: TeamMember[]
  team_token: string
  created_at: string
}

export default function TeamDashboard() {
  const [teamData, setTeamData] = useState<TeamData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [showInviteDialog, setShowInviteDialog] = useState(false)
  const [inviteData, setInviteData] = useState({ email: "", role: "member" })
  const [userRole, setUserRole] = useState<string>('member')

  useEffect(() => {
    loadTeamData()
    loadUserRole()
  }, [])

  const loadTeamData = async () => {
    try {
      const teamToken = localStorage.getItem('team_token')
      if (!teamToken) {
        alert('رمز الفريق غير موجود')
        return
      }

      const response = await fetch(`/api/teams/team-by-token?token=${teamToken}`)
      const data = await response.json()
      
      if (data.success) {
        setTeamData(data.team)
      } else {
        alert(data.error || 'حدث خطأ في تحميل بيانات الفريق')
      }
    } catch (error) {
      console.error('Error loading team data:', error)
      alert('حدث خطأ في الاتصال بالخادم')
    } finally {
      setIsLoading(false)
    }
  }

  const loadUserRole = () => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user_data')
      if (userData) {
        const user = JSON.parse(userData)
        // البحث عن دور المستخدم في الفريق
        if (teamData) {
          const member = teamData.members.find(m => m.email === user.email)
          if (member) {
            setUserRole(member.role)
          }
        }
      }
    }
  }

  const handleInviteMember = async () => {
    if (!teamData || !inviteData.email) return

    try {
      const response = await fetch('/api/teams/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({
          team_id: teamData.id,
          email: inviteData.email,
          role: inviteData.role
        })
      })

      const data = await response.json()
      
      if (data.success) {
        setShowInviteDialog(false)
        setInviteData({ email: "", role: "member" })
        alert('تم إرسال الدعوة بنجاح')
        // إعادة تحميل بيانات الفريق
        loadTeamData()
      } else {
        alert(data.error || 'حدث خطأ في إرسال الدعوة')
      }
    } catch (error) {
      console.error('Error inviting member:', error)
      alert('حدث خطأ في الاتصال بالخادم')
    }
  }

  const handleRemoveMember = async (userId: number) => {
    if (!teamData) return

    if (!confirm('هل أنت متأكد من إزالة هذا العضو من الفريق؟')) {
      return
    }

    try {
      const response = await fetch(`/api/teams/remove-member?team_id=${teamData.id}&user_id=${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      })

      const data = await response.json()
      
      if (data.success) {
        alert('تم إزالة العضو بنجاح')
        // إعادة تحميل بيانات الفريق
        loadTeamData()
      } else {
        alert(data.error || 'حدث خطأ في إزالة العضو')
      }
    } catch (error) {
      console.error('Error removing member:', error)
      alert('حدث خطأ في الاتصال بالخادم')
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

  const filteredMembers = teamData?.members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  ) || []

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!teamData) {
    return (
      <div className="space-y-6">
        <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            لا يمكن تحميل بيانات الفريق. تأكد من أنك عضو في فريق صحيح.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{teamData.name}</h1>
          <p className="text-muted-foreground">{teamData.description}</p>
        </div>
        {(userRole === 'admin' || userRole === 'moderator') && (
          <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                دعوة عضو جديد
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>دعوة عضو جديد</DialogTitle>
                <DialogDescription>
                  أدخل بريد إلكتروني للعضو الجديد
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
                      {userRole === 'admin' && (
                        <>
                          <SelectItem value="moderator">مشرف</SelectItem>
                          <SelectItem value="admin">مدير</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowInviteDialog(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={handleInviteMember}>
                    إرسال الدعوة
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الأعضاء</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamData.members.length}</div>
            <p className="text-xs text-muted-foreground">
              أعضاء نشطون
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المديرون</CardTitle>
            <Crown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamData.members.filter(m => m.role === 'admin').length}
            </div>
            <p className="text-xs text-muted-foreground">
              مديرو الفريق
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المشرفون</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamData.members.filter(m => m.role === 'moderator').length}
            </div>
            <p className="text-xs text-muted-foreground">
              مشرفو الفريق
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">تاريخ الإنشاء</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Date(teamData.created_at).toLocaleDateString('ar-SA')}
            </div>
            <p className="text-xs text-muted-foreground">
              تاريخ تأسيس الفريق
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                أعضاء الفريق
              </CardTitle>
              <CardDescription>إدارة أعضاء فريقك</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="البحث في الأعضاء..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium">{member.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                    <p className="text-xs text-muted-foreground">{member.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <Badge variant={getRoleBadgeVariant(member.role)} className="flex items-center gap-1 mb-1">
                      {getRoleIcon(member.role)}
                      {member.role === 'admin' ? 'مدير' : member.role === 'moderator' ? 'مشرف' : 'عضو'}
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      انضم: {new Date(member.joined_at).toLocaleDateString('ar-SA')}
                    </p>
                  </div>
                  {(userRole === 'admin' || (userRole === 'moderator' && member.role === 'member')) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveMember(member.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <UserMinus className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team Token Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            رمز الفريق المشترك
          </CardTitle>
          <CardDescription>استخدم هذا الرمز للوصول لبيانات الفريق</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input
                value={teamData.team_token}
                readOnly
                className="font-mono"
              />
            </div>
            <Button variant="outline" onClick={() => {
              navigator.clipboard.writeText(teamData.team_token)
              alert('تم نسخ الرمز')
            }}>
              نسخ الرمز
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            شارك هذا الرمز مع أعضاء الفريق للوصول لبيانات الفريق المشتركة
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
