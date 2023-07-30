// types.ts
export interface Product {
  ProdNameID: number;
  Naturali_ProdName: string;
  Material: string;
}

export interface ProductData {
  [key: string]: {
    size: string[];
    thickness: string[];
    finish: string[];
    prodNameID: number;
  };
}

export interface DimensionData {
  Type: string[];
  Size: string[];
  Thickness: string[];
  Finish: string[];
}

export interface ProductState {
  products: Product[];
  products_filters: Product[];
  productValues: ProductData;
  productValuesValidation: ProductData;
  materials: string[];
  product: Product | null;
  loading: boolean;
  error: string | null;
  dimensions: DimensionData | null;
  product_images: ImageResponse[];
}

interface ImageResponse {
  key: string;
  url: string;
}

export enum ProductActionTypes {
  FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST",
  FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_HOME_SUCCESS",
  FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE",
  FETCH_PRODUCTS_HOME_SUCCESS = "FETCH_PRODUCTS_HOME_SUCCESS",
  FETCH_PRODUCTS_VALUES = "FETCH_PRODUCTS_VALUES",
  FETCH_PRODUCTS_VALUES_VALIDATION = "FETCH_PRODUCTS_VALUES_VALIDATION",
  FETCH_MATERIALS = "FETCH_MATERIALS",
  FETCH_PRODUCT_BY_IDS = "FETCH_PRODUCT_BY_IDS",
  FETCH_PRODUCT_IMAGES = "FETCH_PRODUCT_IMAGES",
  LOAD_PRODUCT = "LOAD_PRODUCT",
  FETCH_DIMENSION = "FETCH_DIMENSION",
  FETCH_PRODUCTS_FILTERS_SUCCESS = "FETCH_PRODUCTS_FILTERS_SUCCESS",
}

export interface FetchProductsRequestAction {
  type: ProductActionTypes.FETCH_PRODUCTS_REQUEST;
}

export interface FetchProductsHomeSuccessAction {
  type: ProductActionTypes.FETCH_PRODUCTS_HOME_SUCCESS;
  payload: Product[];
}
export interface FetchProductsFiltersSuccessAction {
  type: ProductActionTypes.FETCH_PRODUCTS_FILTERS_SUCCESS;
  payload: Product[];
}

export interface FetchProductsFailureAction {
  type: ProductActionTypes.FETCH_PRODUCTS_FAILURE;
  error: string;
}

export interface FetchProductsDataAction {
  type: ProductActionTypes.FETCH_PRODUCTS_VALUES;
  payload: ProductData;
}
export interface FetchProductsDataValidationAction {
  type: ProductActionTypes.FETCH_PRODUCTS_VALUES_VALIDATION;
  payload: ProductData;
}

export interface FetchMaterialsAction {
  type: ProductActionTypes.FETCH_MATERIALS;
  payload: string[];
}

export interface FetchDimensionAction {
  type: ProductActionTypes.FETCH_DIMENSION;
  payload: DimensionData | null;
}

export interface FetchProductAction {
  type: ProductActionTypes.FETCH_PRODUCT_BY_IDS;
  payload: Product[];
}

export interface FetchProductImages {
  type: ProductActionTypes.FETCH_PRODUCT_IMAGES;
  payload: ImageResponse[];
}

export interface LoadProduct {
  type: ProductActionTypes.LOAD_PRODUCT;
  payload: Product;
}

export type ProductAction =
  | FetchProductsRequestAction
  | FetchProductsFailureAction
  | FetchProductsHomeSuccessAction
  | FetchProductsFiltersSuccessAction
  | FetchProductsDataAction
  | FetchProductsDataValidationAction
  | FetchMaterialsAction
  | FetchDimensionAction
  | FetchProductImages
  | LoadProduct
  | FetchProductAction;

