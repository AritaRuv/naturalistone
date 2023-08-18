import { Router } from "express";
import {
  getAllFavorites,
  postFavoritesProductProject,
  deleteFavoriteProductInProject,
} from "./favorites.controller";

const favoritesRouter: Router = Router();

favoritesRouter.get("/get_all/:customer_id", getAllFavorites);
favoritesRouter.post(
  "/productsproject/:idproject/:idprodname",
  postFavoritesProductProject
);
favoritesRouter.delete(
  "/deletefavorites/:idprojects/:prodnameid",
  deleteFavoriteProductInProject
);

export default favoritesRouter;
