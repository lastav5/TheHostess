
var app = angular.module('HostessApp', ['ngRoute', 'thehostess.services', 'hostess.controllers', 'hostess.directives']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/home', {
        templateUrl: 'scripts/src/views/insideArea.html',
        controller: 'overallController'
    }).
    when('/editMap', {
        templateUrl: 'scripts/src/views/editMapView.html',
        controller: 'editMapController'
    }).
    otherwise({
        redirectTo: '/editMap'
    });
}]);