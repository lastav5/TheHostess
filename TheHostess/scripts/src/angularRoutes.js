
var app = angular.module('HostessApp', ['ngRoute', 'angular-carousel', 'thehostess.services', 'hostess.controllers', 'hostess.directives', 'ui.bootstrap', 'ngAnimate']);
var services = angular.module('thehostess.services', ['ngResource']);

app.run(function ($rootScope) {
    //$rootScope.mapsData = null;
});

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/home', {
        templateUrl: 'scripts/src/views/insideArea.html',
        controller: 'overallController'
    }).
    when('/editMap', {
        templateUrl: 'scripts/src/views/editMapView.html',
        controller: 'editMapController'
        //,
        //resolve: {
        //    mapsData: function (mapsFactory, $rootScope) {
        //        var today = new Date();
        //        var date = (today.getDate() < 10 ? '0' : '') + today.getDate() + '/' +
        //    ((today.getMonth() + 1) < 10 ? '0' : '') + (today.getMonth() + 1) + '/' + today.getFullYear();

        //        return mapsFactory.getMapsData(date);
        //    }
        //}
    }).
     when('/map', {
            templateUrl: 'scripts/src/views/mapView.html',
            controller: 'mapController'
         //,
         //   resolve: {
         //       mapsData: function (mapsFactory, $rootScope) {
         //           var today = new Date();
         //           var date = (today.getDate() < 10 ? '0' : '') + today.getDate() + '/' +
         //       ((today.getMonth() + 1) < 10 ? '0' : '') + (today.getMonth() + 1) + '/' + today.getFullYear();

         //           return mapsFactory.getMapsData(date);
         //       }
         //   }
     }).
    otherwise({
        redirectTo: '/map'
    });
}]);