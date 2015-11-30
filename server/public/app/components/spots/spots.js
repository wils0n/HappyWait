angular.module("spots",[])
	.config(function  ($stateProvider,$urlRouterProvider) {
		$stateProvider
			.state("dash.spots",{
				url:"/spots",
				templateUrl:"/app/components/spots/spots.html",
				controller:"mainController",
				resolve:{
					spots: function  (spotService) {
						return spotService.query().$promise;
					}
				}
			})
	})
	.controller("mainController",function  ($scope,spots) {
		$scope.spots = spots;
					
	})
