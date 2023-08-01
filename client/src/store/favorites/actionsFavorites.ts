// actions.ts
import { Dispatch } from "redux";
import { FavoritesActionTypes, FavoritesAction } from "./typesFavorites";
import { getAllFavorites } from "../../api/apiFavorites"; // Importa tu función de solicitud a la API

export const fetchFavorites = (id: number) => {

  return async (dispatch: Dispatch<FavoritesAction>) => {
    dispatch({ type: FavoritesActionTypes.FETCH_FAVORITES_REQUEST });
    try {
      const favorites = await getAllFavorites(id); // Llama a tu función de solicitud a la AP

      dispatch({
        type: FavoritesActionTypes.FETCH_FAVORITES_SUCCESS,
        payload: favorites,
      });
      
    } catch (error) {
      dispatch({
        type: FavoritesActionTypes.FETCH_FAVORITES_FAILURE,
        error: "Error al obtener los favoritos",
      });
    }
  };
};

