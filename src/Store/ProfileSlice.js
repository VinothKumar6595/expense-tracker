import { createSlice } from "@reduxjs/toolkit";

const initialProfilestate = {
  isProfileUpdated: false,
  isEmailVerified: false,
};

const ProfileSlice = createSlice({
  name: "userProfile",
  initialState: initialProfilestate,
  reducers: {
    emailVerification: (state, action) => {
      state.isEmailVerified = action.payload;
    },
    profileUpdation: (state) => {
      state.isProfileUpdated = true;
    },
    profileUpdationInComplete: (state) => {
      state.isProfileUpdated = false;
    },
    emailVerificationInComplete: (state) => {
      state.isEmailVerified = false;
    },
  },
});

export const profileActions = ProfileSlice.actions;
export default ProfileSlice;
