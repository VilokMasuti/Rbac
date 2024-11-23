/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000';


export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/users`, {
      params: { username: credentials.username, password: credentials.password },
    });
    const user = response.data[0]; // Assuming unique usernames
    if (user) {
      const { password, ...userWithoutPassword } = user;
      // Convert roleId to a number and add a role property
      userWithoutPassword.roleId = Number(userWithoutPassword.roleId);
      userWithoutPassword.role = userWithoutPassword.roleId === 1 ? 'admin' : 'user';
      console.log('Logged in user:', userWithoutPassword);
      return userWithoutPassword;
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    return rejectWithValue(error.message || 'Login failed');
  }
});
export const signupUser = createAsyncThunk('auth/signupUser', async (newUser, { rejectWithValue }) => {
  try {
    // Check if user already exists
    const existingUsers = await axios.get(`${API_URL}/users`, {
      params: { username: newUser.username },
    });
    if (existingUsers.data.length > 0) {
      throw new Error('Username already exists');
    }

    const response = await axios.post(`${API_URL}/users`, {
      ...newUser,
      roleId: 2, // Default to "user" role
      createdAt: new Date().toISOString(),
      lastLogin: null,
    });
    const { password, ...userWithoutPassword } = response.data;
    return userWithoutPassword;
  } catch (error) {
    return rejectWithValue(error.message || 'Signup failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    error: null,
    status: 'idle',
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.status = 'idle';
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
        state.status = 'succeeded';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(signupUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
        state.status = 'succeeded';
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;

