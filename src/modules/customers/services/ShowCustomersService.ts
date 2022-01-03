import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface ICustomer {
  id: string;
}

export default class ShowCustomersService {
  public async execute({ id }: ICustomer): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findOne(id);
    if (!customer) {
      throw new AppError('Customer not found 😨');
    }

    return customer;
  }
}
