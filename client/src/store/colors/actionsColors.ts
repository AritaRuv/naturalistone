// actions.ts
import { Dispatch } from "redux";
import { ColorsActionsType, ColorsAction } from "./typeColors";
import { getColors } from "@/api/apiColors";

export const fetchColors = () => {
  return async (dispatch: Dispatch<ColorsAction>) => {
    try {

      const colors = await getColors();
      dispatch({
        type: ColorsActionsType.FETCH_COLORS,
        payload: colors,
      });
    } catch (error) {
      console.error("Error al obtener los colores:", error);
    }
  };
};
