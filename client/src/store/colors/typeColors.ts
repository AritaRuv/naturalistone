// typeDimensions.ts

export interface ColorsState {
  colors: string[];
}

export enum ColorsActionsType {
  FETCH_COLORS = "FETCH_COLORS",
}

export interface FetchColorsRequestAction {
  type: ColorsActionsType.FETCH_COLORS;
  payload: string[];
}

export type ColorsAction = FetchColorsRequestAction;
