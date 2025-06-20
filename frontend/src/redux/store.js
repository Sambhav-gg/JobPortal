import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobReducer from "./jobSlice";
import { combineReducers } from "@reduxjs/toolkit"; 
import {companySlice} from "./companySlice";
import applicationSlice from "./applicationSlice"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import companyReducer from "./companySlice";
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}
const rootReducer= combineReducers({
  auth:authSlice,
  job:jobReducer,
  company:companyReducer,
  application:applicationSlice

})
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store; 
