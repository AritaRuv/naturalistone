// actions.ts
import { Dispatch } from "redux";
import { AddressAction, AddressActionTypes } from "./addressTypes";
import { createAddress, getAllAddressByCusomer } from "@/api/apiAddress";
import { Address } from "@/interfaces/address";

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

export const postAddress = (
  bodyAddress: Address
) => {
  return async (dispatch: Dispatch<AddressAction>) => {
    try {
      const res = await createAddress(bodyAddress);
      const addresses = await getAllAddressByCusomer();

      dispatch({
        type: AddressActionTypes.POST_NEW_ADDRESS,
        payload: res,
      });

      dispatch({
        type: AddressActionTypes.FETCH_ADDRESS_BY_CUSTOMER,
        payload: addresses,
      });
      
      return res;

    }catch(error)
    {
      console.error(
        "Error al guardar address",
        error
      );
    }

  };
};
