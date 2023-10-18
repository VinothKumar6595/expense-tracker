import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
  isPremium: false,
  expenses: [],
  amount: 0,
};

const ExpensesSlice = createSlice({
  name: "expenses",
  initialState: initialExpenseState,
  reducers: {
    premiumUser: (state, action) => {
      state.isPremium = true;
      localStorage.setItem("isPremium", true);
      action.payload;
    },
    addToExpense: (state, action) => {
      state.expenses = action.payload;
    },
    addAmount: (state, action) => {
      state.amount = action.payload;
    },
  },
});

export const expenseActions = ExpensesSlice.actions;
export default ExpensesSlice;
