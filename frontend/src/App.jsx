
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Layout } from './shared/Layout'
import Dashboard from './pages/Dashboard'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './shared/Home'
import PermissionManagement from './shared/PermissionManagement'
import UserMangment from './shared/UserMangment'
import { RoleMangement } from './shared/RoleMangement'

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth)

  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route
        path="/signup"
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />}
      />
      <Route
        path="/"
        element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<UserMangment />} />
        <Route path="roles" element={<RoleMangement />} />
        <Route path="permissions" element={<PermissionManagement />} />
      </Route>
    </Routes>

  )
}

export default App

