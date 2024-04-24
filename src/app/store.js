import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import userReducer from "../features/user/userSlice";
import transactionReducer from "../features/transaction/transactionSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    transaction: transactionReducer,
  },
});
