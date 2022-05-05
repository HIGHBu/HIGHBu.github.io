import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Exhibit, fetchExhibits } from '../api/exhibit'

export const updateExhibits = createAsyncThunk('exhibit/fetch',async()=>{
  return await fetchExhibits()
})

const exhibitSlice = createSlice({
  name: 'exhibit',
  initialState: {
    items: [] as Exhibit[]
  },
  reducers: {},
  extraReducers: (builder)=>{
    builder.addCase(updateExhibits.fulfilled,(state,action)=>{
      state.items=action.payload
      console.log(state.items)
    })
  }
})

export default exhibitSlice.reducer