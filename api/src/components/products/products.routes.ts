import { Router } from "express";
import {
  getAllProducts,
  getProductsValuesByProdNameID,
  getAllMaterials,
} from "./products.controller";

const productsRouter: Router = Router();

productsRouter.get("/", getAllProducts);
productsRouter.get("/material", getAllMaterials);
productsRouter.get("/:id", getProductsValuesByProdNameID);

export default productsRouter;
