import { configureStore, combineReducers } from '@reduxjs/toolkit';
import productReducer  from "./products/prodReducer";
import cartReducer from './cart/cartReducer';

const rootReducer = combineReducers({productReducer, cartReducer})

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  // Otras opciones de configuración aquí
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;