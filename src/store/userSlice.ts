import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '.';
import { apiLogin } from '../api/user';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    token: ''
  },
  reducers: {
    setuser(state, { payload }) {
      state.username = payload.username
      state.token = payload.token
    },
  },
});
export const { setuser } = userSlice.actions
export const Login = () => async(dispatch:AppDispatch) => {
 dispatch(setuser(await apiLogin()));
};
export default userSlice.reducer;