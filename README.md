﻿## **MODOS**

 - npm start -p 3000 -m CLUSTER **=> MODO CLUSTER**
 - npm start -p 3000 -m FORK => **MODO FORK**

## VERIFICAR CANTIDAD DE PROCESOS TOMADOS POR NODE.

 - Ejecuto un console.log de Worker: ${process.pid}

*Confirmo 1 proceso en modo FORK y 4 procesos en modo Cluster*

## EJECUTO EL SERVIDOR CON FOREVER CON SUS PARAMETROS Y MODO ESCUCHA

 - forever --watch start server.js -p 3000 -m CLUSTER => CLUSTER
 - forever --watch start server.js -p 3000 -m FORK => FORK

## Listo los procesos con forever

 - tasklist /fi "imagename eq node.exe" => LISTAR PROCESOS POR SISTEMA
   OPERATIVO
 - forever list => LISTAR LOS PROCEOS CON FOREVER

## LEVANTAR EL SERVIDOR CON PM2 EN MODO FORK Y CLUSTER

EN MODO FORK Y PONER MODO ESCUCHA PARA CAMBIOS

 - pm2 start server.js --watch --name="Server-1"

EN MODO CLUSTER Y PONER EN MODO ESCUCHA PARA CAMBIOS

 - pm2 start server.js --watch --name="Server-2" -i max

## FINALIZAR PROCESOS FORK Y CLUSTER

 - tasklist /fi "imagename eq node.exe => LISTAR PROCESOS POR SISTEMA
   OPERATIVO

 

 - taskkill /pid **IDPROCESO** /F => PARA MATAR UN PROCESO DEL SERVIDOR

*Si ejecutamos pm2 status o tasklist /fi "imagename eq node.exe podemos comprobar que el proceso se levanto de vuelta*

## REDIRIGIR TODAS LAS CONSULTAS A /API/RAMDOMS A UN CLUSTER EN EL PUERTO 8081

***En archivo nginx.conf descomentar lo de la primera parte y comentar lo de la segunda***

 - node server.js => LEVANTAMOS EL SERVER EN MODO FORK DEFAULT Y PORT
   8080 DEFAULT
 - node server.js -p 8081 -m CLUSTER => LEVANTAMOS EL SERVER EN MODO
   CLUSTER Y EL PORT EN 8081
 - nginx.exe levantamos nginx

Visualizamos que todo esta correcto

*Si finalizamos el proceso del servidor en el puerto 8081 y en modo CLUSTER, recibimos un error pero podemos continuar accediendo al resto de las rutas, comprobamos que esta funcionando correctamente.*

## Ejecuta en modo cluster 4 instancias escuchando en los puertos 8082, 8083, 8084 y 8085

 - node server.js => LEVANTAMOS EL SERVER EN MODO FORK DEFAULT Y PORT
   8080 DEFAULT
 - pm2 start server.js --name="Server-1" --node-args=" server.js -p 8082
 - pm2 start server.js --name="Server-2" --node-args=" server.js -p 8083
 - pm2 start server.js --name="Server-3" --node-args=" server.js -p 8084
 - pm2 start server.js --name="Server-5" --node-args=" server.js -p 8085
 - nginx.exe - levantamos nginx

***En archivo nginx.conf comentar lo de la primera parte y des-comentar lo de la segunda***

 - Nos dirigimos a /api/randoms y vemos que todo funciona perfectamente.

 - Pausamos cada uno de los 4 servidores en PM2 y recibimos un error
   pero el resto de las rutas son accesibles. Comprobamos que el CLUSTER
   funciona correctamente.

 - Reanudamos los procesos y comprobamos que vuelve /api/randoms al funcionamiento.

