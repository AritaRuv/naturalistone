// reducer.ts
import {
  ProjectsAction,
  ProjectsActionsType,
  ProjectsState,
} from "./typeProjects";

const initialState: ProjectsState = {
  customerProjects: "",
  project: {
    idProjects: 0,
    ProjectName: "",
    CustomerID: 0,
    Shipping_Address: "",
    Shipping_ZipCode: "",
    Shipping_State: "",
    Shipping_City: "",
  },
};

const projectsReducer = (
  state = initialState,
  action: ProjectsAction
): ProjectsState => {
  switch (action.type) {
  case ProjectsActionsType.FETCH_PROJECTS_BY_CUSTOMER:
    return {
      ...state,
      customerProjects: action.payload,
    };
  case ProjectsActionsType.POST_PROJECT_CUSTOMER:
    return {
      ...state,
      customerProjects: action.payload,
    };
  case ProjectsActionsType.FETCH_PROJECT:
    return {
      ...state,
      project: action.payload,
    };
  case ProjectsActionsType.PATCH_PROJECT:
    return {
      ...state,
      project: action.payload,
    };
  case ProjectsActionsType.DELETE_PROJECT:
    return {
      ...state,
      project: action.payload,
    };
  default:
    return state;
  }
};

export default projectsReducer;

