import { createSlice } from '@reduxjs/toolkit'
export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    disignDetail: false,
    favor: false,
    skin: false
  },
  reducers: {
    hideDisignDetail(state){
      state.disignDetail=false;
    },
    showDisignDetail(state){
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
    }
  },
});
export const {hideDisignDetail,showDisignDetail,hideFavor,showFavor,hideSkin,showSkin} = modalSlice.actions

export default modalSlice.reducer;