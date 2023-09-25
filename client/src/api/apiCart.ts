// api.ts

import {  bodyCartUpdate } from "@/interfaces/cart";
import { Product, RawProduct } from "@/store/products/typesProducts";
import axios from "axios";
import Cookies from "js-cookie";


export const getCart = async () => {
  try {
    const token: string | undefined = Cookies.get("sessionId");
    const response = await axios.get("http://localhost:5000/api/cart",{
      headers: {
        authorization: token,
      },
    });
    /* 
    response = {
      success = boolean,
      results = [] | string
    } 
    */
    if(response.data.success === false) {
      const cartProductsJson = typeof window !== "undefined" ? localStorage.getItem("cartProducts") : null;
      const productsStorage: Product[] = cartProductsJson !== null ? JSON.parse(cartProductsJson) : [];
      return productsStorage;
    }else{
      return response.data.results;
    }
    
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener el cart de la API");
  }
};

export const addToCart = async (product: RawProduct) => {
  try {
    const token: string | undefined = Cookies.get("sessionId");
    const response = await axios.post("http://localhost:5000/api/cart", product,{
      headers: {
        authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al insertar un producto en el carrito");
  }
};

export const updateCartProd = async (body: bodyCartUpdate) => {
  try {

    const response = await axios.patch("http://localhost:5000/api/cart", body);

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al updatear prod");
  }
};

export const deleteCartProd = async (idEntryCart: number) => {
  try {

    const response = await axios.delete(`http://localhost:5000/api/cart/${idEntryCart}`);
    console.log("deleted");
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error deleting prod");
  }
};

