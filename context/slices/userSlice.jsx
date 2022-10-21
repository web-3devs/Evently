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
    deleteUser: (state, action) => {
      state.authenticated = false;
      state.currentUser = null
    },
    allUsers: (state, action) => {
      state.allUsers = action.payload;
    },
  },
});

export const { currentUser, allUsers, deleteUser } = userSlice.actions;

export default userSlice.reducer;
