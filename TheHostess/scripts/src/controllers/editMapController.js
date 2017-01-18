angular.module('hostess.controllers', ['ui.bootstrap', 'ngAnimate'])
    .controller('editMapController', ['$scope', '$routeParams','mapsFactory',
    function ($scope, $routeParams, mapsFactory) {

        $scope.carouselIndex = 1;
        $scope.carouseldetails = {};
        $scope.carouseldetails.islocked = false;

        //$scope.mapsData = [];
        //mapsFactory.getMapsData("01/01/1999").then(function (result) {
        //    $scope.mapsData = result;
        //    $scope.styledetails = {};
        //    $scope.styledetails.selectedTable = undefined;
        //    if (typeof ($scope.mapsData[$scope.carouselIndex - 1].tables) != 'undefined')
        //    {
        //        if ($scope.mapsData[$scope.carouselIndex - 1].tables[0]) {
        //            $scope.styledetails.selectedTable = $scope.mapsData[$scope.carouselIndex - 1].tables[0];
        //        }
        //    }
        //    //watch carousel index and when changed do line above ^
        //});
        
        
    }]);
