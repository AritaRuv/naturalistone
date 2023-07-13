import { Router } from 'express';
import {
  getAllProducts, getProductByIDS, getProductsValuesByProdNameID
} from './products.controller';

const productsRouter: Router = Router();

productsRouter.get('/', getAllProducts );
productsRouter.get('/:id', getProductsValuesByProdNameID );
productsRouter.get('/IDs', getProductByIDS );

export default productsRouter;