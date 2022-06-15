import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchFavorite } from '../api/action'
import { apiFetchProfile, apiSignin, apiSignup, authBody, userProfile } from '../api/user'

export const Signin = createAsyncThunk('user/signin',async(auth:authBody)=>{
  return await apiSignin(auth)
})
export const UpdateProfile=createAsyncThunk('user/profile',async(uid:string)=>{
  return await apiFetchProfile(uid)
})
export const UpdateFavorite=createAsyncThunk('user/favor',async(uid:string)=>{
  return await fetchFavorite(uid)
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    //username: '',
    token: '',
    uid: '',
    isGuest: false,
    favor: [] as string[],
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
    },
    setClothes(state,payload){
      state.profile.clothes=payload.payload
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
    builder.addCase(UpdateFavorite.fulfilled,(state,action)=>{
      state.favor=action.payload
    })
  }
})

export const {
  setGuest,
  unsetGuest,
  setClothes
}=userSlice.actions
export default userSlice.reducer