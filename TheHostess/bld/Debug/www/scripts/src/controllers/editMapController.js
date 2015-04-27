angular.module('hostess.controllers',[])
    .controller('editMapController', ['$scope', '$routeParams','mapsFactory',
    function ($scope, $routeParams, mapsFactory) {
        $scope.mapsData = [];
        $scope.mapsData = mapsFactory.getMapsData().then(function (result) {
            $scope.mapsData = result;
        });
        $scope.carouselIndex = 1;
        $scope.carouseldetails = {};
        $scope.carouseldetails.islocked = false;
    }]);