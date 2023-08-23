
// reducer.ts
import {
  ProductState,
  ProductAction,
  ProductActionTypes,
} from "./typesProducts";

const initialState: ProductState = {
  products: [],
  products_by_material: [],
  products_filters: [],
  productValues: {},
  productValuesValidation: {},
  materials: [],
  product: null,
  loading: false,
  error: null,
  dimensions: null,
  product_images: [],
  raw_products: [],
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
  case ProductActionTypes.FETCH_PRODUCTS_HOME_SUCCESS:
    return {
      ...state,
      loading: false,
      products: action.payload,
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
    // eslint-disable-next-line no-case-declarations
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
  case ProductActionTypes.FETCH_PRODUCT_IMAGES:
    return {
      ...state,
      product_images: action.payload,
    };

  case ProductActionTypes.LOAD_PRODUCT:
    return {
      ...state,
      product: action.payload,
    };
  case ProductActionTypes.FETCH_PRODUCTS_BY_MATERIAL:
    return {
      ...state,
      products_by_material: action.payload.result,
      raw_products: action.payload.products,
    };
  case ProductActionTypes.CLEAR_DIMENSION:
    return {
      ...state,
      dimensions: null,
    };
  case ProductActionTypes.CLEAR_MATERIALS:
    return {
      ...state,
      materials: [],
    };
  case ProductActionTypes.CLEAR_PRODUCTS_BY_MATERIAL:
    return {
      ...state,
      products_by_material: [],
      raw_products: [],
    };
  case ProductActionTypes.CLEAR_PRODUCTS_FILTERS:
    return {
      ...state,
      products_filters: [],
    };
  default:
    return state;
  }
};

export default productReducer;
