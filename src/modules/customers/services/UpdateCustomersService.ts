import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface ICustomer {
  id: string;
  name: string;
  email: string;
}
export default class UpdateCustomersService {
  public async execute({ id, name, email }: ICustomer): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const customer = await customerRepository.findById(id);
    if (!customer) {
      throw new AppError('Customer not found');
    }

    const customerExists = await customerRepository.findByEmail(email);
    if (customerExists && email !== customer.email) {
      throw new AppError('There is already one customer with this email');
    }

    customer.name = name;
    customer.email = email;

    await customerRepository.save(customer);
    return customer;
  }
}
