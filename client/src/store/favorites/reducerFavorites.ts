/* eslint-disable indent */
// reducer.ts
import {
  FavoritesAction,
  FavoritesActionTypes,
  FavoritesState,
} from "../favorites/typesFavorites";

const initialState: FavoritesState = {
  favorites: [],
  project_favorites: [],
  loading: false,
  error: null,
};

const favoritesReducer = (
  state = initialState,
  action: FavoritesAction
): FavoritesState => {
  switch (action.type) {
  case FavoritesActionTypes.FETCH_FAVORITES_REQUEST:
    return {
      ...state,
      loading: true,
      error: null,
    };
  case FavoritesActionTypes.FETCH_FAVORITES_SUCCESS:
    return {
      ...state,
      loading: false,
      favorites: action.payload,
    };
  case FavoritesActionTypes.FETCH_FAVORITES_BY_PROJECT_SUCCESS:
    return {
      ...state,
      loading: false,
      project_favorites: action.payload,
    };
  case FavoritesActionTypes.FETCH_FAVORITES_FAILURE:
    return {
      ...state,
      loading: false,
      error: action.error,
    };
    case FavoritesActionTypes.POST_FAVORITES_PRODUCTS_PROJECT:
      return {
        ...state,
      };
    case FavoritesActionTypes.DELETE_FAVORITES_PRODUCT_PROJECT:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default favoritesReducer;
