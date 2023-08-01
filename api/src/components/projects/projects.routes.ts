import { Router } from "express";
import {
   getProjectByID,
   getProjectsByCustomer, postNewProject,
} from "./projects.controller";

const projectsRouter: Router = Router();

projectsRouter.get("/:id", getProjectsByCustomer);
projectsRouter.post("/", postNewProject);
projectsRouter.get("/project/:id", getProjectByID);


export default projectsRouter;
