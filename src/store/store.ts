import { configureStore } from '@reduxjs/toolkit'
import modalSlice from './modalSlice'
import userSlice from './userSlice'
import exhibitSlice from './exhibitSlice'

export const store = configureStore({
  reducer: {
    userSlice,
    modalSlice,
    exhibitSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch