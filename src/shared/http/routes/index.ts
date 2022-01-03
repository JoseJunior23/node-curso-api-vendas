import { customersRouter } from '@modules/customers/routes/customers.routes';
import { productsRouter } from '@modules/products/routes/products.routes';
import { passwordRouter } from '@modules/users/routes/password.routes';
import { profileRouter } from '@modules/users/routes/profile.routes';
import { sessionRouter } from '@modules/users/routes/session.routes';
import { usersRouter } from '@modules/users/routes/users.routes';
import { Router } from 'express';

export const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customersRouter);
