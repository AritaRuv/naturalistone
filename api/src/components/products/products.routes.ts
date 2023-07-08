import { Router } from 'express';
import {
  getAllProducts
} from './products.controller';

const productsRouter: Router = Router();

productsRouter.get('/', getAllProducts );

export default productsRouter;