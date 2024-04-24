import { createSlice } from "@reduxjs/toolkit";

export const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    type: [],
  },
  reducers: {
    setTransactionTypeArr: (state, action) => {
      state.type = [...action.payload];
    },
  },
});

export const { setTransactionTypeArr } = transactionSlice.actions;

export default transactionSlice.reducer;
