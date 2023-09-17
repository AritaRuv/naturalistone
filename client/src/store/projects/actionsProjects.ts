// actions.ts
import { Dispatch } from "redux";
import { Project, ProjectsAction, ProjectsActionsType } from "./typeProjects";
import {
  createProject,
  getProject,
  getProjects,
  updateProject,
  deleteProject,
} from "@/api/apiProjects";

export interface BodyProject {
  ProjectName: string;
  CustomerID?: number;
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
      console.error(
        `Error al obtener los projectos del Customer: ${CustomerID}`,
        error
      );
    }
  };
};

export const postCustomerProject = (
  CustomerID: number,
  bodyProject: BodyProject
) => {
  return async (dispatch: Dispatch<ProjectsAction>) => {
    try {
      const res = await createProject(bodyProject, CustomerID);
      const projects = await getProjects(CustomerID);

      dispatch({
        type: ProjectsActionsType.POST_PROJECT_CUSTOMER,
        payload: projects,
      });

      dispatch({
        type: ProjectsActionsType.FETCH_PROJECTS_BY_CUSTOMER,
        payload: projects,
      });
      return res;
    } catch (error) {
      console.error(
        `Error al obtener los projectos del Customer: ${CustomerID}`,
        error
      );
    }
  };
};

export const fetchProjectByID = (projectID: number) => {
  return async (dispatch: Dispatch<ProjectsAction>) => {
    try {
      const project = await getProject(projectID);
      dispatch({
        type: ProjectsActionsType.FETCH_PROJECT,
        payload: project,
      });
    } catch (error) {
      console.error(`Error al obtener el projecto: ${projectID}`, error);
    }
  };
};

export const patchProject = (bodyProject: Project) => {
  return async (dispatch: Dispatch<ProjectsAction>) => {
    try {
      const data = await updateProject(bodyProject);
      const project = await getProject(bodyProject.idProjects);
      dispatch({
        type: ProjectsActionsType.PATCH_PROJECT,
        payload: project,
      });
      return data;
    } catch (error) {
      console.log("error patch project", error);
    }
  };
};

export const deleteUserProject = (idProject: string) => {
  return async (dispatch: Dispatch<ProjectsAction>) => {
    try {
      const project = await deleteProject(idProject);
      dispatch({
        type: ProjectsActionsType.DELETE_PROJECT,
        payload: project,
      });
      return project;
    } catch (error) {
      console.log("error in delete user project", error);
    }
  };
};
