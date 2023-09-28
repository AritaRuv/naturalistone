// api.ts
import { Address } from "@/interfaces/Address";
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

export const createAddress = async (
  bodyAddress: Address,
) => {
  try {
    const token: string | undefined = Cookies.get("sessionId");
    if (!token) {
      throw new Error("No token available");
    }
    const response = await axios.post(
      "http://localhost:5000/api/projects/create", bodyAddress, {
      headers: {
        authorization: token,
      },
    });
    console.log("api", { response });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al crear project en apiProjects");
  }
};
