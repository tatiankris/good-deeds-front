import { createSlice } from '@reduxjs/toolkit'
import { loginAsync } from '@/app/lib/features/auth/thunks'
import { User } from '@/app/types/AuthTypes'

export type AuthStateType = {
  isAuth: boolean
  token: string
  authUser: User | null
  loading: boolean
  error: string | null
}

const initialState: AuthStateType = {
  token: null,
  isAuth: false,
  authUser: null,
  loading: false,
  error: null
} as AuthStateType



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action) {
      state.isAuth = true
      state.authUser = action.payload
    },
    removeAuth(state) {
      state.isAuth = false
      state.token = null
      state.authUser = null
      state.loading = null
    },
    updateAuthUser(state, action) {
      state.authUser = action.payload
    },
    addAuthError(state, action) {
      state.error = action.payload
    },
    removeAuthError(state) {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state: AuthStateType) => {
        state.loading = true
      })
      .addCase(loginAsync.fulfilled, (state: AuthStateType, action) => {
        const { user, token } = action.payload
        if (user && token) {
          state.loading = false
          state.authUser = user
          if (token) {
            state.token = token
            state.isAuth = true
          }

        }

      })
      .addCase(loginAsync.rejected, (state: AuthStateType, action) => {
        if (action.payload) {
          state.loading = false
          state.error = action.payload
        }
      })
    }
})

export const { setAuth, updateAuthUser, addAuthError, removeAuthError, removeAuth } = authSlice.actions
export default authSlice.reducer
