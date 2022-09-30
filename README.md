## **Tercera entrega del Proyecto Final**

***ENV TEMPLATE***

    PORT=
    MODO=
    URLMONGO=
    SECRET=
    TEST_MAIL=
    PASS_MAIL=
    twilioAccountSid=
    twilioAuthToken=
    twilioWhatsappFrom=
    twilioWhatsappTo=
    twilioSMSFrom=
    twilioSMSTo=

**Registro y Login de usuarios**
 1. El registro de usuario lo realizamos en el endpoint /register
   colocando la información requerida y el numero de teléfono celular sin el primer 0, todo desde el navegador.
   
 2. Los avatars de usuario serán guardados gracias a multer en la carpeta /uploads/avatars
 3.  Si un usuario no registrado quiere visitar alguna URL como / o /checkout sera redirigido.
 4. Una vez registrado debemos logearnos con los datos de nuestro usuario.
 5.  El servidor enviara un email al administrador (ENV: TEST_MAIL) notificando el Nuevo Registro.
 6. Una vez logeados seremos redirigidos a "/" lo mismo si deseamos ir a "/checkout", veremos un mensaje diciendo que nuestro carrito esta vacío.

**Agregar Productos Disponibles**

Para agregar productos disponibles y asi poder agregarlos al carrito debemos hacerlo mediante postman: **con un metodo POST usando el endpoint: /api/productos** 

Aquí dejo algunos modelos a usar durante la creación de los productos. 
*Las imágenes de los mismos se encontraran en la carpeta /public/uploads*

    title: Remera
    desc: Una Remera
    code: 42xd
    price: 1400
    stock: 3
    photo: /uploads/remera.jpeg
    
    title: Pantalon
    desc: Un Pantalon
    code: 41xd
    price: 2000
    stock: 7
    photo: /uploads/pantalon.jpg
    
    title: Canguro
    desc: Un Canguro
    code: 43xd
    price: 3000
    stock: 5
    photo: /uploads/canguro.jpg

**Creando un Nuevo Carrito Vacío**

Para poder agregar productos a un carrito primero debemos crearlo y asignarlo a un usuario mediante Postman.

 - Buscamos el _id de mongo del usuario al que queremos crearle un carrito nuevo.
 - Mediante Postman hacemos un POST a la ruta /api/carrito/**:_id** del usuario en mongo.
 - Obtendremos un **idCart**

**Agregando un Producto al Carrito**

Para poder agregar un producto al carrito debemos realizarlo cons Postman tambien.

 - Buscamos el _**id de mongo del producto** que deseamos agregar al carrito.
 - Buscamos el **_id de mongo del carrito** donde queremos que sea agregado el producto.
 - Mediante Postman hacemos un Post a la ruta /api/**:_idDelCarrito**/productos
 - **Mediante Postman por body** tambien le debemos pasar el _id del producto que deseamos agregar como: **idProd**

*Una vez que el usuario ya cuente con un carrito y ese carrito ya tenga algún producto, en la ruta "/" y "/checkout" podremos ver el listado de los productos que el usuario tenga agregados.*

**Checkout**
Para finalizar la compra clickeamos el botón *Finalizar la compra* y veremos nuestro carrito con los productos.

 - Clickeamos en Finalizar la compra
 - Clickeamos en Confirmar la Compra y veremos el total de la misma.
 - Una vez Confirmada la compra recibiremos por Whatsapp con los datos del pedido, además se enviara un email al administrador con los datos del pedido y un SMS al cliente con los datos de su pedido. **Whatsapp = ENV: twilioWhatsappTo SMS = ENV: twilioSMSTo**
 - Si todo salio correctamente nos saldra una alerta confirmando el pedido.
 - El carrito del Usuario será vaciado y redirigido a "/"

*El proyecto trabaja con MongoAtlas, y se uso Winston para realizar los mensajes a la consola por logs. Tambien el servidor puede funcionar en modo FORK o CLUSTER definiendolo desde el archivo .env (Default FORK).*

**Relizando las pruebas con Artillery en modo CLUSTER**

*En modo Cluster*

![Screenshot](https://buentrack.com/wp-content/uploads/2022/09/resultCLUSTER.png)

*En Modo Fork*

![Screenshot](https://buentrack.com/wp-content/uploads/2022/09/FORK.png)


*Conclusión: Podemos apreciar que el tiempo de respuesta y la cantidad de solicitudes procesadas es mayor en modo CLUSTER ya que utiliza mas núcleos para atender estos procesos.*

 

 

