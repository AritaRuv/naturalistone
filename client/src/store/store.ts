import { configureStore } from '@reduxjs/toolkit';
import { reducer } from "./reducer";

const store = configureStore({
  reducer: reducer,
  // Otras opciones de configuración aquí
});

export default store;