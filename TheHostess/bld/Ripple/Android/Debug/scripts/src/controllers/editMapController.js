angular.module('hostess.controllers',[])
    .controller('editMapController', ['$scope', '$routeParams','mapsFactory',
    function ($scope, $routeParams, mapsFactory) {
        $scope.mapsData = mapsFactory.query();
    }]);