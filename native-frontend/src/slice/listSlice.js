import { createSlice } from "@reduxjs/toolkit";

const listSlice = createSlice({
    name:'glist',
    initialState: {
        listdata:[ ]

    },
    reducers:{
        modify:(state,action)=>{
            state.listdata=action.payload.listdata
        },
  
    }
})
export const {modify} = listSlice.actions

export default listSlice.reducer