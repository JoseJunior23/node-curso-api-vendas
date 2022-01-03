import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface ICustomer {
  name: string;
  email: string;
}
export default class CreateCustomersServices {
  public async execute({ name, email }: ICustomer): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomersRepository);
    const nameExists = await customerRepository.findByName(name);
    if (nameExists) {
      throw new AppError('There is already one customer with this name 😩');
    }

    const emailExists = await customerRepository.findByEmail(email);
    if (emailExists) {
      throw new AppError('This email is already registered 😩');
    }

    const customer = customerRepository.create({
      name,
      email,
    });

    await customerRepository.save(customer);
    return customer;
  }
}
