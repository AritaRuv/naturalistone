import { Router } from "express";
import {
  deleteProject,
  getProjectByID,
  getProjectsByCustomer,
  postNewProject,
  updateProject,
} from "./projects.controller";

const projectsRouter: Router = Router();

projectsRouter.post("/create", postNewProject);
projectsRouter.patch("/delete/:id", deleteProject);
projectsRouter.patch("/editproject/:id", updateProject);
projectsRouter.get("/project/:id", getProjectByID);
projectsRouter.get("/", getProjectsByCustomer);

export default projectsRouter;
