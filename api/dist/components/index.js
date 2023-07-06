"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};

Object.defineProperty(exports, "__esModule", { value: true });

const express_1 = require("express");

const sales_routes_1 = __importDefault(require("./sales/sales.routes"));
const cambio = "hola";

const mainRouter = (0, express_1.Router)();

mainRouter.use('/api/sales', sales_routes_1.default);

exports.default = mainRouter;
