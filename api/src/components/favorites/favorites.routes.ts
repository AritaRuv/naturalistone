import { Router } from "express";
import {
  getAllFavorites, getProjectFavorites,
} from "./favorites.controller";

const favoritesRouter: Router = Router();

favoritesRouter.get("/get_all/:customer_id", getAllFavorites);
favoritesRouter.get("/byProject/:idProjects", getProjectFavorites);

export default favoritesRouter;
