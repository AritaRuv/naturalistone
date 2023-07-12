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
    }
  
  export interface CartState {
    cart: ProductCart[];
    loading: boolean;
    error: string | null;
  }
  
  export enum CartActionTypes {
    FETCH_CART_REQUEST = "FETCH_CART_REQUEST",
    FETCH_CART_SUCCESS = "FETCH_CART_SUCCESS",
    FETCH_CART_FAILURE = "FETCH_CART_FAILURE",
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
  
  export type CartAction =
    | FetchCartRequestAction
    | FetchCartSuccessAction
    | FetchCartFailureAction

  