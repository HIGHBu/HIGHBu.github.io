import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiSignin, apiSignup, authBody } from '../api/user'

export const Signin = createAsyncThunk('user/signin',async(auth:authBody)=>{
  return await apiSignin(auth)
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    token: '',
    uid: ''
  },
  reducers: {},
  extraReducers: (builder)=>{
    builder.addCase(Signin.fulfilled,(state,action)=>{
      if(typeof action.payload==='string')
        return
      state.username=action.payload.username
      state.token=action.payload.accessToken
      state.uid=action.payload.id
    })
  }
})

export default userSlice.reducer