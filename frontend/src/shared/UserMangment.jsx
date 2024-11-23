import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers, createUser, updateUser, deleteUser } from '../store/slice/userSlice'
import { fetchRoles } from '../store/slice/roleSlice'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Switch } from '../components//ui/switch'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { UserPlus, Pencil, Trash2 } from 'lucide-react'
import { Badge } from '../components/ui/badge'
const UserMangment = () => {

  const dispatch = useDispatch()
  const users = useSelector((state) => state.users.users)
  const roles = useSelector((state) => state.roles.roles)
  const status = useSelector((state) => state.users.status)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    roleId: '',
  })

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers())
      dispatch(fetchRoles())
    }
  }, [status, dispatch])

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingUser) {
      dispatch(updateUser({ id: editingUser.id, userData: formData }))
    } else {
      dispatch(createUser(formData))
    }
    setIsDialogOpen(false)
    setEditingUser(null)
    setFormData({ username: '', email: '', password: '', roleId: '' })
  }
  const handleRoleChange = (value) => {
    setFormData({ ...formData, roleId: value })
  }

  const handleEdit = (user) => {
    setEditingUser(user)
    setFormData({
      username: user.username,
      email: user.email,
      password: '',
      roleId: user.roleId,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(userId))
    }
  }
  const handleSwitchChange = (checked) => {
    setFormData({ ...formData, isActive: checked })
  }

  if (status === 'loading') {
    return <div>Loading users...</div>
  }

  if (status === 'failed') {
    return <div>Error loading users. Please try again.</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
          <p className="text-muted-foreground">
            Manage user accounts and their roles
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingUser(null)
              setFormData({ username: '', email: '', password: '', roleId: '', isActive: true })
            }}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingUser ? 'Edit User' : 'Add New User'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
              <Input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required={!editingUser}
              />
              <Select value={formData.roleId} onValueChange={handleRoleChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex items-center space-x-2">
                <Switch
                  id="user-active"
                  checked={formData.isActive}
                  onCheckedChange={handleSwitchChange}
                />
                <label htmlFor="user-active">Active</label>
              </div>
              <Button type="submit" className="w-full">
                {editingUser ? 'Update User' : 'Create User'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {roles.find((role) => role.id === user.roleId)?.name || 'N/A'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.isActive ? "success" : "secondary"}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(user)}
                    className="mr-2"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(user.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default UserMangment