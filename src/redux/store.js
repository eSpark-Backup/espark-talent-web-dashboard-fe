// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from "redux";
import profileMenuSlice from './slices/profileMenuSlice';
import workSpaceMenuSlice from './slices/workSpaceMenuSlice';
import authSlice from './slices/authSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // specify which reducers you want to persist
};

const persistedReducer = persistReducer(persistConfig, combineReducers({
  profileMenu: profileMenuSlice,
  workSpaceMenu: workSpaceMenuSlice,
  auth: authSlice,
}));

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };