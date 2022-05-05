import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiSignin, authBody } from '../api/user'

export const Signin = createAsyncThunk('user/signin',async(auth:authBody)=>{
  return await apiSignin(auth)
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    token: ''
  },
  reducers: {},
  extraReducers: (builder)=>{
    builder.addCase(Signin.fulfilled,(state,action)=>{
      state.username=action.payload.username
      state.token=action.payload.accessToken
    })
  }
})

export default userSlice.reducer