import { createSlice } from "@reduxjs/toolkit";

export const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    type: [],
    transactions: [],
  },
  reducers: {
    setTransactionTypeArr: (state, action) => {
      state.type = [...action.payload];
    },
    setTransactions: (state, action) => {
      state.transactions = [...action.payload];
    },
  },
});

export const { setTransactionTypeArr, setTransactions } =
  transactionSlice.actions;

export default transactionSlice.reducer;
