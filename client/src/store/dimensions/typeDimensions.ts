// typeDimensions.ts
export interface DimensionResponse {
  DimensionID: number;
  Material: string;
  Type: string;
  Size: string;
  Thickness: string;
  Finish: string;
  SQFT_per_Container: number | null;
  SQFT_per_Slab: number | null;
}

export interface DimensionsState {
  prodDimension: {} | DimensionResponse; // Cambiar DimensionResponse por {}
}

export enum DimensionsActionTypes {
  FETCH_DIMENSION = "FETCH_DIMENSION",
}

export interface FetchDimensionRequestAction {
  type: DimensionsActionTypes.FETCH_DIMENSION;
  payload: DimensionResponse;
}

export type DimensionsAction = FetchDimensionRequestAction;
