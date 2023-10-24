/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    loginLoading: false,
    loginSucc: false,
    loginError: false,
    loginErrorMessage: '',
    registerLoading: false,
    registerSucc: false,
    registerError: false,
    registerErrorMessage: '',
  },
  reducers: {
    loginStart: (state) => {
      state.loginLoading = true;
      state.loginSucc = false;
    },
    loginSuccess: (state, action) => {
      state.userData = action.payload;
      state.loginSucc = true;
      state.loginError = false;
      state.loginLoading = false;
    },
    loginFailure: (state, action) => {
      state.userData = null;
      state.loginErrorMessage = action.payload;
      state.loginLoading = false;
      state.loginError = true;
    },
    registerStart: (state) => {
      state.registerLoading = true;
      state.registerSucc = false;
    },
    registerSuccess: (state) => {
      state.registerSucc = true;
      state.registerError = false;
      state.registerLoading = false;
    },
    registerFailure: (state, action) => {
      state.registerErrorMessage = action.payload;
      state.registerLoading = false;
      state.registerError = true;
    },
    reset: (state) => {
      state.loginLoading = false;
      state.loginSucc = false;
      state.loginError = false;
      state.loginErrorMessage = '';
      state.registerLoading = false;
      state.registerSucc = false;
      state.registerError = false;
      state.registerErrorMessage = '';
    },
  },
});

export default userSlice.reducer;
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  reset,
} = userSlice.actions;
