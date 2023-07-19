// actions.ts
import { Dispatch } from "redux";
import { ProductActionTypes, ProductAction } from "./typesProducts";
import {
  getProductValues,
  getProducts,
  getMaterials,
  getProduct,
} from "../../api/apiProds"; // Importa tu función de solicitud a la API

export const fetchProducts = (material: string, colorId: string) => {
  return async (dispatch: Dispatch<ProductAction>) => {
    dispatch({ type: ProductActionTypes.FETCH_PRODUCTS_REQUEST });
    try {
      const products = await getProducts(material, colorId); // Llama a tu función de solicitud a la AP

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
      dispatch({
        type: ProductActionTypes.FETCH_MATERIALS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ProductActionTypes.FETCH_PRODUCTS_FAILURE,
        error: "Error al obtener los product materials",
      });
    }
  };
};

export const fetchProduct = (ProductNameID: number, DimensionID) => {
  return async (dispatch: Dispatch<ProductAction>) => {
    try {
      const product = await getProduct(ProductNameID, DimensionID);

      dispatch({
        type: ProductActionTypes.FETCH_PRODUCT_BY_IDS,
        payload: product,
      });
    } catch (error) {
      console.error("Error al obtener el product", error);
    }
  };
};

