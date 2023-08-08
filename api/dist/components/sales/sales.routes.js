"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sales_controller_1 = require("./sales.controller");
const salesRouter = (0, express_1.Router)();
salesRouter.get("/", sales_controller_1.getSales);
salesRouter.get("/project/:id", sales_controller_1.getSalesByProject);
exports.default = salesRouter;
