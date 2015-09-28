angular.module("queues.detail",[])
	.config(function  ($stateProvider,$urlRouterProvider) {
		$stateProvider
			.state("dash.queue.detail",{
				url:"/{idQueue:[0-9]}",
				templateUrl:"/app/components/queues/detail/detail.html",
				controller:"detailController"
			})
	})
	.controller("detailController",function  ($scope,$stateParams,$resource) {
		var idQueue                 = $stateParams.idQueues;
		var EstablecimientoResource = $resource("/queue/:idQueue");
		
		$scope.spot  = EstablecimientoResource.get({idSpot:idEstablecimiento});
		console.log($scope.spot);
	})
