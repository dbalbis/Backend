import ContenedorFirebase from '../../contenedores/contenedorFireBase.js';

class ProductsModel extends ContenedorFirebase {
  constructor() {
    super('products');
  }
}

export default new ProductsModel();
