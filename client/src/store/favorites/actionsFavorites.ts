// actions.ts
import { Dispatch } from "redux";
import { FavoritesActionTypes, FavoritesAction } from "./typesFavorites";
import {
  deleteFavoriteInProject,
  getAllFavorites,
  postFavoritesProductProject,
  getAllFavoritesByProject
} from "../../api/apiFavorites"; // Importa tu función de solicitud a la API

export const fetchFavorites = () => {
  return async (dispatch: Dispatch<FavoritesAction>) => {
    dispatch({ type: FavoritesActionTypes.FETCH_FAVORITES_REQUEST });
    try {
      const favorites = await getAllFavorites(); // Llama a tu función de solicitud a la AP

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

export const fetchFavoritesByProject = (idProjects: number) => {

  return async (dispatch: Dispatch<FavoritesAction>) => {
    dispatch({ type: FavoritesActionTypes.FETCH_FAVORITES_REQUEST });
    try {
      const favorites_by_project = await getAllFavoritesByProject(idProjects); // Llama a tu función de solicitud a la AP

      dispatch({
        type: FavoritesActionTypes.FETCH_FAVORITES_BY_PROJECT_SUCCESS,
        payload: favorites_by_project,
      });
      
    } catch (error) {
      dispatch({
        type: FavoritesActionTypes.FETCH_FAVORITES_FAILURE,
        error: "Error al obtener los favoritos",
      });}
  };
};

export const postFavoritesProductInProject = (
  idProject: number,
  idProjectName: number
) => {
  return async (dispatch: Dispatch<FavoritesAction>) => {
    // dispatch({ type: FavoritesActionTypes.POST_FAVORITES_PRODUCTS_PROJECT });
    try {
      const data = await postFavoritesProductProject(idProject, idProjectName);
      dispatch({
        type: FavoritesActionTypes.POST_FAVORITES_PRODUCTS_PROJECT,
      });
      return data;
    } catch (error) {
      console.log(error);
      return error.response;
    }
  };
};

export const deleteFavoriteProductInProject = (
  idProject: number,
  idProdName: number
) => {
  return async (dispatch: Dispatch<FavoritesAction>) => {
    dispatch({ type: FavoritesActionTypes.FETCH_FAVORITES_REQUEST });

    try {
      await deleteFavoriteInProject(idProject, idProdName);

      dispatch({
        type: FavoritesActionTypes.DELETE_FAVORITES_PRODUCT_PROJECT,
      });
    } catch (error) {
      dispatch({
        type: FavoritesActionTypes.FETCH_FAVORITES_FAILURE,
        error: error.message, // Otra forma de manejar el error
      });
    }
  };
};
