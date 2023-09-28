// types.ts
export interface Address {
  Nickname: string;
  AddressId: number;
  CustomerId: number;
  Address: string;
  Address2: string;
  City: string;
  State: string;
  ZipCode: string;
}

export interface AddressState {
    address_by_customer: Address[] | "" ;
    loading: boolean;
    error: string | null;
  }
  
export enum AddressActionTypes {
    FETCH_ADDRESS_REQUEST = "FETCH_ADDRESS_REQUEST",
    FETCH_ADDRESS_SUCCESS = "FETCH_ADDRESS_SUCCESS",
    FETCH_ADDRESS_FAILURE = "FETCH_ADDRESS_FAILURE",
    FETCH_ADDRESS_BY_CUSTOMER = "FETCH_ADDRESS_BY_CUSTOMER",
    POST_NEW_ADDRESS = "POST_NEW_ADDRESS",
    DELETE_ADDRESS = "DELETE_ADDRESS",
  }
  
export interface FetchAddresssRequestAction {
  type: AddressActionTypes.FETCH_ADDRESS_REQUEST;
}

export interface FetchAddressSuccessAction {
  type: AddressActionTypes.FETCH_ADDRESS_SUCCESS;
  payload: Address[];
}
export interface FetchAddressByCustomer {
  type: AddressActionTypes.FETCH_ADDRESS_BY_CUSTOMER;
  payload: Address[];
}
export interface PostNewAddress {
    type: AddressActionTypes.POST_NEW_ADDRESS;
    payload: Address[];
  }
export interface DeleteAddress {
    type: AddressActionTypes.DELETE_ADDRESS;
    payload: Address[];
  }
export interface FetchAddressFailureAction {
    type: AddressActionTypes.FETCH_ADDRESS_FAILURE;
    error: string;
  }

export type AddressAction =
    | FetchAddresssRequestAction
    | FetchAddressSuccessAction
    | FetchAddressByCustomer
    | FetchAddressFailureAction
    | DeleteAddress
    | PostNewAddress;
