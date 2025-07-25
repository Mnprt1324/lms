// src/app/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/userSlice";

const rootReducer = combineReducers({
  auth: authReducer,
});


export const store = configureStore({
  reducer: rootReducer,
});
