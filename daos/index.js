import { config } from 'dotenv';
config();

const DATABASE = process.env.DATABASE;

let productsModel;
let cartModel;

switch (DATABASE) {
  case 'mongo':
    const { default: productsModelDaoMongo } = await import(
      './productos/productoDaoMongo.js'
    );
    const { default: cartModelDaoMongo } = await import(
      './carritos/carritoDaoMongo.js'
    );

    productsModel = productsModelDaoMongo;
    cartModel = cartModelDaoMongo;

    break;

  case 'firebase':
    const { default: productsModelDaoFirebase } = await import(
      './productos/productoDaoFireBase.js'
    );

    productsModel = productsModelDaoFirebase;

    break;

  default:
    break;
}

export { productsModel, cartModel };
