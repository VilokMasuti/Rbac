
import { useSelector } from 'react-redux'
import { Sidebar } from './Sidebar'

import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'

export const Layout = () => {
  const user = useSelector((state) => state.auth.user)

  if (!user) {
    return <div>Please log in to access the dashboard.</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col md:pl-64">
        <Navbar />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

