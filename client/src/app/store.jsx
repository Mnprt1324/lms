// src/app/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/userSlice";
import courseSlice from "../features/courseSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  course: courseSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
