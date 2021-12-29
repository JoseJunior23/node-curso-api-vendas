import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';

interface IProduct {
  name: string;
  price: number;
  quantity: number;
}
export default class CreateProductService {
  public async execute({ name, price, quantity }: IProduct): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const productsExists = await productsRepository.findByName(name);
    if (productsExists) {
      throw new AppError('There is already one product with this name 😩');
    }

    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    await productsRepository.save(product);
    return product;
  }
}
