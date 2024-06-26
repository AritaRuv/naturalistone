import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productReducer from "./products/prodReducer";
import cartReducer from "./cart/cartReducer";
import colorsReducer from "./colors/colorsReducer";
import projectsReducer from "./projects/projectsReducer";
import loginReducer from "./login/loginReducer";
import salesReducer from "./sales/salesReducer";
import favoritesReducer from "./favorites/reducerFavorites";
import addressReducer from "./address/addressReducer";


const rootReducer = combineReducers({
  productReducer,
  cartReducer,
  colorsReducer,
  projectsReducer,
  loginReducer,
  salesReducer,
  favoritesReducer,
  addressReducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  // Otras opciones de configuración aquí
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
