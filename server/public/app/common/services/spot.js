angular.module('spotService',[])
    .factory('spotService', function ($resource) {
        var spot = $resource('api/spot/:idSpot', {idSpot: '@id'});
        return spot;
    })