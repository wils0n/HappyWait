var Queue        = require("../../models").Queue;
var Turno        = require("../../models").Turno;
var Usuario      = require("../../models").Usuario;
var Sequelize    = require("../../models").Sequelize;
var util         = require("util");
var userService = {};



userService.createUser = function  (req,cb) {
	var error = new Error();
	
	if(!req.body.dni || !req.body.nombres){
		error.status = 400;
		error.message = "Es necesario Dni y nombre para crear el Usuario";
		return cb(error);
	}

	if(!req.body.dni.toString().length!==8){
		error.status  = 400;
		error.message = "El dni debe tener 8 digitos";
		return cb(error);
	}

	Usuario.findOrCreate({where:{dni:req.body.dni},defaults:req.body})
		.spread(function  (usuario) {
			return cb(null,usuario);
		})
		.catch(function  (err) {
			console.log(err);

			error.status = 500;
			error.message = "Fallo en la conexion";
			return cb(error);
		});
}

userService.getActiveQueues = function  (req,cb) {
	var user = req.usuario;
	user.getQueues()
		.then(function  (queues) {
			return cb(null,queues);
		})
		.catch(function  (error) {
			console.log(error);
			return cb(error);
		}
	);
}

module.exports = userService;