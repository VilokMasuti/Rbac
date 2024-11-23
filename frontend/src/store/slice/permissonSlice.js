import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const fetchPermissions = createAsyncThunk(
  'permissions/fetchPermissions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/permissions`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createPermission = createAsyncThunk(
  'permissions/createPermission',
  async (permissionData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/permissions`, permissionData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePermission = createAsyncThunk(
  'permissions/updatePermission',
  async ({ id, permissionData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/permissions/${id}`, permissionData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePermission = createAsyncThunk(
  'permissions/deletePermission',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/permissions/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const permissionsSlice = createSlice({
  name: 'permissions',
  initialState: {
    permissions: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPermissions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.permissions = action.payload;
      })
      .addCase(fetchPermissions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createPermission.fulfilled, (state, action) => {
        state.permissions.push(action.payload);
      })
      .addCase(updatePermission.fulfilled, (state, action) => {
        const index = state.permissions.findIndex(permission => permission.id === action.payload.id);
        if (index !== -1) {
          state.permissions[index] = action.payload;
        }
      })
      .addCase(deletePermission.fulfilled, (state, action) => {
        state.permissions = state.permissions.filter(permission => permission.id !== action.payload);
      });
  },
});

export default permissionsSlice.reducer;

