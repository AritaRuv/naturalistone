// reducer.ts
import { ProjectsAction, ProjectsActionsType, ProjectsState } from './typeProjects';


const initialState: ProjectsState = {
  customerProjects: [], 
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
    default:
      return state;
  }
};

export default projectsReducer;
