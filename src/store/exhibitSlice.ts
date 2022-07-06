import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { MenuProps } from 'antd'
import { Exhibit, fetchExhibits } from '../api/exhibit'
import { fetchVisits } from '../api/visits'

export const updateExhibits = createAsyncThunk('exhibit/fetch',async()=>{
  return {
    exhibits: await fetchExhibits(),
    visits: await fetchVisits()
  }
})

export interface visit_type {
  visit : boolean,
  comment: boolean,
  favoriteOrShare: boolean,
  index: number,
  favoriteOrShareAction: string,
  emoji: number,
};

const exhibitSlice = createSlice({
  name: 'exhibit',
  initialState: {
    items: [] as Exhibit[],
    visits: [] as visit_type[],
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
      state.items=action.payload.exhibits
      state.visits=action.payload.visits
      // console.log(action.payload)
      action.payload.exhibits.forEach(item=>{
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