import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import OrdersRepository from '../typeorm/repositories/OrderRepository';

interface IOrder {
  id: string;
}

export default class ShowOrderService {
  public async execute({ id }: IOrder): Promise<Order> {
    const orderRepository = getCustomRepository(OrdersRepository);

    const order = await orderRepository.findById(id);
    if (!order) {
      throw new AppError('Order not found ');
    }

    return order;
  }
}
