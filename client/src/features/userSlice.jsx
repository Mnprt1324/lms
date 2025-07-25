import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  isAuthenticate: false,
};
const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.user = action.payload;
      state.isAuthenticate = true;
    },
    userLoggedOut: (state, action) => {
      (state.user = null), (state.isAuthenticate = false);
    },
  },
});

export const {userLoggedIn,userLoggedOut}=authSlice.actions
export default authSlice.reducer