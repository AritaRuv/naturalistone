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
  idprodname: number
) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/favorites/productsproject/${idProject}/${idprodname}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const deleteFavoriteInProject = async (
  idProject: number,
  idprodname: number
) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/favorites/deletefavorites/${idProject}/${idprodname}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
