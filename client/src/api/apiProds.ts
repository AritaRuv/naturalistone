/* eslint-disable quotes */
// api.ts
import axios from "axios";

export const getProducts = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/products"); // Realiza la solicitud GET a la ruta /api/products de tu backend

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener los productos de la API");
  }
};

export const getProductValues = async ({ ProdNameID }) => {
  try {
    console.log(ProdNameID);
    const response = await axios.get(
      `http://localhost:5000/api/products/${ProdNameID}`
    ); // Realiza la solicitud GET a la ruta /api/products de tu backend

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener los product values de la API");
  }
};

export const getMaterials = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/products/material`
    ); // Realiza la solicitud GET a la ruta /api/products de tu backend

    console.log("entre aqui", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener los product values de la API");
  }
};
