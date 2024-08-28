import { createAsyncThunk } from '@reduxjs/toolkit'
import { LoginRequest, LoginResponse } from '@/app/types/AuthTypes'
import login from '@/app/api/login'

export const loginAsync = createAsyncThunk(
  'auth/loginAsync',
  async function (dto: LoginRequest, thunkAPI) {
    try {
      const res = await login(dto)
      if (!res.statusCode || res.statusCode?.toString().includes('2')) {
        return res as LoginResponse
      } else {
        return thunkAPI.rejectWithValue(res.message);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
)

