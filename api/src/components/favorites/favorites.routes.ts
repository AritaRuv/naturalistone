import { Router } from "express";
import {
  getAllFavorites,
} from "./favorites.controller";

const favoritesRouter: Router = Router();

favoritesRouter.get("/get_all/:customer_id", getAllFavorites);

export default favoritesRouter;
