import { Connection, createConnection } from "typeorm";

import { getLogger } from "../lib/logger";

import UserRepository from "./repository/user.repository";
import BrandRepository from "./repository/brand.repository";
import CategoryRepository from "./repository/category.repository";
import SubCategoryRepository from "./repository/subCategory.repository";
import AttributeRepository from "./repository/attribute.repository";
import ProductImageRepository from "./repository/productImage.repository";
import VariantRepository from "./repository/variant.repository";
import ProductRepository from "./repository/product.repository";
import VariantAttributeRepository from "./repository/variantAttribute.repository";
import TagRepository from "./repository/tag.repository";
import CategoryAttributeRepository from "./repository/categoryAttribute.repository";
import SubCategoryAttributeRepository from "./repository/subCategoryAttribute.repository";
import ReviewRepository from "./repository/review.repository"
import LikesRepository from "./repository/likes.repository"
import OrderRepository from "./repository/order.repository";
import OrderItemRepository from "./repository/orderItems.repository,ts";
import PromoCodeRepository from "./repository/promocode.repository"
import SearchRepository from "./repository/search.repository";

export class DB {
  public readonly conn: Connection;

  public readonly brandRepository: BrandRepository;

  public readonly categoryRepository: CategoryRepository;
  public readonly subCategoryRepository: SubCategoryRepository;
  public readonly categoryAttributeRepository: CategoryAttributeRepository;
  public readonly subCategoryAttributeRepository: SubCategoryAttributeRepository;

  public readonly attributeRepository: AttributeRepository;

  public readonly tagRepository: TagRepository;

  public readonly productRepository: ProductRepository;
  public readonly productImageRepository: ProductImageRepository;

  public readonly variantRepository: VariantRepository;
  public readonly variantAttributeRepository: VariantAttributeRepository;

  public readonly userRepository: UserRepository;

  public readonly reviewRepository : ReviewRepository;
  public readonly likesRepository  : LikesRepository;


  public readonly orderRepository : OrderRepository;
  public readonly orderItemRepository : OrderItemRepository;

  public readonly promoCodeRepository : PromoCodeRepository;

  public readonly searchRepository : SearchRepository;

  constructor(conn: Connection) {
    this.conn = conn;

    this.brandRepository = conn.getCustomRepository(BrandRepository);

    this.categoryRepository = conn.getCustomRepository(CategoryRepository);
    this.subCategoryRepository = conn.getCustomRepository(SubCategoryRepository);
    this.categoryAttributeRepository = conn.getCustomRepository(CategoryAttributeRepository);
    this.subCategoryAttributeRepository = conn.getCustomRepository(SubCategoryAttributeRepository);

    this.attributeRepository = conn.getCustomRepository(AttributeRepository);

    this.tagRepository = conn.getCustomRepository(TagRepository);

    this.productRepository = conn.getCustomRepository(ProductRepository);
    this.productImageRepository = conn.getCustomRepository(ProductImageRepository);

    this.variantRepository = conn.getCustomRepository(VariantRepository);
    this.variantAttributeRepository = conn.getCustomRepository(VariantAttributeRepository);

    this.userRepository = conn.getCustomRepository(UserRepository);

    this.reviewRepository = conn.getCustomRepository(ReviewRepository);
    this.likesRepository = conn.getCustomRepository(LikesRepository)

    this.orderRepository = conn.getCustomRepository(OrderRepository);
    this.orderItemRepository = conn.getCustomRepository(OrderItemRepository);

    this.promoCodeRepository = conn.getCustomRepository(PromoCodeRepository);
    this.searchRepository = conn.getCustomRepository(SearchRepository);
  }
}

let db: DB | null = null;

export function getDB(): DB {
  return db!;
}

export function initDB(): Promise<DB> {
  return new Promise((resolve, reject) => {
    if (db != null) {
      return resolve(db);
    }
    createConnection()
      .then(connection => {
        getLogger().info("database connected!");
        db = new DB(connection);
        resolve(db);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
}
