import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepositories';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';

interface IRequest {
  email: string;
}

export default class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokensRepository);

    const user = await usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User does not exists ');
    }

    const token = await userTokenRepository.generateToken(user.id);
    console.log(token);
  }
}
