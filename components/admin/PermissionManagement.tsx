"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { api, Permission, User } from "@/lib/api"
import { useLanguage } from "@/lib/providers"
import { Search, Plus, Shield, Users, Settings } from "lucide-react"
import { motion } from "framer-motion"

export function PermissionManagement() {
  const { t } = useLanguage()
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [userPermissions, setUserPermissions] = useState<Permission[]>([])
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)

  // Form states
  const [newPermission, setNewPermission] = useState({
    name: "",
    description: ""
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const [permissionsResponse, usersResponse] = await Promise.all([
        api.getPermissions(),
        api.getUsers({ limit: 100 })
      ])

      if (permissionsResponse.success && permissionsResponse.data) {
        setPermissions(permissionsResponse.data.permissions || [])
      }

      if (usersResponse.success && usersResponse.data) {
        setUsers(usersResponse.data.users || [])
      }
    } catch (error) {
      console.error("Failed to load data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePermission = async () => {
    try {
      const response = await api.createPermission(newPermission.name, newPermission.description)
      if (response.success) {
        loadData()
        setIsCreateDialogOpen(false)
        setNewPermission({ name: "", description: "" })
      }
    } catch (error) {
      console.error("Failed to create permission:", error)
    }
  }

  const handleAssignPermissions = async (userId: number) => {
    try {
      const user = users.find(u => u.id === userId)
      if (!user) return

      setSelectedUser(user)
      
      // Load user's current permissions
      const response = await api.getUserPermissions(userId)
      if (response.success && response.data) {
        setUserPermissions(response.data.permissions || [])
      }
      
      setIsAssignDialogOpen(true)
    } catch (error) {
      console.error("Failed to load user permissions:", error)
    }
  }

  const handleTogglePermission = async (permissionId: number, hasPermission: boolean) => {
    if (!selectedUser) return

    try {
      if (hasPermission) {
        await api.removeUserPermission(selectedUser.id, permissionId)
      } else {
        await api.addUserPermission(selectedUser.id, permissionId)
      }
      
      // Reload user permissions
      const response = await api.getUserPermissions(selectedUser.id)
      if (response.success && response.data) {
        setUserPermissions(response.data.permissions || [])
      }
    } catch (error) {
      console.error("Failed to toggle permission:", error)
    }
  }

  const filteredPermissions = permissions.filter(permission =>
    permission.permission_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    permission.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const hasPermission = (permissionId: number) => {
    return userPermissions.some(p => p.id === permissionId)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Permission Management</h2>
          <p className="text-muted-foreground">Manage user permissions and access control</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Permission
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search permissions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Permissions Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          filteredPermissions.map((permission) => (
            <motion.div
              key={permission.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{permission.permission_name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {permission.description}
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="outline">
                      {permission.permission_name}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Users with Permission Assignment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Users & Permissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div>
                  <h3 className="font-semibold">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <Badge variant={user.role === 'admin' || user.role === 'super_admin' ? 'default' : 'secondary'}>
                    {user.role.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  onClick={() => handleAssignPermissions(user.id)}
                  className="gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Manage Permissions
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create Permission Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Permission</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="permission-name">Permission Name</Label>
              <Input
                id="permission-name"
                value={newPermission.name}
                onChange={(e) => setNewPermission(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., user_management"
              />
            </div>
            <div>
              <Label htmlFor="permission-description">Description</Label>
              <Textarea
                id="permission-description"
                value={newPermission.description}
                onChange={(e) => setNewPermission(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe what this permission allows..."
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreatePermission}>
                Create Permission
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Assign Permissions Dialog */}
      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              Manage Permissions for {selectedUser?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {permissions.map((permission) => (
              <div key={permission.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`permission-${permission.id}`}
                  checked={hasPermission(permission.id)}
                  onCheckedChange={() => handleTogglePermission(permission.id, hasPermission(permission.id))}
                />
                <div className="flex-1">
                  <Label htmlFor={`permission-${permission.id}`} className="font-medium">
                    {permission.permission_name}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {permission.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
