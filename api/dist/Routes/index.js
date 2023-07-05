"use strict";
const { Router } = require('express');
const mainRouter = Router();
const salesRouter = require('./salesRoutes');
mainRouter.use('/api/sales', salesRouter);
module.exports = mainRouter;
