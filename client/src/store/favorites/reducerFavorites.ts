/* eslint-disable indent */
// reducer.ts
import {
  FavoritesAction,
  FavoritesActionTypes,
  FavoritesState,
} from "../favorites/typesFavorites";

const initialState: FavoritesState = {
  favorites: [],
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
    default:
      return state;
  }
};

export default favoritesReducer;
