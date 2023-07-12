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
    default:
      return state;
  }
};

export default cartReducer;
