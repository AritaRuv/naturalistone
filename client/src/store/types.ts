// types.ts
export interface AppState {
  // Define la estructura de tu estado
  // Ejemplo: counter: number;
}

export enum ActionType {
  // Define los tipos de acciones que utilizarás
  // Ejemplo: INCREMENT = "INCREMENT",
  // DECREMENT = "DECREMENT",
}

export interface Action {
  type: ActionType; // Agrega la propiedad 'type' al tipo 'Action'
  // Define la estructura de tus acciones
  // Ejemplo:
  // type: ActionType.INCREMENT;
  // payload: number;
}
