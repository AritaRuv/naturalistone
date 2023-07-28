// actions.ts
import { Dispatch } from "redux";
import { ProjectsAction, ProjectsActionsType } from './typeProjects';
import { createProject, getProjects } from "@/api/apiProjects";

export interface bodyProject {
  ProjectName: string;
  CustomerID: number;
  Shipping_Address: string;
  Shipping_ZipCode: string;
  Shipping_State: string;
  Shipping_City: string;
}

export const fetchProjectsCustomer = (CustomerID: number) => {
  return async (dispatch: Dispatch<ProjectsAction>) => {
    try {

      const projects = await getProjects(CustomerID);
      dispatch({
        type: ProjectsActionsType.FETCH_PROJECTS_BY_CUSTOMER,
        payload: projects,
      });
    } catch (error) {
      console.error(`Error al obtener los projectos del Customer: ${CustomerID}`, error);
    }
  };
};

export const postCustomerProject = (CustomerID: number, bodyCart:bodyProject) => {
  return async (dispatch: Dispatch<ProjectsAction>) => {
    try {
      const res = await createProject(bodyCart); 
      const projects = await getProjects(CustomerID);

      dispatch({
        type: ProjectsActionsType.POST_PROJECT_CUSTOMER,
        payload: projects
      });

      dispatch({
        type: ProjectsActionsType.FETCH_PROJECTS_BY_CUSTOMER,
        payload: projects,
      });
    } catch (error) {
      console.error(`Error al obtener los projectos del Customer: ${CustomerID}`, error);
    }
  };
};
