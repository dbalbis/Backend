import admin from 'firebase-admin';

import config from '../config.js';

admin.initializeApp({
  credential: admin.credential.cert(config.firebase),
});

const db = admin.firestore();
console.log('Conectado a Firebase');

class ContenedorFirebase {
  constructor(collectionName) {
    this.collectionName = collectionName;
    this.collection = db.collection(collectionName);
  }

  /* Traer Todos */

  async getAll() {
    const prodsSnapshot = await this.collection.get();
    const prods = prodsSnapshot.docs;
    if (prods.length === 0) {
      return null;
    } else {
      const response = prods.map((prod) => ({
        nombre: prod.data().nombre,
        descripcion: prod.data().descripcion,
        codigo: prod.data().codigo,
        foto: prod.data().foto,
        precio: prod.data().precio,
        stock: prod.data().stock,
        id: prod.data().id,
      }));
      return response;
    }
  }
  catch(error) {
    console.log('Error en', error);
  }

  /* Traer por ID */
  async getById(id, idFirebase) {
    try {
      const doc = await this.collection.doc(idFirebase).get();
      const response = doc.data();
      return response;
    } catch (error) {
      console.log('Error en', error);
    }
  }

  /* Agregar Objeto */

  async save(objeto) {
    /* Obteniendo datos del archivo */
    const dataSnapshot = await this.collection.get();
    const data = dataSnapshot.docs;

    /* Si esta vacio el id sera 1 y se guarda como arreglo */

    if (data.length === 0) {
      objeto._id = 1;
      await this.collection.add(objeto);
      console.log('Elemento creado!');
      return objeto;
    } else {
      /* De lo contrario el id va a ser igual al ultimo id +1 */
    }

    objeto._id = data.length + 1;
    await this.collection.add(objeto);
    console.log('Productos Creados!');
    return objeto;
  }

  /* Editar Producto - PUT */
  async editProduct(
    id,
    idFirebase,
    nombre,
    descripcion,
    codigo,
    foto,
    precio,
    stock
  ) {
    try {
      const doc = this.collection.doc(idFirebase);
      const NewDataObj = {
        nombre,
        descripcion,
        codigo,
        foto,
        precio,
        stock,
      };
      await doc.update(NewDataObj);
      return NewDataObj;
    } catch (error) {
      console.log('Hubo un error', error);
    }
  }

  /* Eliminar Producto */
  async deleteProduct(id, idFirebase) {
    try {
      const doc = this.collection.doc(idFirebase);
      await doc.delete();
      return doc;
    } catch (error) {
      console.log('Hubo un error', error);
    }
  }
}

export default ContenedorFirebase;
