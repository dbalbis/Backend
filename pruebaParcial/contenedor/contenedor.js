const fs = require('fs');
const path = require('path');

/* Creando la clase */

class ContenedorProductos {
  constructor(filename) {
    this.filename = filename;
    /* Creando el archivo si no existe */
    if (!fs.existsSync(path.join(__dirname, `../data/${this.filename}`))) {
      fs.promises.writeFile(
        path.join(__dirname, `../data/${this.filename}`),
        ''
      );
    }
  }

  /* Agregar Objeto */

  async save(objeto) {
    /* Obteniendo datos del archivo */
    let data = await fs.promises.readFile(
      path.join(__dirname, `../data/${this.filename}`),
      'utf-8'
    );
    /* Si esta vacio el id sera 1 y se guarda como arreglo */

    if (!data) {
      objeto.id = 1;
      const arr = [objeto];
      /* Usando NULL en JSON.stringify */
      await fs.promises.writeFile(
        path.join(__dirname, `../data/${this.filename}`),
        JSON.stringify(arr, null, 2)
      );
      console.log('Elemento creado!');
      return objeto;
    } else {
      /* De lo contrario el id va a ser igual al ultimo id +1 */
    }
    data = JSON.parse(data);
    objeto.id = data[data.length - 1].id + 1;
    data.push(objeto);
    await fs.promises.writeFile(
      path.join(__dirname, `../data/${this.filename}`),
      JSON.stringify(data)
    );
    console.log('Productos Creados!');
    return objeto;
  }

  /* Traer todos */

  async getAll() {
    try {
      let data = await JSON.parse(
        await fs.promises.readFile(
          path.join(__dirname, `../data/${this.filename}`),
          'utf-8'
        )
      );

      if (data.length === 0) {
        return null;
      } else {
        return data;
      }
    } catch (error) {
      console.log('Error en', error);
    }
  }

  /* Traer por ID */
  async getById(id) {
    try {
      let data = await JSON.parse(
        await fs.promises.readFile(
          path.join(__dirname, `../data/${this.filename}`),
          'utf-8'
        )
      );
      if (data.some((data) => data['id'] === id)) {
        const elemento = data.find((elemento) => {
          return elemento.id === id;
        });
        return elemento;
      } else {
        return null;
      }
    } catch (error) {
      console.log('Error en', error);
    }
  }

  /* Editar Producto - PUT */
  async editProduct(id, title, desc, price, stock, thumbnail, codigo) {
    try {
      let data = await JSON.parse(
        await fs.promises.readFile(
          path.join(__dirname, `../data/${this.filename}`),
          'utf-8'
        )
      );
      if (data.some((data) => data['id'] === id)) {
        const newArray = data.filter((data) => data.id !== id);
        let product = {
          title,
          codigo,
          desc,
          price: Number(price),
          stock,
          thumbnail,
          timestamp: Date.now(),
          id,
        };
        data = [...newArray, product];
        console.log('Product es', product);
        console.log('Data es', data);
        await fs.promises.writeFile(
          path.join(__dirname, `../data/${this.filename}`),
          JSON.stringify(data)
        );
        return newArray;
      } else {
        return null;
      }
    } catch (error) {
      console.log('Hubo un error', error);
    }
  }

  /* Eliminar Producto */
  async deleteProduct(id) {
    try {
      let data = await JSON.parse(
        await fs.promises.readFile(
          path.join(__dirname, `../data/${this.filename}`),
          'utf-8'
        )
      );
      if (data.some((data) => data['id'] === id)) {
        const newArray = data.filter((data) => data.id !== id);
        data = [...newArray];
        console.log('DATA', data.length);
        if (data.length === 0) {
          await fs.promises.writeFile(
            path.join(__dirname, `../data/${this.filename}`),
            ''
          );
        } else {
          await fs.promises.writeFile(
            path.join(__dirname, `../data/${this.filename}`),
            JSON.stringify(data)
          );
        }

        return newArray;
      } else {
        return null;
      }
    } catch (error) {
      console.log('Hubo un error', error);
    }
  }

  /* Agregar producto al carrito */
  async addCarrito(cart, producto, cartId) {
    try {
      let data = await JSON.parse(
        await fs.promises.readFile(
          path.join(__dirname, `../data/${this.filename}`),
          'utf-8'
        )
      );
      cart.productos.push(producto);
      const newArray = data.filter((item) => item.id !== cartId);
      data = [...newArray, cart];
      await fs.promises.writeFile(
        path.join(__dirname, `../data/${this.filename}`),
        JSON.stringify(data)
      );
      console.log(otherCarts);
      console.log('EL CART TIENE', cart);
      return cart;
    } catch (error) {
      console.log('Hubo un error', error);
    }
  }

  /* Traer todos los productos de un carrito */

  async getAllProductsCart(id) {
    try {
      let data = await JSON.parse(
        await fs.promises.readFile(
          path.join(__dirname, `../data/${this.filename}`),
          'utf-8'
        )
      );
      if (data.some((data) => data['id'] === id)) {
        const elemento = data.find((elemento) => {
          return elemento.id === id;
        });
        return elemento;
      } else {
        return null;
      }
    } catch (error) {
      console.log('Hubo un error', error);
    }
  }
}

module.exports = ContenedorProductos;
