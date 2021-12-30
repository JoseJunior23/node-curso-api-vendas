import { productsRouter } from '@modules/products/routes/products.routes';
import { Router } from 'express';

export const routes = Router();

routes.use('/products', productsRouter);
