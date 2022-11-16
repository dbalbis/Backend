let cartsModel;
let productsModel;
let messagesModel;
let usersModel;
let checkoutModel;

const { default: usersModelDaoMongo } = await import('./daos/usersModel.js');
const { default: messagesModelDaoMongo } = await import(
  './daos/messagesModel.js'
);
const { default: productsModelDaoMongo } = await import(
  './daos/productsModel.js'
);

const { default: cartsModelDaoMongo } = await import('./daos/cartModel.js');

const { default: checkoutModelDaoMongo } = await import(
  './daos/checkoutModel.js'
);

usersModel = usersModelDaoMongo;
messagesModel = messagesModelDaoMongo;
productsModel = productsModelDaoMongo;
cartsModel = cartsModelDaoMongo;
checkoutModel = checkoutModelDaoMongo;

export { usersModel, messagesModel, productsModel, cartsModel };
