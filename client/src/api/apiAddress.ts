// api.ts
import axios from "axios";
import Cookies from "js-cookie";


export const getAllAddressByCusomer = async () => {
  try {
    const token: string | undefined = Cookies.get("sessionId");
    const response = await axios.get(
      "http://localhost:5000/api/address/get_all",
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
