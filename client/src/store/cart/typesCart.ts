// types.ts
export interface ProductCart {
  Quantity: number;
  idCartEntry: number;
  CustomerID: number;
  SalePrice: number;
  Type: string;
  Size: string;
  Thickness: string;
  Finish: string;
  Naturali_ProdName: string;
  Material: string;
  ToInvoice: number;
  AddExtra: number;
  ProdID?: number;
}

export interface CartState {
  cart: ProductCart[] | string;
  loading: boolean;
  error: string | null;
}

export enum CartActionTypes {
  FETCH_CART_REQUEST = "FETCH_CART_REQUEST",
  FETCH_CART_SUCCESS = "FETCH_CART_SUCCESS",
  FETCH_CART_FAILURE = "FETCH_CART_FAILURE",
  POST_CART_PRODUCTS = "POST_CART_PRODUCTS",
  UPDATE_CART_PRODUCTS = "UPDATE_CART_PRODUCTS",
  DELETE_CART_PRODUCT = "DELETE_CART_PRODUCT",
}

export interface FetchCartRequestAction {
  type: CartActionTypes.FETCH_CART_REQUEST;
}

export interface FetchCartSuccessAction {
  type: CartActionTypes.FETCH_CART_SUCCESS;
  payload: ProductCart[];
}

export interface FetchCartFailureAction {
  type: CartActionTypes.FETCH_CART_FAILURE;
  error: string;
}

export interface PostCartProductsAction {
  type: CartActionTypes.POST_CART_PRODUCTS;
}

export interface UpdateCartProductsAction {
  type: CartActionTypes.UPDATE_CART_PRODUCTS;
  payload: ProductCart[];
}

export interface DeleteCartProductAction {
  type: CartActionTypes.DELETE_CART_PRODUCT;
  payload: ProductCart[];
}

export type CartAction =
  | FetchCartRequestAction
  | FetchCartSuccessAction
  | FetchCartFailureAction
  | PostCartProductsAction
  | DeleteCartProductAction
  | UpdateCartProductsAction;
