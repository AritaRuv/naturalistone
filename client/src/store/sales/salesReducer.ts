/* eslint-disable indent */
import { SalesActions, SalesActionsType, SalesState } from "./typeSales";

const initialState: SalesState = {
  salesProject: [],
  salesCustomer: [],
  salesDetail: {
    Naturali_Invoice: 0,
    Value: 0,
    ProjectID: 0,
    ShippingMethod: "",
    ProdID: 0,
    Quantity: 0,
    SalePrice: 0,
    Status: "",
    Naturali_ProdName: "",
    Material: "",
    Amount: 0,
    Method: "",
    payments: [],
    prodSolds: [],
    sale: {
      Naturali_Invoice: 0,
      Value: 0,
      ProjectID: 0,
      SellerID: 0,
      ShippingMethod: "",
      ShipTo: "",
      Status: "",
      ModificationFlag: "",
    },
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
    default:
      return state;
  }
};

export default salesReducer;
