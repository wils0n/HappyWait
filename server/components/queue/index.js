var route   = require("express").Router();

var Queue        = require("../../models").Queue;
var Usuario      = require("../../models").Usuario;
var queueService = require("./service");

route
	.param("idQueue",function  (req,res,next,idQueue) {
		Queue.findOne({where:{idQueue:idQueue}})
			.then(function  (queue) {
				if(queue){	
					req.queue = queue;
					return next();
				}
				
				return res.status(400).json({error:"ño"});
			})
			.catch(function  (error) {
				return res.status(500).json(error);
			});
	})
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
			})
	})
	.get("/",function  (req,res) {
		queueService.getQueues(function  (err,queues) {
			if(err)
				return res.status(err.status).json(err);
			return res.json(queues);
		})
	})
	.get("/:idQueue",function  (req,res) {
		res.json(req.queue);
	})
	.get("/:idQueue/user",function  (req,res) {
		var queue = req.queue;
		queueService.getActiveUsers(req,function  (error,usuarios) {
			if(error)
				return res.status(error.status).json(error);
			return res.json(usuarios);
		});
	})
	.post("/:idQueue/user",function  (req,res) {
		queueService.addUser(req,function  (error,turno) {
			if(error)
				return res.status(error.status).json(error);
			return res.json(turno);
		});
	})
	.delete("/:idQueue/user/:idUser",function  (req,res) {
		queueService.removeUser(req,function  (error,msg) {
			if(error)
				return res.status(error.status).json(error);
			return res.json(msg);
		});
	})


module.exports = route;