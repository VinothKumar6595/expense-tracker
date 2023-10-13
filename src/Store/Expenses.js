import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
  isPremium: false,
  expenses: [],
};

const ExpensesSlice = createSlice({
  name: "expenses",
  initialState: initialExpenseState,
  reducers: {
    premiumUser: (state) => {
      state.isPremium = true;
    },
    addToExpense: (state, action) => {
      state.expenses = action.payload;
    },
  },
});

export const expenseActions = ExpensesSlice.actions;
export default ExpensesSlice;
