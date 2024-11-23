import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPermissions, createPermission, updatePermission, deletePermission } from '../store/slice/permissonSlice'
import { Button } from '../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react'
import { Input } from '../components/ui/input'
import { useToast } from "../hooks/use-toast"


import { Badge } from '../components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'

const PermissionManagement = () => {
  const { toast } = useToast()
  const dispatch = useDispatch()
  const permissions = useSelector((state) => state.permissions.permissions)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPermission, setEditingPermission] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  })

  useEffect(() => {
    dispatch(fetchPermissions())
  }, [dispatch])

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingPermission) {
      dispatch(updatePermission({ id: editingPermission.id, permissionData: formData }))
    } else {
      dispatch(createPermission(formData))
    }
    setIsDialogOpen(false)
    setEditingPermission(null)
    setFormData({ name: '', description: '' })
  }

  const handleEdit = (permission) => {
    setEditingPermission(permission)
    setFormData({
      name: permission.name,
      description: permission.description,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (permissionId) => {
    toast({
      title: "delete",
      icons: "delete",
      className: "bg-red-500 text-white",



      description: "Are you sure you want to delete this permission?",

    })
    dispatch(deletePermission(permissionId))

  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Permission Management</h2>
          <p className="text-muted-foreground">
            Manage system permissions and access controls
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingPermission(null)
              setFormData({ name: '', description: '' })
            }}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Permission
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingPermission ? 'Edit Permission' : 'Add New Permission'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                name="name"
                placeholder="Permission Name"
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
              <Button type="submit" className="w-full">
                {editingPermission ? 'Update Permission' : 'Create Permission'}
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
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permissions.map((permission) => (
              <TableRow key={permission.id}>
                <TableCell className="font-medium">
                  <Badge variant="outline">{permission.name}</Badge>
                </TableCell>
                <TableCell>{permission.description}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(permission)}
                    className="mr-2"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(permission.id)}
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

export default PermissionManagement