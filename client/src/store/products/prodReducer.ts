// reducer.ts
import {
  ProductState,
  ProductAction,
  ProductActionTypes,
} from "./typesProducts";

const initialState: ProductState = {
  products: [],
  productValues: {},
  materials: [],
  product: {},
  loading: false,
  error: null,
};

const productReducer = (
  state = initialState,
  action: ProductAction
): ProductState => {
  switch (action.type) {
    case ProductActionTypes.FETCH_PRODUCTS_HOME_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ProductActionTypes.FETCH_PRODUCTS_HOME_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case ProductActionTypes.FETCH_PRODUCTS_HOME_FAILURE:
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
        // productsByProdNameID: action.payload.results as unknown  as ProductsByProdNameID[]
      };
    case ProductActionTypes.FETCH_MATERIALS:
      return {
        ...state,
        materials: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
