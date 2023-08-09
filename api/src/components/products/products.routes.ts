import { Router } from "express";
import {
  getAllProducts,
  getProductByIDS,
  getProductsValuesByProdNameID,
  getAllMaterials,
  getAllDimensionProperties,
  getProductsFilter,
  getCheckboxValidation,
  getAllProductsByMaterial,
} from "./products.controller";

const productsRouter: Router = Router();

productsRouter.get("/", getAllProducts);
productsRouter.get("/IDs", getProductByIDS);
productsRouter.get("/material", getAllMaterials);
productsRouter.get("/dimension", getAllDimensionProperties);
productsRouter.get("/id/:id", getProductsValuesByProdNameID);
productsRouter.get("/valid/id/:id", getCheckboxValidation);
productsRouter.get("/filters", getProductsFilter);
productsRouter.get("/materialfilterby", getAllProductsByMaterial);


export default productsRouter;
