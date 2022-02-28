import context from "./lib/context";


export default async function seedData() {

  // const db = context.db;
  //
  // const tags = [
  //   { name: "tag 1" },
  //   { name: "tag 2" }
  // ];
  //
  // const categories = [
  //   { name: "cat 1" },
  //   { name: "cat 2" }
  // ];
  //
  // const subCategories = [
  //   { name: "sub cat 1", category: "cat 1" },
  //   { name: "sub cat 2", category: "cat 1" }
  // ];
  //
  // const attributes = [
  //   { name: "size" },
  //   { name: "color" }
  // ];
  //
  // const products = [
  //   {
  //     title: "Product 1",
  //     description: "A little something about product 1",
  //     sku: "sku-91",
  //     stock: 1,
  //     price: 25.99,
  //     discount: 0,
  //     offerEnds: null,
  //     category: "cat 1",
  //     subCategory: "sub cat 1",
  //     tags: [ "tag 1" ],
  //     variants: [
  //       {
  //         attributes: [
  //           { name: "color", value: "red" },
  //           { name: "size", value: "m" }
  //         ]
  //       }
  //     ]
  //   }
  // ];
  //
  // await Promise.all(tags.map(async tag => {
  //   const t = db.productTagRepository.create(tag);
  //   await db.productTagRepository.save(t);
  // }));
  //
  // await Promise.all(categories.map(async cat => {
  //   const c = db.categoryRepository.create(cat);
  //   await db.categoryRepository.save(c);
  // }));
  //
  // await Promise.all(subCategories.map(async subCat => {
  //   const { name, category } = subCat;
  //   const cat = await db.categoryRepository.findOne({name: category})
  //   const c = db.subCategoryRepository.create({
  //     name,
  //     category: cat
  //   });
  //   await db.subCategoryRepository.save(c);
  // }));

}

