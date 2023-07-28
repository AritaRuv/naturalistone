// reducer.ts
import { CartState, CartAction, CartActionTypes } from "../cart/typesCart";

const initialState: CartState = {
  cart: [],
  loading: false,
  error: null,
};

const cartReducer = (state = initialState, action: CartAction): CartState => {
  switch (action.type) {
    case CartActionTypes.FETCH_CART_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CartActionTypes.FETCH_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: action.payload,
      };
    case CartActionTypes.FETCH_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case CartActionTypes.POST_CART_PRODUCTS:
      return {
        ...state,
        cart: action.payload
      };
    case CartActionTypes.DELETE_CART_PRODUCT:
      return {
        ...state,
        cart: action.payload
      };
    case CartActionTypes.DELETE_CART_PRODUCT:
      return {
        ...state,
        cart: action.payload
      };
    case CartActionTypes.UPDATE_CART_PRODUCTS:
      return {
        ...state,
        cart: action.payload
      };
    default:
      return state;
  }
};

export default cartReducer;
