import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice.js"
import jobSlice from "./JobSlice.js"
import CompanySlice from "./CompanySlice.js"
import applicationSlice from "./ApplicationSlice.js"
import { configureStore } from '@reduxjs/toolkit'
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
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}
const rootReducer = combineReducers({
    auth:authSlice,
    job:jobSlice,
    company:CompanySlice,
    application:applicationSlice,
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