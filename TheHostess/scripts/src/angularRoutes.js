var app = angular.module('HostessApp', ['ngRoute', 'hostess.controllers','hostess.directives']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/home', {
        templateUrl: 'scripts/src/views/insideArea.html',
        controller: 'overallController'
    }).
    otherwise({
        redirectTo: '/home'
    });
}]);