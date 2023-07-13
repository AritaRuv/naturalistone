// api.ts
import axios from "axios";

export const getDimension = async (size: string, thickness: string, finish: string) => {
  try {
    console.log(size)
    console.log(thickness)
    console.log(finish)
    const response = await axios.get(`http://localhost:5000/api/dimensions?size=${size}&thickness=${thickness}&finish=${finish}`);
    
    return response.data;
  } catch (error) {
    console.log(error)
    throw new Error("Error al obtener la dimension de la API");
  }
};

