import { Router } from "express";
import {
  getAllProducts,
  getProductByIDS,
  getProductsValuesByProdNameID,
  getAllMaterials,
  getAllDimensionProperties,
  getProductsFilter
  getCheckboxValidation,
} from "./products.controller";

const productsRouter: Router = Router();

productsRouter.get("/", getAllProducts);
productsRouter.get("/IDs", getProductByIDS);
productsRouter.get("/material", getAllMaterials);
productsRouter.get("/dimension", getAllDimensionProperties);
productsRouter.get("/id/:id", getProductsValuesByProdNameID);

export default productsRouter;
