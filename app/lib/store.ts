import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import postsReducer from '@/app/lib/features/posts/postsSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      posts: postsReducer
    }
  })
}

//MY ADDING
export const store = makeStore()
///
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']