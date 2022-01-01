import { productsRouter } from '@modules/products/routes/products.routes';
import { passwordRouter } from '@modules/users/routes/password.routes';
import { sessionRouter } from '@modules/users/routes/session.routes';
import { usersRouter } from '@modules/users/routes/users.routes';
import { Router } from 'express';

export const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);
routes.use('/password', passwordRouter);
