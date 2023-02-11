import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    initialState:
    {
        loggedIn: false,
        privilege:null,
        name:null,
        token:null,
        expires:null,
    },
    reducers:
    {
        login:(state,action)=>{
            state.loggedIn = action.payload.loggedIn;
            state.privilege = action.payload.privilege;
            state.name = action.payload.name;
            state.token = action.payload.token;
            state.expires = action.payload.expires
        } ,
           logOut: (state) => {
            state.loggedIn = false;
            state.privilege = null;
            state.name = null;
            state.token = null;
            state.username = null;
            state.expires = null;
          },
          updateToken: (state, action) => {
            state.token = action.payload;
          },
    }
})

export const { login, logOut, updateToken } = authSlice.actions;
export default authSlice.reducer;