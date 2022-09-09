**

## DESAFIO LOGGERS Y GZIP
*Verificar sobre la ruta /info con y sin compresión, la diferencia de cantidad de bytes devueltos en un caso y otro.*
**En esta imagen podemos observar la ruta /info (con Gzip) como muestra  1.2kb en su tamaño y su tiempo de carga fue de 1.25ms**

![Screenshot](https://buentrack.com/wp-content/uploads/2022/09/1gzip.png)

**En la siguiente imagen vemos el encabezado donde afirmativamente nos dice que esta comprimido con Gzip**

![Screenshot](https://buentrack.com/wp-content/uploads/2022/09/2gzip.png)

***Cree la ruta /info-nogzip para comparar los resultados***

**En la siguiente imagen podemos observar que en la ruta sin compresion el peso es de 2.2kb y su tiempo de carga fue de 2.2ms**

![Screenshot](https://buentrack.com/wp-content/uploads/2022/09/1nogzip.png)

**En la siguiente imagen vemos el encabezado donde nos dice que esta NO tiene ninguna compresión**

![Screenshot](https://buentrack.com/wp-content/uploads/2022/09/2nogzip.png)

**Implementado Winston**

 - Ruta y método de todas las peticiones recibidas por el servidor
   (info)
 - Ruta y método de las peticiones a rutas inexistentes en el servidor
   (warning)
 - Errores lanzados por las apis de mensajes y productos, únicamente.
 Menos los errores de los archivos JS que están dentro de la carpeta /public
   (error)

*Se sustituyeron los console.log por logger warn, info y error*

***Perfilamiento del servidor, realizando el test con --prof de node.js. Analizar los resultados obtenidos luego de procesarlos con --prof-process.***

 - **Prueba con console.log**

En la carpeta del proyecto ejecuto en consola el siguiente comando:

    node --prof server.js

En una nueva consola en la carpeta del proyecto ejecuto el comando: 

    artillery quick --count 20 -n 50 http://localhost:8080/info > profiling/result_consoleLog.txt

*Una vez finalizado el test, renombro el archivo que se creo cuyo nombre finaliza en "v8.log" y lo muevo dentro de la carpeta "profiling".*

Vuelvo a la consola y para procesar los datos de profiling de node ejecuto: 

    node.exe --prof-process profiling/ConsoleLog-v8.log > profiling/ConsoleLog-v8_prof_process.txt

 - ***Prueba sin console.log***
 
En la carpeta del proyecto ejecuto en consola el siguiente comando:

    node --prof server.js

En una nueva consola en la carpeta del proyecto ejecuto el comando: 

    artillery quick --count 20 -n 50 http://localhost:8080/info > profiling/result_NO-consoleLog.txt

*Una vez finalizado el test, renombro el archivo que se creo cuyo nombre finaliza en "v8.log" y lo muevo dentro de la carpeta "profiling".*

Vuelvo a la consola y para procesar los datos de profiling de node ejecuto: 

    node.exe --prof-process profiling/NO-consoleLog-v8.log > profiling/NO-consoleLog-v8_prof_process.txt

**REPORT DE ARTILLERY**

![Screenshot](https://buentrack.com/wp-content/uploads/2022/09/RESULTSIN.png)

**REPORT PROFILING DE NODE**

![Screenshot](https://buentrack.com/wp-content/uploads/2022/09/RESULTNODE.png)

**Conclusión:**
Como podemos ver en las imágenes anteriores, el servidor es prácticamente el doble de eficiente al no incluir el console log, comparando los resultados con y sin el console.log.

**AutoCannon**
*Se creo la configuración en un archivo llamando benchmark.js*

***Con console.log***

En la carpeta del proyecto ejecuto en consola el siguiente comando:

    node --prof server.js

En una nueva consola en la ruta del proyecto `node profiling/benchmark.js`

**Sin console.log**

En la carpeta del proyecto ejecuto en consola el siguiente comando:

    node --prof server.js

En una nueva consola en la ruta del proyecto `node profiling/benchmark.js`

**REPORTE DE AUTOCANNON**

![Screenshot](https://buentrack.com/wp-content/uploads/2022/09/CANNONRESULT.png)

Conclusión: 
En la imagen comparativa de resultados podemos apreciar que los tiempos de latencia son mucho menor en el caso de NO utilizar el console.log.

### Perfilamiento del servidor con el modo inspector
***Prueba con console.log***
Encendemos el servidor con el comando:

    node --inspect server.js

En el navegador mi caso chrome ponemos:

    chrome://inspect

Luego click en inspect y vamos a la pestaña perfiles y luego click en iniciar.

En una nueva consola en la ruta del proyecto ponemos:

    node profiling/benchmark.js

Finalizado el test, clic en el botón detener en el navegador y busco la función *(anónimas)* que corre el archivo server.js para ver el resultado.

***Prueba sin console.log***
Encendemos el servidor con el comando:

    node --inspect server.js

En el navegador mi caso chrome ponemos:

    chrome://inspect

Luego click en inspect y vamos a la pestaña perfiles y luego click en iniciar.

En una nueva consola en la ruta del proyecto ponemos:

    node profiling/benchmark.js

Finalizado el test, clic en el botón detener en el navegador y busco la función *(anónimas)* que corre el archivo server.js para ver el resultado.

**REPORTE DE INSPECT NODE**

![Screenshot](https://buentrack.com/wp-content/uploads/2022/09/reporte-inspect-node.png)

Conclusión:
Se puede apreciar que la linea del console.log nos genera una demora extra de 12.1ms en el procesamiento antes de renderizar la información.

**Diagrama de flama con 0x**

***Prueba con console.log***

Ejecutamos el siguiente comando en la carpeta del proyecto:

    0x server.js

En una nueva consola en la carpeta del proyecto ponemos:

    node profiling/benchmark.js
Finalizado el test de autocannon, presionamos CTRL + C para cerrar el proceso y vemos que se genera una carpeta y allí dentro encontramos el archivo flamegraph.html" que contiene las graficas.

***Prueba sin console.log***

Ejecutamos el siguiente comando en la carpeta del proyecto:

    0x server.js

En una nueva consola en la carpeta del proyecto ponemos:

    node profiling/benchmark.js
Finalizado el test de autocannon, presionamos CTRL + C para cerrar el proceso y vemos que se genera una carpeta y allí dentro encontramos el archivo flamegraph.html" que contiene las graficas.

CON CONSOLE.LOG

![Screenshot](https://buentrack.com/wp-content/uploads/2022/09/GRAFICACON1.png)

SIN CONSOLE.LOG

![Screenshot](https://buentrack.com/wp-content/uploads/2022/09/GRAFICASIN1.png)





 

 
