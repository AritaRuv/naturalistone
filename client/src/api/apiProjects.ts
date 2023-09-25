// api.ts
import { BodyProject } from "@/interfaces/projects";
import { Project } from "@/store/projects/typeProjects";
import axios from "axios";
import Cookies from "js-cookie";

export const getProjects = async () => {
  try {
    const token: string | undefined = Cookies.get("sessionId");
    if(!token) {
      throw new Error("No token available"); 
    }
    const response = await axios.get(
      "http://localhost:5000/api/projects",{
        headers: {
          authorization: token,
        },
      });
    if(response.data.success === false) return [];
    return response.data.results;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener los projects de la API");
  }
};

export const createProject = async (
  bodyProject: BodyProject,
) => {
  try {
    const token: string | undefined = Cookies.get("sessionId");
    if(!token) {
      throw new Error("No token available"); 
    }
    const response = await axios.post(
      "http://localhost:5000/api/projects/create",bodyProject,{
        headers: {
          authorization: token,
        },
      });
    console.log("api", {response});
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error al crear project en apiProjects");
  }
};
//Funcion que hace pedido a la base de datos para obtener los detalles de un proyecto determinado
export const getProject = async (projectID: number) => {
  const token: string | undefined = Cookies.get("sessionId");
  if(!token) {
    throw new Error("No token available"); 
  }
  try {
    const response = await axios.get(
      `http://localhost:5000/api/projects/project/${projectID}`,{
        headers: {
          authorization: token,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(`Error obtaining project: ${projectID} from API`);
  }
};

export const updateProject = async (bodyProject: Project) => {
  const token: string | undefined = Cookies.get("sessionId");
  if(!token) {
    throw new Error("No token available"); 
  }
  try {
    const response = await axios.patch(
      `http://localhost:5000/api/projects/editproject/${bodyProject.idProjects}`,
      bodyProject
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const deleteProject = async (idProject: string) => {
  const token: string | undefined = Cookies.get("sessionId");
  if(!token) {
    throw new Error("No token available"); 
  }
  try {
    const response = await axios.patch(
      `http://localhost:5000/api/projects/delete/${idProject}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
