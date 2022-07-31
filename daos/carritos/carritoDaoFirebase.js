import ContenedorFirebase from '../../contenedores/contenedorFireBase.js';

class CartModel extends ContenedorFirebase {
  constructor() {
    super('carts');
  }
}

export default new CartModel();
