import { createSlice } from "@reduxjs/toolkit";

const getToken = (type) => {
  return localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))[type]
    : null;
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    email: "",
    token: {
      access: getToken("access"),
      refresh: getToken("refresh"),
    },
  },
  reducers: {
    setJwtToken: (state, action) => {
      state.token.access = action.payload.data.access;
      state.token.refresh = action.payload.data.refresh;
    },

    setUserDetails: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
    },

    clearJwtToken: (state) => {
      console.log(234234234234);
      state.token.access = null;
      state.token.refresh = null;
      localStorage.removeItem("authTokens");
    },
  },
});

export const { setJwtToken, setUserDetails, clearJwtToken } = userSlice.actions;

export default userSlice.reducer;
