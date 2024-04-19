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
      console.log("ACTION", action);

      const { access, refresh } = action.payload.data;
      state.token.access = access;
      state.token.refresh = refresh;

      const authToken = { access, refresh };
      localStorage.setItem("authTokens", JSON.stringify(authToken));
    },

    setUserDetails: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
    },

    clearJwtToken: (state) => {
      state.token.access = null;
      state.token.refresh = null;
      localStorage.removeItem("authTokens");
    },
  },
});

export const { setJwtToken, setUserDetails, clearJwtToken } = userSlice.actions;

export default userSlice.reducer;
