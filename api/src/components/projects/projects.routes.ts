import { Router } from "express";
import {
   getProjectsByCustomer, postNewProject,
} from "./projects.controller";

const projectsRouter: Router = Router();

projectsRouter.get("/:id", getProjectsByCustomer);
projectsRouter.post("/", postNewProject);


export default projectsRouter;
