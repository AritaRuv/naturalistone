import { Router } from 'express';
import { newCartEntry, getCartProducts } from './cart.controller';

const cartRouter: Router = Router();

cartRouter.post('/', newCartEntry );
cartRouter.get('/:id', getCartProducts );

export default cartRouter;
