// reducer.ts
import { DimensionsState, DimensionsAction, DimensionsActionTypes } from "./typeDimensions";

const initialState: DimensionsState = {
  prodDimension: {}, // Objeto vacío
};

const dimensionsReducer = (state = initialState, action: DimensionsAction): DimensionsState => {
  switch (action.type) {
    case DimensionsActionTypes.FETCH_DIMENSION:
      
      return {
        ...state,
        prodDimension: action.payload,
      };
    default:
      return state;
  }
};

export default dimensionsReducer;
