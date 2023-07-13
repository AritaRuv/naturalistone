import { Router } from 'express'
import salesRouter from './sales/sales.routes';
import productsRouter from './products/products.routes';
import cartRouter from './cart/cart.routes';
import dimensionsRouter from './dimensions/dimensions.routes';
const mainRouter = Router();

mainRouter.use('/api/sales', salesRouter);
mainRouter.use('/api/products', productsRouter);
mainRouter.use('/api/cart', cartRouter);
mainRouter.use('/api/dimensions', dimensionsRouter);

export default mainRouter;