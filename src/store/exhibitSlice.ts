import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { MenuProps } from 'antd'
import { Exhibit, fetchExhibits } from '../api/exhibit'

export const updateExhibits = createAsyncThunk('exhibit/fetch',async()=>{
  return await fetchExhibits()
})

const exhibitSlice = createSlice({
  name: 'exhibit',
  initialState: {
    items: [] as Exhibit[],
    category: [] as ({
      key: string,
      label: string,
      children: ({
        key: string,
        label: string
      })[]
    })[]
  },
  reducers: {},
  extraReducers: (builder)=>{
    builder.addCase(updateExhibits.fulfilled,(state,action)=>{
      state.items=action.payload
      console.log(action.payload)
      action.payload.forEach(item=>{
        const fir=item.location
        let firdir=state.category.find(v=>v.key===fir)
        if(firdir===undefined){
          firdir=state.category[state.category.push({
            key: fir,
            label: fir,
            children: []
          })-1]
        }
        firdir.children.push({
          key: item.id,
          label: item.title
        })
      })
    })
  }
})

export default exhibitSlice.reducer