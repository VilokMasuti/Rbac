import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import userReducer from './slice/userSlice'
import rolesReducer from './slice/roleSlice'
import permissionsReducer from './slice/permissonSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    roles: rolesReducer,
    permissions: permissionsReducer


  }
})