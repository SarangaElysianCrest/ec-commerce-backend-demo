import { CreateProductDto } from '../dto/product.dto';
import { TagResponseDto } from '../dto/tag.dto';
import context from '../lib/context';
import { Like } from 'typeorm';
import { Matches } from 'class-validator';

export async function getProductByName(name: string) {
  context.logger.warn('-----------Search Service----------');
  context.logger.warn(name);
  let param = formatQuery(name);
  try {
    const queryNative = `SELECT * FROM products WHERE MATCH(title) AGAINST('${param}' IN BOOLEAN MODE) OR MATCH(description) AGAINST('${param}' IN BOOLEAN MODE)`;

    // const product = await context.db.searchRepository.query(`SELECT * FROM products WHERE MATCH(title) AGAINST('${name}' IN BOOLEAN MODE)`);
    // const product = await context.db.searchRepository.createQueryBuilder("products").where("products.id = :name", { name: name }).getMany()
    const product = await context.db.searchRepository
      .createQueryBuilder('products')
      .where('MATCH(title) AGAINST(:name IN BOOLEAN MODE)', { name: param })
      .getMany();
    if (!product) {
      throw new Error('No result found!');
    }
    context.logger.warn(product.length);

    return <CreateProductDto>(<unknown>{ ...product });
  } catch (e) {
    context.logger.warn(e);
    throw new Error('No result found!');
  }
}

function formatQuery(query: string) {
  let newQuery = query
    .trim()
    .split(' ')
    .reverse()
    .map(m => (m.length < 3 ? m : m + '*'))
    .filter(f => f !== '')
    .join(' ');
  return newQuery;
}
