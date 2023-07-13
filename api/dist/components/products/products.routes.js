"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("./products.controller");
const productsRouter = (0, express_1.Router)();
productsRouter.get('/', products_controller_1.getAllProducts);
productsRouter.get('/:id', products_controller_1.getProductsValuesByProdNameID);
productsRouter.get('/IDs', products_controller_1.getProductByIDS);
exports.default = productsRouter;
