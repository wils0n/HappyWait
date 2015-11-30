angular.module("queue", [])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("dash.queue", {
                url: "/queue/{idQueue:[0-9]}",
                templateUrl: "/app/components/queue/queue.html",
                controller: "queueController",
                resolve: {
                    Users: function ($stateParams, queueService) {
                        var idQueue = $stateParams.idQueue;
                        return queueService.query({idQueue: idQueue}).$promise;
                    }
                }
            })
    })
    .controller("queueController", function ($scope, Users, queueService, $stateParams, $timeout) {
        $scope.users = Users;

        var timeout = null;

        var updateUsers = function () {
            queueService.query({idQueue: $stateParams.idQueue}, function (users) {
                console.log(users);
                $scope.users = users;
                timeout = $timeout(updateUsers, 10000);
            });
        }

        $scope.atenderUsuario = function () {

            if(timeout)
                $timeout.cancel(timeout);

            var userTo = $scope.users[0];
            var params = {idQueue: userTo.Turno.idQueue, idUser: userTo.Turno.dni}
            queueService.delete(params)
            updateUsers();
        }

        $scope.$on('destroy', function () {
            if(timeout)
                $timeout.cancel(timeout);
        });

        updateUsers();

    })
