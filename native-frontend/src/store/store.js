import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import listReducer from "../slice/listSlice";

export default configureStore({
    reducer:{
        auth:authReducer,
        glist:listReducer
    }
})