import CustomersRepository from '@modules/customers/typeorm/repositories/CustomersRepository';
import { ProductsRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import OrdersRepository from '../typeorm/repositories/OrderRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IOrder {
  customer_id: string;
  products: IProduct[];
}

export default class CreateOrderService {
  public async execute({ customer_id, products }: IOrder): Promise<Order> {
    const orderRepository = getCustomRepository(OrdersRepository);
    const customerRepository = getCustomRepository(CustomersRepository);
    const productsRepository = getCustomRepository(ProductsRepository);

    const customerExists = await customerRepository.findById(customer_id);
    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id');
    }

    const productsExists = await productsRepository.findAllByIds(products);
    if (!productsExists.length) {
      throw new AppError('Could not find any products with the given ids');
    }

    const productsExistsIds = productsExists.map(product => product.id);
    const checkInexistentProducts = products.filter(
      product => !productsExistsIds.includes(product.id),
    );
    if (!checkInexistentProducts.length) {
      throw new AppError(`Could not find product ${checkInexistentProducts}`);
    }

    const quantityAvalible = products.filter(
      product =>
        productsExists.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );
    if (!quantityAvalible.length) {
      throw new AppError(
        `The quantity ${quantityAvalible[0].quantity} is not available for ${quantityAvalible[0].id}`,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: productsExists.filter(p => p.id === product.id)[0].price,
    }));

    const order = await orderRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;
    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        productsExists.filter(p => p.id === product.id)[0].quantity -
        product.quantity,
    }));

    await productsRepository.save(updatedProductQuantity);

    return order;
  }
}
