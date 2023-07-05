import { Router } from 'express';
import {
  getSales
} from './sales.controller';

const salesRouter: Router = Router();

salesRouter.get('/', getSales );

export default salesRouter;