import { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { fetchRoles, createRole, updateRole, deleteRole } from '../store/slice/roleSlice'
import { fetchPermissions } from '../store//slice/permissonSlice'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Checkbox } from '../components/ui/checkbox'
import { PlusCircle, Pencil, Trash2 } from 'lucide-react'
import { Badge } from '../components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { ScrollArea } from '../components/ui/scroll-area'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { useToast } from "../hooks/use-toast"
export const RoleMangement = () => {
  const { toast } = useToast()
  const dispatch = useDispatch()
  const { roles, status: rolesStatus, error: rolesError } = useSelector((state) => state.roles)
  const { permissions, status: permissionsStatus } = useSelector((state) => state.permissions)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingRole, setEditingRole] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: [],
  })

  useEffect(() => {
    if (rolesStatus === 'idle') {
      dispatch(fetchRoles())
    }
    if (permissionsStatus === 'idle') {
      dispatch(fetchPermissions())
    }
  }, [dispatch, rolesStatus, permissionsStatus])

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handlePermissionChange = (permissionId) => {
    setFormData(prevState => ({
      ...prevState,
      permissions: prevState.permissions.includes(permissionId)
        ? prevState.permissions.filter(id => id !== permissionId)
        : [...prevState.permissions, permissionId]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingRole) {
      dispatch(updateRole({ id: editingRole.id, roleData: formData }))
    } else {
      dispatch(createRole(formData))
    }
    setIsDialogOpen(false)
    setEditingRole(null)
    setFormData({ name: '', description: '', permissions: [] })
  }

  const handleEdit = (roles) => {
    setEditingRole(roles)
    setFormData({
      name: roles.name || '',
      description: roles.description || '',
      permissions: roles.permissions ? roles.permissions.map((p) => p.id) : [],
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (roleId) => {
    toast({
      title: "delete",
      icons: "delete",
      className: "bg-red-500 text-white",



      description: "Are you sure you want to delete this role?",

    })
    dispatch(deleteRole(roleId))
  }

  if (rolesStatus === 'loading' || permissionsStatus === 'loading') {
    return <div>Loading...</div>
  }

  if (rolesStatus === 'failed') {
    return <div>Error: {rolesError}</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Role Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingRole(null)
              setFormData({ name: '', description: '', permissions: [] })
            }}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Role
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingRole ? 'Edit Role' : 'Add New Role'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="name"
                placeholder="Role Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <Input
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
              <div>
                <h3 className="mb-2 font-semibold">Permissions:</h3>
                <ScrollArea className="h-[200px] rounded-md border p-4">
                  {permissions && permissions.map((permission) => (
                    <div key={permission.id} className="flex items-center space-x-2 mb-2">
                      <Checkbox
                        id={`permission-${permission.id}`}
                        checked={formData.permissions.includes(permission.id)}
                        onCheckedChange={() => handlePermissionChange(permission.id)}
                      />
                      <label
                        htmlFor={`permission-${permission.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {permission.name || 'Unnamed Permission'}
                      </label>
                    </div>
                  ))}
                </ScrollArea>
              </div>
              <Button type="submit" className="w-full">
                {editingRole ? 'Update Role' : 'Create Role'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles && roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell className="font-medium">
                  <Badge variant="secondary">{role.name || 'N/A'}</Badge>
                </TableCell>
                <TableCell>{role.description || 'No description'}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {roles.permissions && roles.permissions.length > 0
                      ? roles.permissions.map((p) => (
                        <Badge key={p.id} variant="outline">
                          {p.name || 'Unnamed Permission'}
                        </Badge>
                      ))
                      : <span className="text-muted-foreground text-sm">No permissions assigned</span>
                    }
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(role)}
                    className="mr-2"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(role.id)}
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


