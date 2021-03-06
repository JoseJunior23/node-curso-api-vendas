import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface ICustomer {
  id: string;
}

export default class DeleteCustomerService {
  public async execute({ id }: ICustomer): Promise<void> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findOne(id);
    if (!customer) {
      throw new AppError('Customer not found 😨');
    }

    await customersRepository.remove(customer);
  }
}
