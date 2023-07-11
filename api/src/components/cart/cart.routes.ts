import { Router } from 'express';
import {
  getCartProducts
} from './cart.controller';

const cartRouter: Router = Router();


cartRouter.get('/:id', getCartProducts );

export default cartRouter;