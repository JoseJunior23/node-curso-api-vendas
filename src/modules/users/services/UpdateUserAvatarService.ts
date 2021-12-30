import AppError from '@shared/errors/AppError';
import path from 'path';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepositories';
import uploadConfig from '@config/upload';
import fs from 'fs';

interface IUser {
  user_id: string;
  avatarFileName: string;
}
export default class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName }: IUser): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found ');
    }

    //excluir avatar em caso de mudança pelo usuario
    if (user.avatar) {
      //caminho que se encontra o avatar
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      // verificando se o avatar de usuario ja existe
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    //cadastrando novo avatar
    user.avatar = avatarFileName;
    await usersRepository.save(user);
    return user;
  }
}
