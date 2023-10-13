import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isEditing: false,
};

const editSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    editUser: (state) => {
      state.isEditing = true;
    },
    stopEditing: (state) => {
      state.isEditing = false;
    },
  },
});

export const editActions = editSlice.actions;
export default editSlice;
