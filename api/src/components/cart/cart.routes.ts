import { Router } from 'express';
import { newCartEntry } from './cart.controller';

const cartRouter: Router = Router();

cartRouter.post('/', newCartEntry );


export default cartRouter;