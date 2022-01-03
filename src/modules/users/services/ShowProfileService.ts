import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepositories';

interface IUser {
  user_id: string;
}

export default class ShowProfileService {
  public async execute({ user_id }: IUser): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.findById(user_id);
    if (!users) {
      throw new AppError('User not found !!!');
    }

    return users;
  }
}
