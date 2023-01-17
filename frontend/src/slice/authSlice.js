import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loggedIn: false,
    privilege: null,
    name: null,
    token: null,
  },
  reducers: {
    setLogin: (state, action) => {
      state.loggedIn = action.payload.loggedIn;
      state.privilege = action.payload.privilege;
      state.name = action.payload.name;
      state.token = action.payload.token;
      state.email = action.payload.email;
    },
    logOut: (state) => {
      state.loggedIn = false;
      state.privilege = null;
      state.name = null;
      state.token = null;
      state.email = null;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setLogin, logOut, updateToken } = authSlice.actions;
export default authSlice.reducer;
