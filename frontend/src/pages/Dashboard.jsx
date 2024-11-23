
import UserMangment from '../shared/UserMangment';
import { useSelector } from 'react-redux'

import PermissionManagement from '../shared/PermissionManagement';
import { RoleMangement } from '../shared/RoleMangement';



const Dashboard = () => {

  const user = useSelector((state) => state.auth.user)


  return (
    <div className="p-6 space-y-8">
      <div className="space-y-0.5">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome to the RBAC Dashboard, {user.username}
        </p>
      </div>
      <div className="space-y-12">
        <UserMangment />
        {user.role === 'admin' && (
          <>
            <RoleMangement />
            <PermissionManagement />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
