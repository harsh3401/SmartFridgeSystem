import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    initialState:
    {
        email:null,
        token:null,
        uid:null,
    },
    reducers:
    {
        login:(state,action)=>{
            state.email = action.payload.email
            state.token = action.payload.token;
            state.uid = action.payload.uid
        } ,
           logOut: (state) => {
 
            state.token = null;
            state.email = null;
            state.uid = null;
          },
          updateToken: (state, action) => {
            state.token = action.payload;
          },
    }
})

export const { login, logOut, updateToken } = authSlice.actions;
export default authSlice.reducer;