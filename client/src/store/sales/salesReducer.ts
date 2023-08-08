/* eslint-disable indent */
import { SalesActions, SalesActionsType, SalesState } from "./typeSales";

const initialState: SalesState = {
  salesProject: [],
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
    default:
      return state;
  }
};

export default salesReducer;
