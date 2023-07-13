import { Router } from 'express';
import {
  getAllProducts, getProductsValuesByProdNameID, getAllMaterials
} from './products.controller';

const productsRouter: Router = Router();

productsRouter.get('/', getAllProducts );
productsRouter.get('id/:id', getProductsValuesByProdNameID );
productsRouter.get('/material', getAllMaterials );

export default productsRouter;