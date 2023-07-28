// actions.ts
import { Dispatch } from "redux";
import { CartActionTypes, CartAction } from "./typesCart";
import { addToCart, deleteCartProd, getCart, updateCartProd } from '../../api/apiCart'; // Importa tu función de solicitud a la API

export interface bodyCart {
  size: string | null;
  thickness:string;
  finish:string;
  ProdNameID: number;
  customerID: number;
}

export interface bodyCartUpdate {
  Quantity: number;
  idCartEntry: number;
  customerID: number;
}

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

export const postCart = (body: bodyCart) => {

  return async (dispatch: Dispatch<CartAction>) => {

  dispatch({ type: CartActionTypes.FETCH_CART_REQUEST });
    try {
      const res = await addToCart(body); 
      const cart = await getCart(body.customerID)

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
  }};

export const updateCart = (body: bodyCartUpdate) => {

  return async (dispatch: Dispatch<CartAction>) => {

  dispatch({ type: CartActionTypes.FETCH_CART_REQUEST });
    try {
      const res = await updateCartProd(body); 
      const cart = await getCart(body.customerID)

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
  }
  };

export const deleteCart = (idEntryCart:number, customerID:number) => {

  return async (dispatch: Dispatch<CartAction>) => {

  dispatch({ type: CartActionTypes.FETCH_CART_REQUEST });
    try {
      console.log(idEntryCart)
      const res = await deleteCartProd(idEntryCart);
      const cart = await getCart(customerID)

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
  }
  };
