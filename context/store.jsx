import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from './slices/userSlice';

let reducer = {
    userData:currentUserReducer
};

export default store = configureStore(reducer)