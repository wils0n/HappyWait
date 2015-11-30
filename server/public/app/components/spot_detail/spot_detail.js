angular.module("spot.detail", [])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("dash.spot_detail", {
                url: "/spots/{idSpot:[0-9]}",
                templateUrl: "/app/components/spot_detail/spot_detail.html",
                controller: "spotDetailController",
                resolve: {
                    spotDetail: function (spotService, $stateParams) {
                        var idSpot = $stateParams.idSpot;
                        return spotService.get({idSpot: idSpot}).$promise
                    }
                }
            })
    })
    .controller("spotDetailController", function ($scope, spotDetail) {
        console.log(spotDetail);
        $scope.spot = spotDetail;
        $scope.map = {
            center: {latitude: spotDetail.lat, longitude: spotDetail.lng}
        }
    })
