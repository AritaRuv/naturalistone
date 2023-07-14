// api.ts
import { bodyCart } from "@/store/cart/actionsCart";
import axios from "axios";

export const getCart = async (id: number) => {
  try {

    const response = await axios.get(`http://localhost:5000/api/cart/${id}`); // Realiza la solicitud GET a la ruta /api/products de tu backend
    
    return response.data;
  } catch (error) {
    console.log(error)
    throw new Error("Error al obtener el cart de la API");
  }
};

export const addToCart = async (body: bodyCart) => {
  try {

    const response = await axios.post('http://localhost:5000/api/cart', body); 
    
    return response.data;
  } catch (error) {
    console.log(error)
    throw new Error("Error al obtener el cart de la API");
  }
};

