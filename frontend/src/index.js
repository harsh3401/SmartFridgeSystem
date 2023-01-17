import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import {
  getAccessToken,
  setAccessToken,
} from "./services/sessionStorageService";
import { PersistGate } from 'redux-persist/integration/react'
import session from "redux-persist/lib/storage/session";
import { logOut } from "./slice/authSlice";
import { useDispatch } from "react-redux";
import { useSlider } from "@mui/base";

if (process.env.NODE_ENV === "production") {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}

const root = ReactDOM.createRoot(document.getElementById("root"));
//TODO rollback URL after test
axios.defaults.baseURL = "http://localhost:8000/";

const accessToken = sessionStorage.getItem('accessToken');
console.log(`inside index.js: ${accessToken}`);

// set axios Authorization headers globally
if (accessToken !== null) {
  axios.defaults.headers.common = {
    "Authorization": `Token ${accessToken}`
  };

}
axios.interceptors.response.use(
  (resp) => resp,
  async (error)  => {
    if (error.response.status === 401 ) {
      // logout the user after expiry
      useDispatch(logOut);
    }
    // console.log(error);
    return Promise.reject(error.response);
  }
);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
  
      <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
