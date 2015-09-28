var models  = require("./models");
var fixture = require("sequelize-fixtures");

models.sequelize.drop().then(function() {
	models.sequelize.sync().then(function  () {
		
		fixture.loadFile("testData/*.json",models)
			.then(function  () {
				console.log("Termino de subir la data de prueba");
				return;
			})
			.catch(function  (error) {
				console.log(error);
			})
		
	});

});