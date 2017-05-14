
var app = angular.module('HostessApp', ['ngRoute', 'angular-carousel', 'thehostess.services', 'hostess.controllers', 'hostess.directives','envConfig', 'ui.bootstrap', 'ngAnimate','mymodal']);
angular.module('thehostess.services', ['ngResource']);
angular.module('hostess.controllers', ['ui.bootstrap', 'ngAnimate']);
angular.module('hostess.directives', []);

app.run(function ($rootScope) {
    //$rootScope.mapsData = null;
});

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/editMap', {
        templateUrl: 'scripts/src/views/editMapView.html',
        controller: 'editMapController'//need to change this page now that it doesn't get data before loading!(deleted resolve)
    }).
     when('/map', {
            templateUrl: 'scripts/src/views/mapView.html',
            controller: 'mapController'
     }).
    otherwise({
        redirectTo: '/map'
    });
}]);