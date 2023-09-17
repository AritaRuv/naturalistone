// actions.ts
import { Dispatch } from "redux";
import { CartActionTypes, CartAction } from "./typesCart";
import { addToCart, deleteCartProd, getCart, updateCartProd } from "../../api/apiCart"; // Importa tu función de solicitud a la API
import { getToken } from "@/utils/getCookiesToken";
import { RawProduct } from "../products/typesProducts";
import { postCartCookies } from "@/controllers/postCartCookies";
import { bodyCart, bodyCartUpdate } from "@/interfaces/cart";



export const fetchCart = () => {

  return async (dispatch: Dispatch<CartAction>) => {
    dispatch({ type: CartActionTypes.FETCH_CART_REQUEST });
    try {
      const cart = await getCart(); // Llama a tu función de solicitud a la AP
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

export const postCart = (body: bodyCart, raw_products: RawProduct[]) => {

  return async (dispatch: Dispatch<CartAction>) => {

    dispatch({ type: CartActionTypes.FETCH_CART_REQUEST });
    try {
      const token = getToken();
      let cart;
      if(token !== undefined){
        await addToCart(body);
        cart = await getCart();
      }else{
        cart = await postCartCookies(raw_products, body);
      }
      dispatch({
        type: CartActionTypes.POST_CART_PRODUCTS,
        payload: cart
      });
    } catch (error) {
      dispatch({
        type: CartActionTypes.FETCH_CART_FAILURE,
        error: "Error al obtener los productos",
      });
    }
  };
};

export const updateCart = (body: bodyCartUpdate) => {
  return async (dispatch: Dispatch<CartAction>) => {

    dispatch({ type: CartActionTypes.FETCH_CART_REQUEST });
    try {
      await updateCartProd(body);
      const cart = await getCart();

      dispatch({
        type: CartActionTypes.UPDATE_CART_PRODUCTS,
        payload: cart
      });

    } catch (error) {
      dispatch({
        type: CartActionTypes.FETCH_CART_FAILURE,
        error: "Error al obtener los productos del carrito",
      });
    }
  };
};

export const deleteCart = (idEntryCart: number) => {

  return async (dispatch: Dispatch<CartAction>) => {

    dispatch({ type: CartActionTypes.FETCH_CART_REQUEST });
    try {
      await deleteCartProd(idEntryCart);
      const cart = await getCart();

      dispatch({
        type: CartActionTypes.DELETE_CART_PRODUCT,
        payload: cart

      });

    } catch (error) {
      dispatch({
        type: CartActionTypes.FETCH_CART_FAILURE,
        error: "Error al obtener los productos del carrito",
      });
    }
  };
};
