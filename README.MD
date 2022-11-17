


## **Entrega del Proyecto Final de Backend | Diego Balbis para CoderHouse**

**ENV TEMPLATE**
```
PORT=
MODO=
URLMONGO=
SECRET=
TEST_MAIL=
PASS_MAIL=
```
## Productos Template

```
title: Remera
desc: Una Remera
price: 1400
category: Remeras
photo: /uploads/remera.jpeg

title: Pantalon
desc: Un Pantalon
price: 2000
category: Pantalones
photo: /uploads/pantalon.jpg

title: Canguro
desc: Un Canguro
price: 3000
category: Canguros
photo: /uploads/canguro.jpg
```

## Rutas

## / 

Esta es una ruta "Renderizada".
 Si ingresamos desde el navegador podremos ver la configuración del servidor (variables de entorno) y la información sobre el objeto process.
 
## Chat
 
 Esta ruta también es una ruta renderizada con HandleBars, si ingresamos a ella desde el navegador podremos acceder al chat creado con Socket.io. 

El usuario escribe un mensaje con su email y un mensaje,  estos se almacenan en MongoAtlas en una colección
 llamada chatfinal.
 
*GET* **/chat/:email** 

Esta ruta nos devuelve todos los mensajes del usuario que este registrado con el *:email* que le pasamos por parámetros. Si el usuario todavía no ha publico algún mensaje, se devuelve que no existen mensajes para ese usuario.

***A partir de aquí la app solo trabaja con respuestas JSON por lo tanto para probar su correcto funcionamiento deberemos utilizar POSTMAN.***

## Register

*POST* **/register**

Aquí comenzamos el flujo de nuestro ecommerce. 

Para registrarse el usuario debe mandar por *body* la siguiente información:
```
username
email
password
password2
firstname
lastname
phone
```
En caso de que falte algún campo, recibimos un mensaje de que los campos están incompletos.

En caso de que los passwords no coincidan recibiremos un mensaje alertándolo.

En caso de que este todo OK llegara por email (el que definimos en el archivo .env) un correo electronico con la información del usuario.

## Login

*POST* **/login**

En esta ruta realizaremos nuestro LOGIN con passport.

Para realizar el login deberemos mandar por body los siguientes campos:

```
username
password
```
## Logout

*POST* **/logout**

En esta ruta realizaremos nuestro LOGOUT de passport.

## Productos

*GET* **/productos**

Esta ruta nos devuelve todos los productos que tenemos disponibles.

En caso de que no haya ninguno, recibiremos un mensaje diciendo que todavía no hay productos disponibles. 

*GET* **/productos/:id**

Esta ruta nos devuelve el producto solicitado, donde el id se le pasa por params.

En caso de que no haya ninguno, recibiremos un mensaje diciendo que el producto no existe. 

*POST* **/productos/**

Mediante esta ruta podremos agregar productos a nuestra tienda.

La información del producto a agregar se debe mandar por body y tener los siguientes campos:
```
title
photo
price
desc
category
```
*PUT* **/productos/:id**

En esta ruta podremos modificar un producto por su *_id* de MongoAtlas.

*DELETE* **/productos/:id**

En esta ruta podremos borrar un producto por su *_id* de MongoAtlas.

*GET* **/productos/categoria/:category**

En esta ruta, podremos listar todos los productos segun la categoria indicada en params.

En caso de que no haya ningún producto con esa categoría, recibiremos un mensaje diciendo que no hay productos bajo la categoría solicitada.

## Carrito (Solo logeado)

Para poder comenzar a agregar nuestros productos a nuestro carrito primero debemos crear uno para nuestro usuario, lo hacemos de la siguiente manera:

*POST* **/carrito**

De esta forma estamos creando un carrito para nuestro usuario, el id de usuario lo obtenemos del req.user.

*POST* **/carrito/productos**

De esta forma podremos agregar productos a nuestro carrito, solamente deberemos pasarle por body el id del producto que queremos agregar, de la siguiente manera:
```
idProd
```
*GET* **/carrito**

De esta forma podremos consultar el carrito de nuestro usuario y ver sus productos. 

En caso de que el usuario no este logeado o que no tenga un carrito creado veremos un mensaje alertando cual sea el caso.

*DELETE* **/carrito/productos**

De esta forma podremos borrar productos a nuestro carrito, solamente deberemos pasarle por body el id del producto que queremos eliminar, de la siguiente manera:
```
idProd
```
## Checkout (Solo logeado)

*POST* **/checkout**

De esta forma podremos generar una orden de pedido para nuestro usuario.

Nos llegara por email (el que definimos en el archivo .env) un correo electrónico con la información del pedido y del usuario.

Vaciamos el carrito.

*GET* **/checkout**

En esta ruta podremos ver todas las ordenes generadas por el usuario (la búsqueda se realiza mediante su email).

## Herramientas utilizadas

-   JavaScript.
-   Node Js.
-   Express.
-   MongoDB.
-   Postman.

## Dependencias utilizadas

- Bcrypt
- Connect-Mongo
- Cookie-Parser
- DotENV
- Express-Handlebars
- Mongoose
- Nodemailer
- Passport
- Socket.io
- Winston

Link al deploy: https://backend-entrega-final-production.up.railway.app
















