"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sales_routes_1 = __importDefault(require("./sales/sales.routes"));
const products_routes_1 = __importDefault(require("./products/products.routes"));
const cart_routes_1 = __importDefault(require("./cart/cart.routes"));
const colors_routes_1 = __importDefault(require("./colors/colors.routes"));
const login_routes_1 = __importDefault(require("./login/login.routes"));
const mainRouter = (0, express_1.Router)();
mainRouter.use("/api/sales", sales_routes_1.default);
mainRouter.use("/api/products", products_routes_1.default);
mainRouter.use("/api/cart", cart_routes_1.default);
mainRouter.use("/api/colors", colors_routes_1.default);
mainRouter.use("/api/auth", login_routes_1.default);
exports.default = mainRouter;
