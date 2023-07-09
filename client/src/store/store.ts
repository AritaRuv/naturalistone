import { configureStore, combineReducers } from '@reduxjs/toolkit';
import productReducer  from "./prodReducer";

const rootReducer = combineReducers({productReducer})

const store = configureStore({
  reducer: rootReducer,
  // Otras opciones de configuración aquí
});

export default store;