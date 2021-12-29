import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';

interface IProduct {
  id: string;
}

export default class ShowProductService {
  public async show({ id }: IProduct): Promise<Product> {
    const productRepository = getCustomRepository(ProductsRepository);

    const product = await productRepository.findOne(id);
    if (!product) {
      throw new AppError('Product not found 😨');
    }

    return product;
  }
}
