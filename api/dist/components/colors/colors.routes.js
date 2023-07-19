"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const colors_controller_1 = require("./colors.controller");
const colorsRouter = (0, express_1.Router)();
colorsRouter.get("/", colors_controller_1.getAllColors);
exports.default = colorsRouter;
