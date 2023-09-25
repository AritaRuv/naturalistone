// api.ts
import axios from "axios";
import Cookies from "js-cookie";


export const getAllFavorites = async () => {
  try {
    const token: string | undefined = Cookies.get("sessionId");
    const response = await axios.get(
      "http://localhost:5000/api/favorites/get_all",
      {
        headers: {
          authorization: token,
        },
      }
    );
    if(response.data.success === false) return [];
    else{
      return response.data.results;
    }
    
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener favorites de la API");
  }
};

export const getAllFavoritesByProject = async (idProjects: number) => {
  try {
    const token: string | undefined = Cookies.get("sessionId");
    if(!token) return [];
    const response = await axios.get(`http://localhost:5000/api/favorites/byProject/${idProjects}`,{
      headers: {
        authorization: token,
      },
    });
    if(response.data.success === false){
      return [];
    }
    return response.data.results;
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
    const token: string | undefined = Cookies.get("sessionId");
    if(!token) return "No token";
    const response = await axios.post(
      `http://localhost:5000/api/favorites/productsproject/${idProject}/${idprodname}`, {
        headers: {
          authorization: token,
        },
      });
    if(response.data.success === false) return response.data.msg;
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
    const token: string | undefined = Cookies.get("sessionId");
    if(!token) return "No token";
    const response = await axios.delete(
      `http://localhost:5000/api/favorites/deletefavorites/${idProject}/${idprodname}`,{
        headers: {
          authorization: token,
        },
      }
    );
    if(response.data.success === false) return response.data.msg;
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
