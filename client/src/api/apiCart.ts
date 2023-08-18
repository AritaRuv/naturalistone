// api.ts
import { bodyCart, bodyCartUpdate } from "@/store/cart/actionsCart";
import axios from "axios";

export const getCart = async (id: number) => {
  try {

    const response = await axios.get(`http://localhost:5000/api/cart/${id}`); // Realiza la solicitud GET a la ruta /api/products de tu backend
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener el cart de la API");
  }
};

export const addToCart = async (body: bodyCart) => {
  try {

    const response = await axios.post("http://localhost:5000/api/cart", body);

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

