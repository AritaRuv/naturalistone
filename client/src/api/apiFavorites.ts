// api.ts
import axios from "axios";

export const getAllFavorites = async (id: number) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/favorites/get_all/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener favorites de la API");
  }
};