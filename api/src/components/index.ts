import { Router } from 'express'
import salesRouter from './sales/sales.routes';
import productsRouter from './products/products.routes';
const mainRouter = Router();

mainRouter.use('/api/sales', salesRouter);
mainRouter.use('/api/products', productsRouter);

export default mainRouter;