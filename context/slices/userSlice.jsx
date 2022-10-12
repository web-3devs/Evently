import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authenticated: false,
  currentUser: null,
  allUsers: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    currentUser: (state, action) => {
      state.authenticated = true;
      state.currentUser = action.payload;
    },
    allUsers: (state, action) => {
      state.allUsers = action.payload;
    },
  },
});

export const { currentUser, allUsers } = userSlice.actions;

export default userSlice.reducer;
