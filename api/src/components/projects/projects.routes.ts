import { Router } from "express";
import {
  getProjectByID,
  getProjectsByCustomer,
  postNewProject,
  updateProject,
} from "./projects.controller";

const projectsRouter: Router = Router();

projectsRouter.post("/", postNewProject);
projectsRouter.patch("/editproject/:id", updateProject);
projectsRouter.get("/project/:id", getProjectByID);
projectsRouter.get("/:id", getProjectsByCustomer);

export default projectsRouter;
