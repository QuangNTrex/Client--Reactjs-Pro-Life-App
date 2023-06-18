import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  userName: "",
  fullName: "",
  isLogin: false,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.userName = action.payload.userName;
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
    },
    logout: (state, action) => {
      state.isLogin = false;
      state.email = "";
      state.userName = "";
      state.fullName = "";
    },
  },
});

export default AuthSlice.reducer;
export const AuthActions = AuthSlice.actions;
