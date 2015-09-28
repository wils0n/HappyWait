angular.module("app",
	[
		"ngResource",
		"ui.router",
		"queues",
		"spots"

	])
	.config(function  ($stateProvider,$urlRouterProvider) {
		$urlRouterProvider.otherwise("/dashboard/spots");
		$stateProvider
			.state("dash",{
				url:"/dashboard",
				abstract:true,
				templateUrl:"/app/app.html",
				resolve:{
					spots: function  ($http) {
						return $http.get("/spot");
					}
				}
			})
	})
