import { productsRouter } from '@modules/products/routes/products.routes';
import { sessionRouter } from '@modules/users/routes/session.routes';
import { usersRouter } from '@modules/users/routes/users.routes';
import { Router } from 'express';

export const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);
