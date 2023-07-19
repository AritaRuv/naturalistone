import { Router } from "express";
import { getAllColors } from "./colors.controller";

const colorsRouter: Router = Router();

colorsRouter.get("/", getAllColors);

export default colorsRouter;
