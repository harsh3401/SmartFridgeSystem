import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import listReducer from "../slice/listSlice";
import filterReducer from "../slice/filterSlice";
export default configureStore({
    reducer:{
        auth:authReducer,
        glist:listReducer,
        filter:filterReducer,
    }
})