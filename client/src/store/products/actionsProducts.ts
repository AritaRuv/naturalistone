// actions.ts
import { Dispatch } from "redux";
import {
  ProductActionTypes,
  ProductAction,
  Product,
  RawProduct,
} from "./typesProducts";
import {
  getProductValues,
  getProductsHome,
  getMaterials,
  getProduct,
  getDimension,
  getProductImages,
  getProductValuesValidation,
  getProductsByMaterial,
} from "../../api/apiProds"; // Importa tu función de solicitud a la API
import { Filters } from "@/app/products/productFilters/types";
import getProductsFiltered from "@/controllers/productFilters";
import getProductsByProdName from "@/controllers/productByProdName";

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

export const fetchDimension = (material: string) => {
  return async (dispatch: Dispatch<ProductAction>) => {
    dispatch({ type: ProductActionTypes.FETCH_PRODUCTS_REQUEST });
    try {
      const data = await getDimension(material); // Llama a tu función de solicitud a la API
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
//Action que trae productos filtrados por type, finish, size y thickness, no hace pedido a la api y carga los estados product_filtered
export const fetchProductsFilters = (
  raw_products: RawProduct[],
  filters: Filters
) => {
  return async (dispatch: Dispatch<ProductAction>) => {
    dispatch({ type: ProductActionTypes.FETCH_PRODUCTS_REQUEST });
    console.log("hola");
    try {
      const result = getProductsFiltered(raw_products, filters);
      dispatch({
        type: ProductActionTypes.FETCH_PRODUCTS_FILTERS_SUCCESS,
        payload: result,
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
//Action que trae productos de la tabla PRODUCTS filtrados por 1 material
export const fetchProductsByMaterial = (material: string) => {
  return async (dispatch: Dispatch<ProductAction>) => {
    dispatch({ type: ProductActionTypes.FETCH_PRODUCTS_REQUEST });
    try {
      const products = await getProductsByMaterial(material);
      const result = getProductsByProdName(products);
      const data = {
        products,
        result,
      };
      dispatch({
        type: ProductActionTypes.FETCH_PRODUCTS_BY_MATERIAL,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ProductActionTypes.FETCH_PRODUCTS_FAILURE,
        error: "Error al obtener los productos",
      });
    }
  };
};

export const ClearDimension = () => {
  return async (dispatch: Dispatch<ProductAction>) => {
    try {
      dispatch({
        type: ProductActionTypes.CLEAR_DIMENSION,
      });
    } catch (error) {
      console.log("Error in dispatch clean dimensions");
    }
  };
};

export const ClearMaterials = () => {
  return async (dispatch: Dispatch<ProductAction>) => {
    try {
      dispatch({
        type: ProductActionTypes.CLEAR_MATERIALS,
      });
    } catch (error) {
      console.log("Error in dispatch clean materials");
    }
  };
};

export const ClearProductFilters = () => {
  return async (dispatch: Dispatch<ProductAction>) => {
    try {
      dispatch({
        type: ProductActionTypes.CLEAR_PRODUCTS_FILTERS,
      });
    } catch (error) {
      console.log("Error in dispatch clean product filters");
    }
  };
};

export const ClearProductsByMaterial = () => {
  return async (dispatch: Dispatch<ProductAction>) => {
    try {
      dispatch({
        type: ProductActionTypes.CLEAR_PRODUCTS_BY_MATERIAL,
      });
    } catch (error) {
      console.log("Error in dispatch clean products by material");
    }
  };
};
