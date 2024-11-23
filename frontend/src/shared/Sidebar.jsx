/* eslint-disable react/prop-types */

import { useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import { Users, Shield, Key, LayoutDashboard, Menu, } from 'lucide-react'
import { cn } from "../lib/utils"
import { Button } from "../components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../components/ui/sheet"
import { ScrollArea } from "../components/ui/scroll-area"

const SidebarLink = ({ to, icon: Icon, children }) => {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <NavLink
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
        "hover:bg-accent hover:text-accent-foreground",
        isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{children}</span>
    </NavLink>
  )
}

const SidebarContent = () => {
  const user = useSelector((state) => state.auth.user)

  return (
    <ScrollArea className="flex-1 px-3 py-4">
      <nav className="flex flex-col gap-2">
        <SidebarLink to="/dashboard" icon={LayoutDashboard}>Dashboard</SidebarLink>
        <SidebarLink to="/users" icon={Users}>Users</SidebarLink>
        {user && user.role === 'admin' && (

          <>
            <SidebarLink to="/roles" icon={Shield}>Roles</SidebarLink>
            <SidebarLink to="/permissions" icon={Key}>Permissions</SidebarLink>
          </>
        )}


      </nav>
    </ScrollArea>
  )
}

export const Sidebar = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden fixed left-4 top-4 z-40">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-background">
          <div className="border-b px-6 py-4">
            <h2 className="font-semibold">RBAC Dashboard</h2>
          </div>
          <SidebarContent />
        </SheetContent>
      </Sheet>

      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-background border-r">
          <div className="border-b px-6 py-4">
            <h2 className="font-semibold">RBAC Dashboard</h2>
          </div>
          <SidebarContent />
        </div>
      </div>
    </>
  )
}

