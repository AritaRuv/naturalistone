/* eslint-disable indent */
import { SalesActions, SalesActionsType, SalesState } from "./typeSales";

const initialState: SalesState = {
  salesProject: [],
  salesCustomer: [],
  salesDetail: {
    sale: {
      Naturali_Invoice: 0,
      Value: 0,
      ProjectID: 0,
      ShippingMethod: "",
      ShipTo: "",
      Status: "",
    },
    payments: [],
    prodSolds: [],
  },
};

const salesReducer = (
  state = initialState,
  action: SalesActions
): SalesState => {
  switch (action.type) {
    case SalesActionsType.GET_SALES_BY_PROJECT:
      return {
        ...state,
        salesProject: action.payload,
      };
    case SalesActionsType.GET_SALES_BY_CUSTOMER:
      return {
        ...state,
        salesCustomer: action.payload,
      };
    case SalesActionsType.GET_SALES_DETAILS:
      return {
        ...state,
        salesDetail: action.payload,
      };
    case SalesActionsType.CLEAN_SALES_DETAILS:
      return {
        ...state,
        salesDetail: action.payload,
      };
    default:
      return state;
  }
};

export default salesReducer;
