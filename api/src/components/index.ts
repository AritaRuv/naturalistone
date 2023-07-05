import { Router } from 'express'
import salesRouter from './sales/sales.routes';
const cambio = "hola"
const mainRouter = Router();

mainRouter.use('/api/sales', salesRouter);

export default mainRouter;