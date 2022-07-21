1 /* Ejecuto servidor mongod --dbpath ./base */
2; /*  show dbs => para ver las base de datos*/
3; /* use ecommerce => crea la base de datos ecommerce y me mueve a ella */

/* Creo la coleccion messages e inserto sus mensajes */
db.messages.insert([
  { email: 'diego@gmail.com', date: '20/07/2022 17:00:00', message: 'Hola' },
  { email: 'daniela@gmail.com', date: '20/07/2022 17:01:00', message: 'Hola!' },
  {
    email: 'diego@gmail.com',
    date: '20/07/2022 17:02:00',
    message: 'Como estas?',
  },
  {
    email: 'daniela@gmail.com',
    date: '20/07/2022 17:03:00',
    message: 'bien, y vos?',
  },
  {
    email: 'diego@gmail.com',
    date: '20/07/2022 17:04:00',
    message: 'Excelente!',
  },
  {
    email: 'daniela@gmail.com',
    date: '20/07/2022 17:05:00',
    message: 'Me alegro',
  },
  {
    email: 'diego@gmail.com',
    date: '20/07/2022 17:06:00',
    message: 'Estudiaste para el examen?',
  },
  {
    email: 'daniela@gmail.com',
    date: '20/07/2022 17:08:00',
    message: 'Estoy en eso',
  },
  {
    email: 'diego@gmail.com',
    date: '20/07/2022 17:09:00',
    message: 'Genial, repasamos?',
  },
  {
    email: 'daniela@gmail.com',
    date: '20/07/2022 17:10:00',
    message: 'Si, dale!',
  },
]);
/* Confirmo que se agrego la coleccion y sus mensajes */
db.messages.find().pretty();

/* Creo la coleccion productos e inserto sus productos */
db.products.insert([
  {
    name: 'Chicles',
    price: 149,
    thumbnail: 'https://i.ytimg.com/vi/PTGOxqKyE4M/maxresdefault.jpg',
  },
  {
    name: 'Chupetin',
    price: 4032,
    thumbnail: 'https://i.ytimg.com/vi/PTGOxqKyE4M/maxresdefault.jpg',
  },
  {
    name: 'Turron',
    price: 1039,
    thumbnail: 'https://i.ytimg.com/vi/PTGOxqKyE4M/maxresdefault.jpg',
  },
  {
    name: 'Caramelos',
    price: 3586,
    thumbnail: 'https://i.ytimg.com/vi/PTGOxqKyE4M/maxresdefault.jpg',
  },
  {
    name: 'Chocolate',
    price: 783,
    thumbnail: 'https://i.ytimg.com/vi/PTGOxqKyE4M/maxresdefault.jpg',
  },
  {
    name: 'Gomitas',
    price: 3452,
    thumbnail: 'https://i.ytimg.com/vi/PTGOxqKyE4M/maxresdefault.jpg',
  },
  {
    name: 'Heladito',
    price: 123,
    thumbnail: 'https://i.ytimg.com/vi/PTGOxqKyE4M/maxresdefault.jpg',
  },
  {
    name: 'Galletitas',
    price: 4539,
    thumbnail: 'https://i.ytimg.com/vi/PTGOxqKyE4M/maxresdefault.jpg',
  },
  {
    name: 'Cigarrillos',
    price: 201,
    thumbnail: 'https://i.ytimg.com/vi/PTGOxqKyE4M/maxresdefault.jpg',
  },
  {
    name: 'Pipas',
    price: 3000,
    thumbnail: 'https://i.ytimg.com/vi/PTGOxqKyE4M/maxresdefault.jpg',
  },
]);

/* Confirmo que se agrego la coleccion y sus productos */
db.products.find().pretty();

/* Mostrar cantidad de mensajes en coleccion */
db.messages.estimatedDocumentCount();

/* Mostrar cantidad de productos en coleccion */
db.products.estimatedDocumentCount();

/* CRUD */

/* Agregar un producto mas a la collecion Productos */

db.products.insertOne({
  name: 'Puflitos',
  price: 200,
  thumbnail: 'https://i.ytimg.com/vi/PTGOxqKyE4M/maxresdefault.jpg',
});

/* Confirmo que se haya agregado el producto */

db.products.find().pretty();

/* Consulta por nombre de producto especifico */

db.products.findOne({ name: 'Puflitos' });

/* Listar productos con precio menor a $1000 */

db.products
  .find({ price: { $lt: 1000 } }, { _id: 0, name: 1, price: 1 })
  .pretty();

/* Listar productos con un precio de $1000 a $3000 */

db.products
  .find(
    { $and: [{ price: { $gte: 1000 } }, { price: { $lte: 3000 } }] },
    { _id: 0, name: 1, price: 1 }
  )
  .pretty();

/* Listar productos con un precio mayor a $3000 */

db.products
  .find({ price: { $gt: 3000 } }, { _id: 0, name: 1, price: 1 })
  .pretty();

/* Listar solo el nombre del tercer producto mas barato */

db.products.find({}, { _id: 0, name: 1 }).sort({ price: 1 }).limit(1).skip(2);

/* Actualizar todos los productos agregando el campo stock con valor de 100 */

db.products.updateMany({}, { $set: { stock: 100 } });

/* Chequeo que se haya agregado la propiedad stock */

db.products.find();

/* Cambiar stock a 0 de los productos mayores a $4000 */

db.products.updateMany({ price: { $gt: 4000 } }, { $set: { stock: 0 } });

/* Chequeo que se haya cambiado el stock a 0 en productos mayores a $4000 */

db.products.find();

/* Borrar los productos con precio menor a $1000 */

db.products.deleteMany({ price: { $lt: 1000 } });

/* Ejecuto servidor Mongo en modo autenticacion */

mongod --auth --dbpath ./base


/* Accedo a la base de datos admin */

use admin

/* Crear usuario que solo pueda leer la informacion */

db.createUser(
  {
    user: "pepe",
    pwd: "asd456",
    roles: [ { role: "read", db: "ecommerce" },
              ]
  }
)

/*  Login con user solo lectura */

mongo -u pepe -p asd456

/* Accedo a la base de datos Ecommerce */

use ecommerce

/* Confirmo que no tiene permisos de escritura */

db.products.insertOne({
  name: 'Puflitos',
  price: 200,
  thumbnail: 'https://i.ytimg.com/vi/PTGOxqKyE4M/maxresdefault.jpg',
});