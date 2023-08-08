import { Dispatch } from "redux";
import { SalesActions, SalesActionsType } from "./typeSales";
import { getSalesByProject } from "@/api/apiSales";

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
