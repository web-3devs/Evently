import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "./slices/userSlice";

let reducer = {
  userData: currentUserReducer,
};

const store = configureStore({ reducer });

export default store;
  