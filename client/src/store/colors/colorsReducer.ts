// reducer.ts
import { ColorsAction, ColorsActionsType, ColorsState } from "./typeColors";

const initialState: ColorsState = {
  colors: [], 
};

const colorsReducer = (
  state = initialState,
  action: ColorsAction
): ColorsState => {
  switch (action.type) {
  case ColorsActionsType.FETCH_COLORS:
    return {
      ...state,
      colors: action.payload,
    };
  default:
    return state;
  }
};

export default colorsReducer;
