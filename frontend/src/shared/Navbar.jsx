
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/slice//authSlice'
import { Button } from '../components//ui/button'
import { UserCircle } from 'lucide-react'
export const Navbar = () => {
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <header className="sticky top-0 z-10 bg-background border-b">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex h-16 items-center justify-between">

          <div className="flex items-center gap-4  justify-between w-full">
            <div className="flex items-center gap-2 ">
              <UserCircle className="h-5 w-5" />
              <span className="text-sm font-medium ml-10">Welcome, {user.username}</span>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
