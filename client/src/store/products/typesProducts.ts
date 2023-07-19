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

export interface ProductState {
  products: Product[];
  productValues: ProductData;
  materials: string[];
  product: {};
  loading: boolean;
  error: string | null;
}

export enum ProductActionTypes {
  FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST",
  FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS",
  FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE",
  FETCH_PRODUCTS_VALUES = "FETCH_PRODUCTS_VALUES",
  FETCH_MATERIALS = "FETCH_MATERIALS",
  FETCH_PRODUCT_BY_IDS = "FETCH_PRODUCT_BY_IDS",
}

export interface FetchProductsRequestAction {
  type: ProductActionTypes.FETCH_PRODUCTS_REQUEST;
}

export interface FetchProductsSuccessAction {
  type: ProductActionTypes.FETCH_PRODUCTS_SUCCESS;
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

export interface FetchMaterialsAction {
  type: ProductActionTypes.FETCH_MATERIALS;
  payload: string[];
}

export interface FetchProductAction {
  type: ProductActionTypes.FETCH_PRODUCT_BY_IDS;
  payload: {};
}

export type ProductAction =
  | FetchProductsRequestAction
  | FetchProductsSuccessAction
  | FetchProductsFailureAction
  | FetchProductsDataAction
  | FetchMaterialsAction
  | FetchProductAction;

