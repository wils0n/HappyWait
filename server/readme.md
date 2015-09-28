## Requisitos
- NodeJs >= 0.10
- Mysql >= 5

## Instalacion
- Ejectuar npm install
- Ejecutar bower install
- Copiar&Modificar el archivo config/db.json[.dist] segun parametros
- Ejecutar el archivo generate.js para generar tablas y datos-> node generate

## Ejecucion
- node  app / npm start
## Api

### User
- GET /user/:idUser -> obtiene el usuario segun dni
- POST /user -> crea un nuevo usuario {dni:STRING,nombres:STRING}
- GET /user/:idUser/queue -> obtiene las colas donde se encuentra el usuario

### Spot
- GET /spot
- GET /spots/:idEstablecimiento ->  Obtiene un vehiculo , tomando como parametro la placa

### Queue
- GET /queue
- GET /queue/:idQueue"
- GET  /queue/:idQueue/user"
- POST /queue/:idQueue/user"
- DELETE /queue/:idQueue/user/:idUser


TODO : 
- Aumentar docs de especificacion.
