import { Product } from "../products/typesProducts";

// types.ts
export interface FavoritesState {
  favorites: Product[];
  loading: boolean;
  error: string | null;
}

export enum FavoritesActionTypes {
  FETCH_FAVORITES_REQUEST = "FETCH_FAVORITES_REQUEST",
  FETCH_FAVORITES_SUCCESS = "FETCH_FAVORITES_SUCCESS",
  FETCH_FAVORITES_FAILURE = "FETCH_FAVORITES_FAILURE",
  POST_FAVORITES_PRODUCTS_PROJECT = "POST_FAVORITES_PRODUCTS_PROJECT",
}

export interface FetchFavoritesRequestAction {
  type: FavoritesActionTypes.FETCH_FAVORITES_REQUEST;
}

export interface FetchFavoritesSuccessAction {
  type: FavoritesActionTypes.FETCH_FAVORITES_SUCCESS;
  payload: Product[];
}

export interface FetchFavoritesFailureAction {
  type: FavoritesActionTypes.FETCH_FAVORITES_FAILURE;
  error: string;
}

export interface PostFavoritesProductsProject {
  type: FavoritesActionTypes.POST_FAVORITES_PRODUCTS_PROJECT;
}

export type FavoritesAction =
  | FetchFavoritesRequestAction
  | FetchFavoritesSuccessAction
  | FetchFavoritesFailureAction
  | PostFavoritesProductsProject;
