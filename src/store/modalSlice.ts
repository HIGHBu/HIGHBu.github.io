import { createSlice } from '@reduxjs/toolkit'

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    disignDetail: false,
    exhibitId: '',
    favor: false,
    skin: false,
    shift: false,
    //login: true
  },
  reducers: {
    hideDisignDetail(state){
      state.disignDetail=false;
    },
    showDisignDetail(state,{payload}:{payload:string}){
      state.exhibitId=payload
      state.disignDetail=true;
    },
    hideFavor(state){
      state.favor=false;
    },
    showFavor(state){
      state.favor=true;
    },
    hideSkin(state){
      state.skin=false;
    },
    showSkin(state){
      state.skin=true;
    },
    showShift(state){
      state.shift=true;
    },
    hideShift(state){
      state.shift=false;
    }
  },
})

export const {
  hideDisignDetail,
  showDisignDetail,
  hideFavor,
  showFavor,
  hideSkin,
  showSkin,
  showShift,
  hideShift,
} = modalSlice.actions

export default modalSlice.reducer