import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Action, fetchCommentsByEid } from '../api/action'

export const updateActions = createAsyncThunk('action/fetch',async(eid:string)=>{
  return await fetchCommentsByEid(eid)
})

const actionSlice = createSlice({
  name: 'action',
  initialState: {
    items: {} as Record<string,Action[]>
  },
  reducers: {},
  extraReducers: (builder)=>{
    builder.addCase(updateActions.fulfilled,(state,action)=>{
      state.items[action.meta.arg]=action.payload
    })
  }
})

export default actionSlice.reducer