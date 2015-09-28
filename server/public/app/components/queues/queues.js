angular.module("queues",
	[
		"queues.detail"
	]
	)
	.config(function  ($stateProvider,$urlRouterProvider) {
		$stateProvider
			.state("dash.queue",{
				url:"/spots/{idEstablecimiento:[0-9]}",
				templateUrl:"/app/components/queues/queues.html",
				controller:"queuesController"
			})
	})
	.controller("queuesController",function  ($scope,$stateParams,$resource) {
		var idEstablecimiento       = $stateParams.idEstablecimiento;
		var EstablecimientoResource = $resource("/spot/:idSpot");
		
		$scope.spot  = EstablecimientoResource.get({idSpot:idEstablecimiento});
		console.log($scope.spot);
	})
