import { Router } from "express";
import {
  getHomeProducts,
  getProductByIDS,
  getProductsValuesByProdNameID,
  getAllMaterials,
  getAllDimensionProperties,
  getProductsFilter,
  getCheckboxValidation,
  getAllProductsByMaterial,
} from "./products.controller";

const productsRouter: Router = Router();

productsRouter.get("/home", getHomeProducts);
productsRouter.get("/IDs", getProductByIDS);
productsRouter.get("/material", getAllMaterials);
productsRouter.get("/dimension/:material", getAllDimensionProperties);
productsRouter.get("/id/:id", getProductsValuesByProdNameID);
productsRouter.get("/valid/id/:id", getCheckboxValidation);
productsRouter.get("/filters", getProductsFilter);
productsRouter.get("/materialfilterby", getAllProductsByMaterial);


export default productsRouter;
