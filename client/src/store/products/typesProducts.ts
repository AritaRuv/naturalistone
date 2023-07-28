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
  materials: string[];
  product: {};
  loading: boolean;
  error: string | null;
  dimensions: DimensionData | null;
}

export enum ProductActionTypes {
  FETCH_PRODUCTS_HOME_REQUEST = "FETCH_PRODUCTS_HOME_REQUEST",
  FETCH_PRODUCTS_HOME_SUCCESS = "FETCH_PRODUCTS_HOME_SUCCESS",
  FETCH_PRODUCTS_HOME_FAILURE = "FETCH_PRODUCTS_HOME_FAILURE",
  FETCH_PRODUCTS_VALUES = "FETCH_PRODUCTS_VALUES",
  FETCH_MATERIALS = "FETCH_MATERIALS",
  FETCH_PRODUCT_BY_IDS = "FETCH_PRODUCT_BY_IDS",
  FETCH_DIMENSION = "FETCH_DIMENSION",
  FETCH_PRODUCTS_FILTERS_SUCCESS = "FETCH_PRODUCTS_FILTERS_SUCCESS",
}

export interface FetchProductsHomeRequestAction {
  type: ProductActionTypes.FETCH_PRODUCTS_HOME_REQUEST;
}

export interface FetchProductsHomeSuccessAction {
  type: ProductActionTypes.FETCH_PRODUCTS_HOME_SUCCESS;
  payload: Product[];
}
export interface FetchProductsFiltersSuccessAction {
  type: ProductActionTypes.FETCH_PRODUCTS_FILTERS_SUCCESS;
  payload: Product[];
}

export interface FetchProductsHomeFailureAction {
  type: ProductActionTypes.FETCH_PRODUCTS_HOME_FAILURE;
  error: string;
}

export interface FetchProductsDataAction {
  type: ProductActionTypes.FETCH_PRODUCTS_VALUES;
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
  payload: {};
}

export type ProductAction =
  | FetchProductsHomeRequestAction
  | FetchProductsHomeSuccessAction
  | FetchProductsFiltersSuccessAction
  | FetchProductsHomeFailureAction
  | FetchProductsDataAction
  | FetchMaterialsAction
  | FetchDimensionAction
  | FetchProductAction;

