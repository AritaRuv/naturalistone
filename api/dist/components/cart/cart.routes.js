"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = require("./cart.controller");
const cartRouter = (0, express_1.Router)();
cartRouter.post('/', cart_controller_1.newCartEntry);
exports.default = cartRouter;
