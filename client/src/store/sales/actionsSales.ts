import { Dispatch } from "redux";
import { SalesActions, SalesActionsType } from "./typeSales";
import {
  getSalesByCustomer,
  getSalesByProject,
  getSalesDetails,
} from "@/api/apiSales";

export function salesByProject(idProject: number) {
  return async function (dispatch: Dispatch<SalesActions>) {
    try {
      const data = await getSalesByProject(idProject);
      dispatch({
        type: SalesActionsType.GET_SALES_BY_PROJECT,
        payload: data,
      });
      return data;
    } catch (error) {
      console.log(error);
      return error.data;
    }
  };
}

export function salesByCustomer(idCustomer: number) {
  return async function (dispatch: Dispatch<SalesActions>) {
    try {
      const data = await getSalesByCustomer(idCustomer);
      dispatch({
        type: SalesActionsType.GET_SALES_BY_CUSTOMER,
        payload: data,
      });
      return data;
    } catch (error) {
      console.log(error);
      return error.data;
    }
  };
}

export function salesDetails(idSales: number) {
  return async function (dispatch: Dispatch<SalesActions>) {
    try {
      const data = await getSalesDetails(idSales);
      dispatch({
        type: SalesActionsType.GET_SALES_DETAILS,
        payload: data,
      });
      return data;
    } catch (error) {
      console.log(error);
      return error.data;
    }
  };
}

export function cleanSaleDetails() {
  return async function (dispatch: Dispatch<SalesActions>) {
    try {
      dispatch({
        type: SalesActionsType.CLEAN_SALES_DETAILS,
        payload: {},
      });
    } catch (error) {
      console.log(error);
      return error.data;
    }
  };
}
