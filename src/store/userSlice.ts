import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '.';
import { apiLogin } from '../api/user';

export interface userPayload {
  username: string,
  token: string
}
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    token: ''
  },
  reducers: {
    setuser(state, { payload }:{ payload:userPayload }) {
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