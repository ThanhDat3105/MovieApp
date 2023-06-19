import { movieReducer } from "./reducers/movieReducer";
import { combineReducers, configureStore, AnyAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import thunk, { ThunkDispatch } from "redux-thunk";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  movieReducer,
});

export const store = configureStore({
  reducer: persistReducer(
    { key: "root", storage: storage, blacklist: ["movieReducer"] },
    rootReducer
  ),
  devTools: true,
  middleware: [thunk],
});

export type RootState = ReturnType<(typeof store)["getState"]>;
export type RootDispatch = (typeof store)["dispatch"] &
  ThunkDispatch<RootState, any, AnyAction>;
