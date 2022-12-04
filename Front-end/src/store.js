import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./api/auth";
import messageReducer from "./api/message";

const reducer = {
  auth: authReducer,
  message: messageReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;
