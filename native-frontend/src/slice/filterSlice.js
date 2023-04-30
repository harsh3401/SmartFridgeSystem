import {createSlice} from '@reduxjs/toolkit'


const filterSlice = createSlice({
    name:'filter',
    initialState: {
        filterdata:{},
        filtersApplied: false
    },
    reducers:{
        change:(state,action)=>{
            state.filterdata=action.payload.filterdata
            state.filtersApplied=action.payload.filtersApplied
        },
  
    }
})
export const {change} = filterSlice.actions

export default filterSlice.reducer