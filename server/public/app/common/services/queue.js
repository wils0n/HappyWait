angular.module('queueService',[])
    .factory('queueService', function ($resource) {
        var queue = $resource('api/queue/:idQueue/user/:idUser', {idQueue: '@idQueue',idUser:'@idUser'});
        return queue;
    })
