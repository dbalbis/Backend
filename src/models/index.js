let cartsModel;
let productsModel;
let usersModel;

const { default: usersModelDaoMongo } = await import('./daos/usersModel.js');

usersModel = usersModelDaoMongo;

export default usersModel;
