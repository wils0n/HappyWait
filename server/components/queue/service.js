var Queue        = require("../../models").Queue;
var Turno        = require("../../models").Turno;
var Usuario      = require("../../models").Usuario;
var Sequelize    = require("../../models").Sequelize;
var util         = require("util");
var queueService = {};


queueService.addUser = function  (req,cb) {
	var error   = new Error();
	var queue   = req.queue;


	if(!req.body || !req.body.dni){
		error.status  = 400;
		error.message = "Nita tener dni la vara";
		return cb(error);
	}

	Usuario.findOne({where:{dni:req.body.dni}})
		.then(function  (usuario) {
			if(!usuario){
				error.status = 400;
				error.message = "Usuario no registrado";
				throw error;
			}
			return usuario;
		})
		.then(function  (usuario) {
			return queue.getUsuarios()
				.then(function  (usuarios) {
					usuario.posicion = 1;
					if(usuarios.length){
						usuarios.forEach(function  (usuarioInQueue) {
							if(usuarioInQueue.get("dni") ==	usuario.get("dni")){
								error.status = 400;
								error.message = "Usuario ya esta en la cola";
								throw error;
							}
						});
						usuario.posicion = usuarios.length+1
					}
					
					return usuario;
				})
				.catch(function  (error) {
					throw error;
				}
			);
		})
		.then(function  (usuario) {
			queue.addUsuario(usuario,{posicion:usuario.posicion})
				.then(function  (turno) {
					return cb(null,turno[0][0]);
				})
				.error(function  (error) {
					throw error;
				}
			)		
		})
		.catch(function  (error) {
			console.log(error);
			return cb(error);
		})
}

queueService.removeUser = function  (req,cb) {
	var error   = new Error();
	var queue   = req.queue;
	var usuario = req.usuario;

	Turno.findOne(
		{
			where:{
				dni:usuario.get("dni"),
				idQueue : queue.get("idQueue")
			}
		}
	).then(function  (turno) {
		if(turno){
			return turno.destroy()
				.then(function  (turnoDeleted) {
					return turnoDeleted
				})
				.catch(function  (error) {
					console.log(error);
					error.status  = 500;
					error.message ="Fallo en la conexion";
					throw error;
				})
		}
		error.status  = 400;
		error.message = "El usuario no esta presente en la cola";
		throw error;
	})
	.then(function  (turnoDeleted) {
		return Turno.update(
			{
				posicion:Sequelize.literal("posicion-1")
			},
			{
				where:{
					idQueue:turnoDeleted.get("idQueue"),
					idTurno:{
						$gt:turnoDeleted.get("idTurno")
					},
					fechaEliminacion:null
				}
			}
		).then(function  (turnosAfectados) {
			return turnosAfectados;

		})
		.catch(function  (err) {
			console.log(err);
			error.status  = 500;
			error.message ="Fallo en la conexion";
			throw err;
		})
	})
	.then(function  (turnosAfectados) {
		var msg = util.format("Turnos afectados : %s",turnosAfectados[0]);

		return cb(null,msg)
	})
	.catch(function  (err) {
		return cb(err);
	})

}

queueService.getActiveUsers = function  (req,cb) {
	var queue = req.queue;
	var error = new Error();

	queue.getUsuarios()
		.then(function  (usuarios) {
			return cb(null,usuarios);
		})
		.catch(function  (err) {
			console.log(err)
			error.status = 500;
			error.message = "Fallo en conexion";
			return cb(error);
		})
}

queueService.getQueues = function  (cb) {
	var error = new Error();
	error.status = 500;

	Queue.findAll()
		.then(function  (queues) {
			return cb(null,queues);
		})
		.catch(function  (err) {
			console.log(err);
			error.message = "Fallo en la conexion";
			return cb(error);
		})
}

module.exports = queueService;