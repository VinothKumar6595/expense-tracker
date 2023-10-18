import { configureStore, createSlice } from "@reduxjs/toolkit";
import ProfileSlice from "./ProfileSlice";
import editSlice from "./EditSlice";
import ExpensesSlice from "./Expenses";
import { useNavigate } from "react-router-dom";
import themeSlice from "./ThemeSlice";

const initialAuthState = {
  //   logout: () => {},
  //   login: (token) => {},
  //   setSignUp: () => {},
  isSignedUp: false,
  isLoggedIn: false,
  endpoint: "",
  token: null,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    signUp: (state) => {
      state.isSignedUp = true;
    },
    endpoint: (state, action) => {
      state.endpoint = localStorage.setItem("endpoint", action.payload);
      state.endpoint = localStorage.getItem("endpoint");
    },
    login: (state, action) => {
      state.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", true);
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      localStorage.clear();
      state.token = null;
      state.isSignedUp = false;
      action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    profile: ProfileSlice.reducer,
    editing: editSlice.reducer,
    expenses: ExpensesSlice.reducer,
    darkTheme: themeSlice.reducer,
  },
});

export const authActions = authSlice.actions;

export default store;
