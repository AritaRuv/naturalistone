// reducer.ts
import { ProductState, ProductAction, ProductActionTypes } from "./types";

const initialState: ProductState = {
  products: [],
  productValues:{},
  loading: false,
  error: null,
};

const productReducer = (state = initialState, action: ProductAction): ProductState => {
  switch (action.type) {
    case ProductActionTypes.FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ProductActionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case ProductActionTypes.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case ProductActionTypes.FETCH_PRODUCTS_VALUES:
     const key = Object.keys(action.payload.transformedResults)[0];
    
      return {
        ...state,
        productValues: {
          ...state.productValues,
          [key]:action.payload.transformedResults[key]
          }}   
    default:
      return state;
  }
};

export default productReducer;
