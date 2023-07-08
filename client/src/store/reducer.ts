// reducer.ts
import { AppState, Action, ActionType } from "./types";

export const initialState: AppState = {
  // Inicializa el estado inicial de tu aplicación
  // Ejemplo: counter: 0,
};

export const reducer = (state: AppState = initialState, action: Action): AppState => {
  switch (action.type) {
    // Maneja las diferentes acciones
    // Ejemplo:
    // case ActionType.INCREMENT:
    //   return { ...state, counter: state.counter + action.payload };
    // case ActionType.DECREMENT:
    //   return { ...state, counter: state.counter - action.payload };
    default:
      return state;
  }
};
