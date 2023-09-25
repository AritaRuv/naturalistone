// actions.ts
import { Dispatch } from "redux";
import { AddressAction, AddressActionTypes } from "./addressTypes";
import { getAllAddressByCusomer } from "@/api/apiAddress";

export const fetchAddresByCustomer = () => {
  return async (dispatch: Dispatch<AddressAction>) => {
    dispatch({ type: AddressActionTypes.FETCH_ADDRESS_REQUEST });
    try {
      const address = await getAllAddressByCusomer(); // Llama a tu función de solicitud a la AP

      dispatch({
        type: AddressActionTypes.FETCH_ADDRESS_BY_CUSTOMER,
        payload: address,
      });

    } catch (error) {
      dispatch({
        type: AddressActionTypes.FETCH_ADDRESS_FAILURE,
        error: "Error al obtener address",
      });
    }
  };
};