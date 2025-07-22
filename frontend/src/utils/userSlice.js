import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    accountType: "",
    userData: null,
    logUserNumber: null,
    loading: false,
    loginInfo: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    isLogin: false,
    token: localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null,
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  },
  reducers: {
    setUser: (state, action) => {
      state.accountType = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userData = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setLogUserNumber: (state, action) => {
      state.logUserNumber = action.payload;
    },
    setLoginInfo: (state, action) => {
      state.loginInfo = action.payload;
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserData: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {
  setUser,
  setUserInfo,
  setLoading,
  setLogUserNumber,
  setLoginInfo,
  setIsLogin,
  setToken,
  setUserData,
} = userSlice.actions;
export default userSlice.reducer;
