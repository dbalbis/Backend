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
      }));
      return response;
    }
  }
  catch(error) {
    console.log('Error en', error);
  }
}

export default ContenedorFirebase;
