// typeDimensions.ts
export interface Colors {
  ColorID: number;
  Color: string;
}

export interface ColorsState {
  colors: Colors[];
}

export enum ColorsActionsType {
  FETCH_COLORS = "FETCH_COLORS",
}

export interface FetchColorsRequestAction {
  type: ColorsActionsType.FETCH_COLORS;
  payload: Colors[];
}

export type ColorsAction = FetchColorsRequestAction;
