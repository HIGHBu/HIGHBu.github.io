import { configureStore } from '@reduxjs/toolkit'
import modalSlice from './modalSlice'
import userSlice from './userSlice'

export const store = configureStore({
  reducer: {userSlice,modalSlice},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch