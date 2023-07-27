import { Router } from "express";
import {
  getAllProducts,
  getProductByIDS,
  getProductsValuesByProdNameID,
  getAllMaterials,
  getAllDimensionProperties,
  getCheckboxValidation,
} from "./products.controller";

const productsRouter: Router = Router();

productsRouter.get("/", getAllProducts);
productsRouter.get("/IDs", getProductByIDS);
productsRouter.get("/material", getAllMaterials);
productsRouter.get("/dimension", getAllDimensionProperties);
productsRouter.get("/id/:id", getProductsValuesByProdNameID);
productsRouter.get("/valid/id/:id", getCheckboxValidation);

export default productsRouter;
