import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { combineReducers, Reducer } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";
import themeReducer from "./reducer/themeReducer";
import userReducer from "./reducer/userReducer";
import tabReducer from "./reducer/tabReducer";
import storeReducer from "./reducer/storeReducer";
import infoDetailReducer from "./reducer/infoDetailReducer";

const customizedMiddleware = {
  serializableCheck: false,
};

const persistConfig = {
  key: "root",
  storage,
};

const allReducer: Reducer = combineReducers({
  themeReducer: themeReducer,
  userReducer: userReducer,
  tabReducer: tabReducer,
  storeReducer: storeReducer,
  infoDetailReducer: infoDetailReducer,
});
const persistedReducer = persistReducer(persistConfig, allReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getMiddleware) =>
    getMiddleware(customizedMiddleware).concat(thunk),
});
export const persistor = persistStore(store);

// Defining the RootState type
export type RootState = ReturnType<typeof store.getState>;

// Defining the AppDispatch type
export type AppDispatch = typeof store.dispatch;

// Defining a custom hook for accessing dispatch function
// This hook provides the AppDispatch type to useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
