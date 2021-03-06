import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: 0,
  username: '',
  email: '',
  full_name: '',
  bio: '',
  picture_url: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signin: (state, action) => {
      return (state = { ...state, ...action.payload });
    },
    logout: (state, action) => {
      return (state = { ...state, ...action.payload });
    },
  },
});

export const { signin, logout } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
