import { configureStore } from "@reduxjs/toolkit";
import ExpensesReducer from "../slices/ExpensesSlice";

const store = configureStore({
  reducer: {
    expenses: ExpensesReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;