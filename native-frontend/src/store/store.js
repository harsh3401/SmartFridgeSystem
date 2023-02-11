import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";

export default configureStore({
    reducer:{
        auth:authReducer
    }
})