// reducer.ts

import { AddressAction, AddressActionTypes, AddressState } from "./addressTypes";

  
  
const initialState: AddressState = {
  address_by_customer: "",
  loading: false,
  error: null,
};
  
const addressReducer = (
  state = initialState,
  action: AddressAction
): AddressState => {
  switch (action.type) {
  case AddressActionTypes.FETCH_ADDRESS_REQUEST:
    return {
      ...state,
      loading: true,
      error: null,
    };
  case AddressActionTypes.FETCH_ADDRESS_SUCCESS:
    return {
      ...state,
      loading: false,
    };
  case AddressActionTypes.FETCH_ADDRESS_BY_CUSTOMER:
    return {
      ...state,
      loading: false,
      address_by_customer: action.payload,
    };
  case AddressActionTypes.FETCH_ADDRESS_FAILURE:
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  case AddressActionTypes.POST_NEW_ADDRESS:
    return {
      ...state,
    };
  case AddressActionTypes.DELETE_ADDRESS:
    return {
      ...state,
    };
  default:
    return state;
  }
};
  
export default addressReducer;
  