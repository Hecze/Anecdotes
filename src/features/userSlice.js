import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "account",
  initialState: {
   //get local storage username
    username: localStorage.getItem("username"),

  },
  reducers: {
    login: (state, action) => {
      state.username = action.payload;
      //save in localstorage
      localStorage.setItem("username", action.payload);
    },
    logout: (state) => {
      state.username = null;
      //remove from localstorage
      localStorage.removeItem("username");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
