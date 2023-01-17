import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { PURGE } from "redux-persist";

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      storage.remove("root");
    });
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    thunk,
    

});

export const persistor = persistStore(store)