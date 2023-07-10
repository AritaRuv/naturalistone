import { Router } from 'express';
import {
  getAllProducts, getProductsValuesByProdNameID
} from './products.controller';

const productsRouter: Router = Router();

productsRouter.get('/', getAllProducts );
productsRouter.get('/:id', getProductsValuesByProdNameID );

export default productsRouter;