import { configureStore, combineReducers } from '@reduxjs/toolkit';
import productReducer  from "./prodReducer";

const rootReducer = combineReducers({productReducer})

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  // Otras opciones de configuración aquí
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;