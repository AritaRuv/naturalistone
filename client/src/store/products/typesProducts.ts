// types.ts
export interface Product {
  ProdNameID: number;
  Naturali_ProdName: string
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
  productValues:ProductData;
  loading: boolean;
  error: string | null;
}

export enum ProductActionTypes {
  FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST",
  FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS",
  FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE",
  FETCH_PRODUCTS_VALUES = "FETCH_PRODUCTS_VALUES",
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

export type ProductAction =
  | FetchProductsRequestAction
  | FetchProductsSuccessAction
  | FetchProductsFailureAction
  | FetchProductsDataAction;
