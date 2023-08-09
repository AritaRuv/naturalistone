// actions.ts
import { Dispatch } from "redux";
import { ProductActionTypes, ProductAction, Product } from "./typesProducts";
import {
  getProductValues,
  getProductsHome,
  getMaterials,
  getProduct,
  getDimension,
  getProductsFilters,
  getProductImages,
  getProductValuesValidation,
  getProductsByMaterial
} from "../../api/apiProds"; // Importa tu función de solicitud a la API
import { Filters } from "@/app/products/productFilters/types";

export const fetchProductsHome = (material: string, colorId: string) => {
  return async (dispatch: Dispatch<ProductAction>) => {
    dispatch({ type: ProductActionTypes.FETCH_PRODUCTS_REQUEST });
    try {
      const products = await getProductsHome(material, colorId);
      dispatch({
        type: ProductActionTypes.FETCH_PRODUCTS_HOME_SUCCESS,
        payload: products,
      });
      return products;
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
    // dispatch({ type: ProductActionTypes.FETCH_PRODUCTS_HOME_REQUEST });
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

export const fetchProduct = (ProductNameID: number, DimensionID: number) => {
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

export const fetchDimension = () => {
  return async (dispatch: Dispatch<ProductAction>) => {
    dispatch({ type: ProductActionTypes.FETCH_PRODUCTS_REQUEST });
    try {
      const data = await getDimension(); // Llama a tu función de solicitud a la API
      dispatch({
        type: ProductActionTypes.FETCH_DIMENSION,
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

export const fetchProductsFilters = (filters: Filters) => {
  return async (dispatch: Dispatch<ProductAction>) => {
    dispatch({ type: ProductActionTypes.FETCH_PRODUCTS_REQUEST });
    try {
      const products = await getProductsFilters(filters);
      dispatch({
        type: ProductActionTypes.FETCH_PRODUCTS_FILTERS_SUCCESS,
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

export const fetchProductImages = (
  Material: string,
  Naturali_ProdName: string
) => {
  return async (dispatch: Dispatch<ProductAction>) => {
    try {
      const images = await getProductImages(Material, Naturali_ProdName);

      dispatch({
        type: ProductActionTypes.FETCH_PRODUCT_IMAGES,
        payload: images,
      });
    } catch (error) {
      console.error("Error al obtener el product images", error);
    }
  };
};

export const loadProduct = (product: Product) => {
  return async (dispatch: Dispatch<ProductAction>) => {
    try {
      dispatch({
        type: ProductActionTypes.LOAD_PRODUCT,
        payload: product,
      });
    } catch (error) {
      console.error("Error al guardar product", error);
    }
  };
};

export const fetchProductsValuesValidation = (
  finish: string,
  size: string,
  thickness: string,
  ProdNameID: number
) => {
  return async (dispatch: Dispatch<ProductAction>) => {
    try {
      const productValuesValidation = await getProductValuesValidation(
        finish,
        size,
        thickness,
        ProdNameID
      ); // Llama a tu función de solicitud a la API
      dispatch({
        type: ProductActionTypes.FETCH_PRODUCTS_VALUES_VALIDATION,
        payload: productValuesValidation,
      });
    } catch (error) {
      dispatch({
        type: ProductActionTypes.FETCH_PRODUCTS_FAILURE,
        error: "Error al obtener los product values",
      });
    }
  };
};

export const fetchProductsByMaterial = (material: string) => {
  return async (dispatch: Dispatch<ProductAction>) => {
    dispatch({ type: ProductActionTypes.FETCH_PRODUCTS_REQUEST });
    try {
      const products = await getProductsByMaterial(material);
      dispatch({
        type: ProductActionTypes.FETCH_PRODUCTS_FILTERS_SUCCESS,
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

