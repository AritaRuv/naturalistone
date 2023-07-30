"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("./products.controller");
const productsRouter = (0, express_1.Router)();
productsRouter.get("/", products_controller_1.getAllProducts);
productsRouter.get("/IDs", products_controller_1.getProductByIDS);
productsRouter.get("/material", products_controller_1.getAllMaterials);
productsRouter.get("/dimension", products_controller_1.getAllDimensionProperties);
productsRouter.get("/id/:id", products_controller_1.getProductsValuesByProdNameID);
productsRouter.get("/valid/id/:id", products_controller_1.getCheckboxValidation);
productsRouter.get("/filters", products_controller_1.getProductsFilter);
exports.default = productsRouter;
