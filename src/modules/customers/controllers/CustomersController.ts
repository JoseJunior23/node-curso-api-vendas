import { Request, Response } from 'express';
import CreateCustomersService from '../services/CreateCustomersService';
import DeleteCustomersService from '../services/DeleteCustomersService';
import ListCustomersService from '../services/ListCustomersSevice';
import ShowCustomersService from '../services/ShowCustomersService';
import UpdateCustomersService from '../services/UpdateCustomersService';

export default class CustomerController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCustomers = new ListCustomersService();
    const customers = await listCustomers.execute();
    return response.status(200).json(customers);
  }

  public async show(request: Request, response: Response) {
    const { id } = request.params;
    const showCustomer = new ShowCustomersService();
    const customer = await showCustomer.execute({ id });
    return response.status(200).json(customer);
  }

  public async create(request: Request, response: Response) {
    const { name, email } = request.body;
    const createCustomer = new CreateCustomersService();
    const customer = await createCustomer.execute({ name, email });
    return response.status(201).json(customer);
  }

  public async update(request: Request, response: Response) {
    const { name, email } = request.body;
    const { id } = request.params;
    const updateCustomer = new UpdateCustomersService();
    const customer = await updateCustomer.execute({
      id,
      name,
      email,
    });
    return response.status(200).json(customer);
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;
    const deleteCustomer = new DeleteCustomersService();
    await deleteCustomer.execute({ id });
    return response
      .status(200)
      .json({ message: 'Successfully deleted customer 👍' });
  }
}
