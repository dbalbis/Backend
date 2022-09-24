let cartsModel;
let productsModel;
let usersModel;

const { default: usersModelDaoMongo } = await import('./daos/usersModel.js');
const { default: productsModelDaoMongo } = await import(
  './daos/productsModel.js'
);
const { default: cartsModelDaoMongo } = await import('./daos/cartsModel.js');

usersModel = usersModelDaoMongo;
productsModel = productsModelDaoMongo;
cartsModel = cartsModelDaoMongo;

export { usersModel, productsModel, cartsModel };
