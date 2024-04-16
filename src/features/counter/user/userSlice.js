import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    email: "",
    token: {
      access: "",
      refresh: "",
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
  },
});

export const { setJwtToken, setUserDetails } = userSlice.actions;

export default userSlice.reducer;
