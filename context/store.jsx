import { configureStore } from '@reduxjs/toolkit'
import currentUserReducer from './slices/userSlice'
import allEventsReducer from './slices/alleventsSlice'
let reducer = {
	userData: currentUserReducer,
	allEvents: allEventsReducer,
}

const store = configureStore({ reducer })

export default store
