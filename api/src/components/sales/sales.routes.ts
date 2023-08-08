import { Router } from "express";
import { getSales, getSalesByProject } from "./sales.controller";

const salesRouter: Router = Router();

salesRouter.get("/", getSales);
salesRouter.get("/project/:id", getSalesByProject);

export default salesRouter;
