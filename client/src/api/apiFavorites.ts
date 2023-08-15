// api.ts
import axios from "axios";

export const getAllFavorites = async (id: number) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/favorites/get_all/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener favorites de la API");
  }
};

export const postFavoritesProductProject = async (
  idProject: number,
  idProjectName: number
) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/favorites/productsproject/${idProject}/${idProjectName}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
