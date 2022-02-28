import {MigrationInterface, QueryRunner} from "typeorm";
import ProductRepository from "../repository/product.repository";

export class AddProducts1600159947020 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // const categoryRepository: CategoryRepository = queryRunner.connection.getCustomRepository(CategoryRepository);
        // const subCategoryRepository: SubCategoryRepository = queryRunner.connection.getCustomRepository(SubCategoryRepository);
        // const productTagRepository: TagRepository = queryRunner.connection.getCustomRepository(TagRepository);
        // const productImageRepository: ProductImageRepository = queryRunner.connection.getCustomRepository(ProductImageRepository);
        // const productAttributeRepository: AttributeRepository = queryRunner.connection.getCustomRepository(AttributeRepository);
        // const productVariantRepository: VariantRepository = queryRunner.connection.getCustomRepository(VariantRepository);
        // const productVariantAttributeRepository: VariantAttributeRepository = queryRunner.connection.getCustomRepository(VariantAttributeRepository);
        //
        // // tags
        // const tag1 = await productTagRepository.create({
        //     name: "Tag 1"
        // });
        //
        // const tag2 = await productTagRepository.create({
        //     name: "Tag 2"
        // });
        //
        // await productTagRepository.save([tag1, tag2])
        //
        // // categories
        // const cat1 = await categoryRepository.create({
        //     name: "Cat 1"
        // });
        //
        // const cat2 = await categoryRepository.create({
        //     name: "Cat 2"
        // });
        //
        // await categoryRepository.save([cat1, cat2])
        //
        // // sub categories
        // const subCat1 = await subCategoryRepository.create({
        //     name: "Sub 1 Cat 1"
        // });
        //
        // const subCat2 = await subCategoryRepository.create({
        //     name: "Sub 2 Cat 1"
        // });
        //
        // await subCategoryRepository.save([subCat1, subCat2])


        // products

        // product attributes

        // product variants

        // product variant attributes


    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        // const productRepository: ProductRepository = queryRunner.connection.getCustomRepository(ProductRepository);
        // const categoryRepository: CategoryRepository = queryRunner.connection.getCustomRepository(CategoryRepository);
        // const subCategoryRepository: SubCategoryRepository = queryRunner.connection.getCustomRepository(SubCategoryRepository);
        // const productTagRepository: TagRepository = queryRunner.connection.getCustomRepository(TagRepository);
        // const productImageRepository: ProductImageRepository = queryRunner.connection.getCustomRepository(ProductImageRepository);
        // const productAttributeRepository: AttributeRepository = queryRunner.connection.getCustomRepository(AttributeRepository);
        // const productVariantRepository: VariantRepository = queryRunner.connection.getCustomRepository(VariantRepository);
        // const productVariantAttributeRepository: VariantAttributeRepository = queryRunner.connection.getCustomRepository(VariantAttributeRepository);


        //
        // await productTagRepository.delete({});
        // await subCategoryRepository.delete({});
        // await categoryRepository.delete({});

    }

}
