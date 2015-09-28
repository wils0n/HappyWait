var route       = require("express").Router();
var userService = require("./service");
var Queue       = require("../../models").Queue;
var Usuario     = require("../../models").Usuario;

route
	.param("idUser",function  (req,res,next,idUser) {
		Usuario.findOne({where:{dni:idUser}})
			.then(function  (usuario) {
				if(usuario){
					req.usuario = usuario;
					return next();
				}
				return res.status(400).json({error:"ño"});
			})
			.catch(function  (error) {
				return res.status(500).json(error);
			}
		)
	})
	.get("/:idUser",function  (req,res) {
		return res.json(req.user);
	})
	.post("/",function  (req,res) {
		userService.createUser(req,function  (error,usuario) {
			if(error)
				return res.status(error.status).json(error);
			return res.status(201).json(usuario);
		});			
	})
	.get("/:idUser/queue",function  (req,res) {
		userService.getActiveQueues(req,function  (error,queues) {
			if(error)
				return res.status(error.status).json(error);
			return res.json(queues);
		})
	})



module.exports = route;