/* Productos default */

let data = [];

/* Creando la clase */

class ContenedorProductos {
  constructor(data) {
    this.data = data;
  }

  /* Traer todos */

  async getAll() {
    try {
      return data;
    } catch (error) {
      console.log('Error en', error);
    }
  }

  /* Agregar Producto - POST */
  addProduct(title, price, thumbnail) {
    try {
      let id = data.length + 1;
      data.push({ title, price, thumbnail, id });
    } catch (error) {
      console.log('Hubo un error', error);
    }
  }
}

(module.exports = ContenedorProductos), data;
