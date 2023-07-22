// reducer.ts
import {
  ProductState,
  ProductAction,
  ProductActionTypes,
} from "./typesProducts";

const initialState: ProductState = {
  products: [],
  products_filters: [],
  productValues: {},
  materials: [],
  product: {},
  loading: false,
  error: null,
  dimensions: null
};

const productReducer = (
  state = initialState,
  action: ProductAction
): ProductState => {
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
    case ProductActionTypes.FETCH_PRODUCTS_FILTERS_SUCCESS:
      return {
        ...state,
        loading: false,
        products_filters: action.payload,
      };
    case ProductActionTypes.FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case ProductActionTypes.FETCH_PRODUCTS_VALUES:
      const key = Object.keys(action.payload)[0];

      return {
        ...state,
        productValues: {
          ...state.productValues,
          [key]: action.payload[key],
        },
      };
    case ProductActionTypes.FETCH_MATERIALS:
      return {
        ...state,
        materials: action.payload,
      };
    case ProductActionTypes.FETCH_DIMENSION:
      return {
        ...state,
        dimensions: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
