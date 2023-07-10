// types.ts
export interface Product {
  ProdNameID: number;
  Naturali_ProdName: string
  Material: string;
  }

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export enum ProductActionTypes {
  FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST",
  FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS",
  FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE",
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

export type ProductAction =
  | FetchProductsRequestAction
  | FetchProductsSuccessAction
  | FetchProductsFailureAction;
