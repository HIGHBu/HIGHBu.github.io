import { configureStore } from '@reduxjs/toolkit'
import modalSlice from './modalSlice'
import userSlice from './userSlice'
import exhibitSlice from './exhibitSlice'
import actionSlice from './actionSlice'

export const store = configureStore({
  reducer: {
    userSlice,
    modalSlice,
    exhibitSlice,
    actionSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch