import { Router } from "express";
import {
  getSales,
  getSalesByProject,
  getSalesByUser,
  getDetailOfSale,
} from "./sales.controller";

const salesRouter: Router = Router();

salesRouter.get("/", getSales);
salesRouter.get("/project/:id", getSalesByProject);
salesRouter.get("/customer/:id", getSalesByUser);
salesRouter.get("/details/:id", getDetailOfSale);

export default salesRouter;
