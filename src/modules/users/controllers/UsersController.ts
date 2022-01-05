import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import CreateUserService from '../services/createUserService';
import ListUsersServices from '../services/ListUserServices';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new ListUsersServices();
    const users = await listUsers.execute();
    return response.json(instanceToInstance(users));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({
      name,
      email,
      password,
    });
    return response.json(instanceToInstance(user));
  }
}
