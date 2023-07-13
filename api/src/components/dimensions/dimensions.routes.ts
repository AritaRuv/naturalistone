import { Router } from 'express';
import { getDimensions } from './dimensions.controller';

const dimensionsRouter: Router = Router();

dimensionsRouter.get('/', getDimensions );

export default dimensionsRouter;