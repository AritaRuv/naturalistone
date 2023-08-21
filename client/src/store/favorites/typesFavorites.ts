import { Product } from "../products/typesProducts";

// types.ts
export interface FavoritesState {
    favorites: Product[];
    project_favorites: Product[];
    loading: boolean;
    error: string | null;
  }
  
export enum FavoritesActionTypes {
    FETCH_FAVORITES_REQUEST = "FETCH_FAVORITES_REQUEST",
    FETCH_FAVORITES_SUCCESS = "FETCH_FAVORITES_SUCCESS",
    FETCH_FAVORITES_BY_PROJECT_SUCCESS = "FETCH_FAVORITES_BY_PROJECT_SUCCESS",
    FETCH_FAVORITES_FAILURE = "FETCH_FAVORITES_FAILURE",
  }
  
export interface FetchFavoritesRequestAction {
    type: FavoritesActionTypes.FETCH_FAVORITES_REQUEST;
  }
  
export interface FetchFavoritesSuccessAction {
    type: FavoritesActionTypes.FETCH_FAVORITES_SUCCESS;
    payload: Product[];
  }
export interface FetchFavoritesByProjectSuccessAction {
    type: FavoritesActionTypes.FETCH_FAVORITES_BY_PROJECT_SUCCESS;
    payload: Product[];
  }
  
export interface FetchFavoritesFailureAction {
    type: FavoritesActionTypes.FETCH_FAVORITES_FAILURE;
    error: string;
  }
  

export type FavoritesAction =
    | FetchFavoritesRequestAction
    | FetchFavoritesSuccessAction
    | FetchFavoritesFailureAction
    | FetchFavoritesByProjectSuccessAction

  