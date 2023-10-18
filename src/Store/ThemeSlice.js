import { createSlice } from "@reduxjs/toolkit";

const initialThemeState = {
  darkTheme: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,
  reducers: {
    darkThemeToggle: (state) => {
      state.darkTheme = !state.darkTheme;
      localStorage.setItem("darkTheme", state.darkTheme);
    },
  },
});

export const themeActions = themeSlice.actions;
export default themeSlice;
