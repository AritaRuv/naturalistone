// actions.ts
import { Dispatch } from "redux";
import { DimensionsActionTypes, DimensionsAction } from "./typeDimensions";
import { getDimension } from "@/api/apiDimensions";

export const fetchDimension = (size: string, thickness: string, finish: string) => {

  return async (dispatch: Dispatch<DimensionsAction>) => {
    try {
      const prodDimension = await getDimension(size, thickness, finish); 
      console.log(prodDimension)
      dispatch({ 
        type: DimensionsActionTypes.FETCH_DIMENSION,
        payload: prodDimension 
      });
      
    } catch (error) {
      console.error("Error al obtener las dimensiones:", error);
    }
  };
};
