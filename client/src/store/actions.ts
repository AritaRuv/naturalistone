// actions.ts
import { Dispatch } from "redux";
import { ProductActionTypes, ProductAction } from "./types";
import { getProductValues, getProducts } from '../api/apiProds'; // Importa tu función de solicitud a la API

export const fetchProducts = () => {

  return async (dispatch: Dispatch<ProductAction>) => {
    dispatch({ type: ProductActionTypes.FETCH_PRODUCTS_REQUEST });
    try {
      const products = await getProducts(); // Llama a tu función de solicitud a la AP

      dispatch({
        type: ProductActionTypes.FETCH_PRODUCTS_SUCCESS,
        payload: products,
      });
      
    } catch (error) {
      dispatch({
        type: ProductActionTypes.FETCH_PRODUCTS_FAILURE,
        error: "Error al obtener los productos",
      });
    }
  };
};

export const fetchProductsValues = ({ProdNameID}) => {

  return async (dispatch: Dispatch<ProductAction>) => {
    dispatch({ type: ProductActionTypes.FETCH_PRODUCTS_REQUEST });
    try {
      const productValues = await getProductValues(ProdNameID); // Llama a tu función de solicitud a la API

      console.log('actions', productValues)

      dispatch({
        type: ProductActionTypes.FETCH_PRODUCTS_VALUES,
        payload: productValues,
      });
      
    } catch (error) {
      dispatch({
        type: ProductActionTypes.FETCH_PRODUCTS_FAILURE,
        error: "Error al obtener los product values",
      });
    }
  };
};