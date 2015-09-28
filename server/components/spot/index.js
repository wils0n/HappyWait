var router          = require("express").Router();
var Establecimiento = require("../../models").Establecimiento;
var Queue           = require("../../models").Queue;

router
	.get("/",function  (req,res) {
		Establecimiento.findAll()
			.then(function  (establecimientos) {
				var result = [];

				establecimientos.forEach(function  (spot) {
					result.push(spot.get({plain:true}));
				});

				
				return res.status(200).json(result);
			})
			.error(function  (error) {
				console.log(error);
				return res.status(500).json(error);
			})
	})
	.get("/:idEstablecimiento",function  (req,res) {
		
		var id = req.params.idEstablecimiento || null;
		
		Establecimiento.findOne(
				{
					where:{
						idEstablecimiento:id
					},
					include:[{model:Queue,as:"queues"}]
				}
			)
			.then(function  (establecimiento) {
				return res.status(200).json(establecimiento.get({plain:true}));
			})
			.error(function  (error) {
				return res.status(500).json(error);
			})
	})

module.exports = router;