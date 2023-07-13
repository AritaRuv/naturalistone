"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dimensions_controller_1 = require("./dimensions.controller");
const dimensionsRouter = (0, express_1.Router)();
dimensionsRouter.get('/', dimensions_controller_1.getDimensions);
exports.default = dimensionsRouter;
