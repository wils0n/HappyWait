angular.module("spots",[])
	.config(function  ($stateProvider,$urlRouterProvider) {
		$stateProvider
			.state("dash.spots",{
				url:"/spots",
				templateUrl:"/app/components/spots/spots.html",
				controller:"mainController"
			})
	})
	.controller("mainController",function  ($scope,$http,spots) {
		$scope.spots = spots.data;
		console.log(spots);
					
	})
