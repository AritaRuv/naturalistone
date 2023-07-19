/* eslint-disable quotes */
// api.ts
import axios from "axios";

export const getProducts = async (material: string, colorId: string) => {
  try {
    console.log("material in api", material);
    const response = await axios.get(
      `http://localhost:5000/api/products?material=${material}&colorId=${colorId}`
    ); // Realiza la solicitud GET a la ruta /api/products de tu backend

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener los productos de la API");
  }
};

export const getProductValues = async ({ ProdNameID }) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/products/id/${ProdNameID}`
    );

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

export const getProduct = async (ProdNameID: number, DimensionID: number) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/products/IDs?ProdNameID=${ProdNameID}&DimensionID=${DimensionID}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener el product de la API");
  }
};

