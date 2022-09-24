let cartsModel;
let productsModel;
let usersModel;

const { default: usersModelDaoMongo } = await import('./daos/usersModel.js');
const { default: productsModelDaoMongo } = await import(
  './daos/productsModel.js'
);

usersModel = usersModelDaoMongo;
productsModel = productsModelDaoMongo;

export { usersModel, productsModel };
