import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiFetchProfile, apiSignin, apiSignup, authBody, userProfile } from '../api/user'

export const Signin = createAsyncThunk('user/signin',async(auth:authBody)=>{
  return await apiSignin(auth)
})
export const UpdateProfile=createAsyncThunk('user/profile',async(uid:string)=>{
  return await apiFetchProfile(uid)
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    //username: '',
    token: '',
    uid: '',
    isGuest: false,
    profile: {
      avatar:   "",
      clothes:  [],
      nickname: "",
      password: "",
      username: ""
    } as userProfile
  },
  reducers: {
    setGuest(state){
      state.isGuest=true;
    },
    unsetGuest(state){
      state.isGuest=false;
    }
  },
  extraReducers: (builder)=>{
    builder.addCase(Signin.fulfilled,(state,action)=>{
      if(typeof action.payload==='string')
        return
      //state.username=action.payload.username
      state.token=action.payload.accessToken
      state.uid=action.payload.id
    })
    builder.addCase(UpdateProfile.fulfilled,(state,action)=>{
      if(typeof action.payload==='string')
        return
      state.profile=action.payload
      console.log(action.payload)
    })
  }
})

export const {
  setGuest,
  unsetGuest
}=userSlice.actions
export default userSlice.reducer