// import { DB, initDB } from "../db/";
// import { initLogger } from "../lib/logger";
// import { validate } from "class-validator";
// import context from "../lib/context";
// import { Category } from "../db/entity/category";
// import { SubCategory } from "../db/entity/subCategory";

// let db: DB;

// beforeAll(done => {
//   initLogger().then(() => {
//     return initDB();
//   }).then(idb => {
//     db = idb;
//     done();
//   }).catch(err => {
//     done(err);
//   });
// });

// describe("User", () => {
//   test("Create", async () => {
//     let user = db.userRepository.create({
//       email: "user@user.com",
//       firstName: "user01",
//       lastName: "last01",
//       addressLine1: "asd",
//       addressLine2: "asasd",
//       city: "Galle",
//       phone: "0766812803"
//     });

//     const errs = await validate(user);
//     context.logger.error(JSON.stringify(errs));
//     // expect(errs.length).toBe(0);

//     user = await db.userRepository.save(user);
//     expect(user).toBeDefined();
//   });

//   test("Validate", async () => {
//     const user = await db.userRepository.findByEmail("user@user.com");
//     expect(user).toBeDefined();
//   });
// });

// describe("Category", () => {

//   let category: Category;
//   let subCategory: SubCategory;

//   test("Create", async () => {
//     category = db.categoryRepository.create({
//       name: "Clothing"
//     });

//     category = await db.categoryRepository.save(category);
//     expect(category).toBeDefined();
//   });

//   test("Create Sub Category", async () => {
//     subCategory = db.subCategoryRepository.create({
//       name: "Shirts",
//       category: category
//     });

//     subCategory = await db.subCategoryRepository.save(subCategory);
//     expect(subCategory).toBeDefined();
//   });

//   test("Get Category Sub Categories", async () => {
//     category = (await db.categoryRepository.findOne(category.id))!!;
//     expect((await category.subCategories).length).toBe(1);
//   });

// });



// afterAll(done => {
//   db.conn.close().finally(done);
// });
test('two plus two is four', () => {
    expect(2 + 2).toBe(4);
  });