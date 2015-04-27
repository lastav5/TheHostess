
var app = angular.module('HostessApp', ['ngRoute', 'angular-carousel', 'thehostess.services', 'hostess.controllers', 'hostess.directives']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/home', {
        templateUrl: 'scripts/src/views/insideArea.html',
        controller: 'overallController'
    }).
    when('/editMap', {
        templateUrl: 'scripts/src/views/editMapView.html',
        controller: 'editMapController',
        resolve: {
            mapsData: function (mapsFactory, $rootScope) {
                return mapsFactory.getMapsData();
            }
        }
    }).
    otherwise({
        redirectTo: '/editMap'
    });
}]);