// actions.ts
import { Dispatch } from "redux";
import { CartActionTypes, CartAction } from "./typesCart";
import { getCart } from '../../api/apiCart'; // Importa tu función de solicitud a la API

export const fetchCart = (id: number) => {

  return async (dispatch: Dispatch<CartAction>) => {
    dispatch({ type: CartActionTypes.FETCH_CART_REQUEST });
    try {
      const cart = await getCart(id); // Llama a tu función de solicitud a la AP

      dispatch({
        _type: CartActionTypes.FETCH_CART_SUCCESS,
        get type() {
          return this._type;
        },
        set type(value) {
          this._type = value;
        },
        payload: cart,
      });
      
    } catch (error) {
      dispatch({
        type: CartActionTypes.FETCH_CART_FAILURE,
        error: "Error al obtener los productos",
      });
    }
  };
};

