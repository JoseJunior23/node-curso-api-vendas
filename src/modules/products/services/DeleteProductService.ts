import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';

interface IProduct {
  id: string;
}

export default class DeleteProductService {
  public async execute({ id }: IProduct): Promise<void> {
    const productRepository = getCustomRepository(ProductsRepository);

    const product = await productRepository.findOne(id);
    if (!product) {
      throw new AppError('Product not found 😨');
    }

    const redisCache = new RedisCache();
    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await productRepository.remove(product);
  }
}
