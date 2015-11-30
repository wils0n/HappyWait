angular.module("app",
    [
        "ngResource",
        "ui.router",
        'ngMaterial',
        'uiGmapgoogle-maps',

        "queue",
        "spot.detail",
        "spots",
        "spotService",
        "queueService"
    ])
    .config(function ($stateProvider, $urlRouterProvider,uiGmapGoogleMapApiProvider) {
        $urlRouterProvider.otherwise("/dashboard/spots");
        $stateProvider
            .state("dash", {
                url: "/dashboard",
                abstract: true,
                template: "<ui-view/>"
            })

        uiGmapGoogleMapApiProvider.configure({
            //    key: 'your api key',
            v: '3.20', //defaults to latest 3.X anyhow
            libraries: 'weather,geometry,visualization'
        });
    })