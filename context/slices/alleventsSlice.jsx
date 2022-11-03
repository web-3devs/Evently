import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allEvents: null,
};

export const allEventsSlice = createSlice({
  name: "allEvents",
  initialState,
  reducers: {
    allEvents: (state, action) => {
      state.allEvents = action.payload;
    },
    addNewEvent: (state, action) => {
      state.allEvents = [...state.allEvents, action.payload];
    },
  },
});

export const { allEvents, addNewEvent } = allEventsSlice.actions;

export default allEventsSlice.reducer;
