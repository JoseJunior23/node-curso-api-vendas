import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepositories';

interface IUser {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}
export default class CreateSessionsService {
  public async execute({ email, password }: IUser): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);

    //validação do email de usuario
    const user = await usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Incorrect email/password !!!', 401);
    }

    //validação de senha de usuario
    const confirmedPassword = await compare(password, user.password);
    if (!confirmedPassword) {
      throw new AppError('Incorrect email/password !!!', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}
