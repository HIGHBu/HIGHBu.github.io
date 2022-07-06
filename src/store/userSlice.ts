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
  return {
    favor: await fetchFavorite(uid)
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    //username: '',
    token: '',
    uid: '',
    isGuest: false,
    favor: [] as string[],
    like_count: 0,
    visit_count: 0,
    share_count: 0,
    comment_count: 0,
    login_time: 0,
    profile: {
      avatar:   "",
      clothes:  [],
      nickname: "",
      password: "",
      username: "",
      history: [],
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
      state.login_time=new Date().getTime()
    })
    builder.addCase(UpdateProfile.fulfilled,(state,action)=>{
      if(typeof action.payload==='string')
        return
      state.profile=action.payload
      state.visit_count=action.payload.history!.filter(item=>item.action==='visit').length
      state.share_count=action.payload.history!.filter(item=>item.action==='share').length
      state.comment_count=action.payload.history!.filter(item=>item.action==='comment').length
    })
    builder.addCase(UpdateFavorite.fulfilled,(state,action)=>{
      state.favor=action.payload.favor
      state.like_count=action.payload.favor.length
    })
  }
})

export const {
  setGuest,
  unsetGuest,
  setClothes
}=userSlice.actions
export default userSlice.reducer