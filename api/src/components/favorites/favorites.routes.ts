import { Router } from "express";
import {
  getAllFavorites,
  postFavoritesProductProject,
} from "./favorites.controller";

const favoritesRouter: Router = Router();

favoritesRouter.get("/get_all/:customer_id", getAllFavorites);
favoritesRouter.post(
  "/productsproject/:idproject/:idprodname",
  postFavoritesProductProject
);

export default favoritesRouter;
