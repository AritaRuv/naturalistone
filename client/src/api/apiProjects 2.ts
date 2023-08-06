/* eslint-disable quotes */
// api.ts
import { BodyProject } from "@/store/projects/actionsProjects";
import axios from "axios";

export const getProjects = async (CustomerID: number) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/projects/${CustomerID}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener los projects de la API");
  }
};

export const createProject = async (bodyProject: BodyProject) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/projects`,
      bodyProject
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al crear project en apiProjects");
  }
};

export const getProject = async (projectID: number) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/projects/project/${projectID}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(`Error obtaining project: ${projectID} from API`);
  }
};
