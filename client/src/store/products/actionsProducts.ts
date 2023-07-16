// actions.ts
import { Dispatch } from "redux";
import { ProductActionTypes, ProductAction } from "./typesProducts";
import {
  getProductValues,
  getProducts,
  getMaterials,
} from "../../api/apiProds"; // Importa tu función de solicitud a la API

export const fetchProducts = (material: string) => {
  return async (dispatch: Dispatch<ProductAction>) => {
    dispatch({ type: ProductActionTypes.FETCH_PRODUCTS_REQUEST });
    try {
      const products = await getProducts(material); // Llama a tu función de solicitud a la AP

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

export const fetchProductsValues = ({ ProdNameID }) => {
  return async (dispatch: Dispatch<ProductAction>) => {
    try {
      const productValues = await getProductValues(ProdNameID); // Llama a tu función de solicitud a la API

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

export const fetchMaterials = () => {
  return async (dispatch: Dispatch<ProductAction>) => {
    dispatch({ type: ProductActionTypes.FETCH_PRODUCTS_REQUEST });
    try {
      const data = await getMaterials(); // Llama a tu función de solicitud a la API
      console.log("dispatch", data);
      dispatch({
        type: ProductActionTypes.FETCH_MATERIALS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ProductActionTypes.FETCH_PRODUCTS_FAILURE,
        error: "Error al obtener los product values",
      });
    }
  };
};

