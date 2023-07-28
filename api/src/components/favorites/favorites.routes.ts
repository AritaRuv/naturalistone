import { Router } from "express";
import {
  getAllFavorites,
} from "./favorites.controller";

const favoritesRouter: Router = Router();

favoritesRouter.get("/", getAllFavorites);

export default favoritesRouter;
