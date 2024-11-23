/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (role && user.roleId !== role) {
    return <Navigate to="/unauthorized" />;
  }

  return children;

}

export default ProtectedRoute