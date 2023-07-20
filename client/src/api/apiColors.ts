/* eslint-disable quotes */
// api.ts
import axios from "axios";

export const getColors = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/colors"); // Realiza la solicitud GET a la ruta /api/products de tu backend

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener los colores de la API");
  }
};
