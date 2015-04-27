angular.module('hostess.controllers',[])
    .controller('editMapController', ['$scope', '$routeParams','mapsFactory',
    function ($scope, $routeParams, mapsFactory) {

        $scope.carouselIndex = 1;
        $scope.carouseldetails = {};
        $scope.carouseldetails.islocked = false;

        $scope.mapsData = [];
        $scope.mapsData = mapsFactory.getMapsData().then(function (result) {
            $scope.mapsData = result;
            $scope.styledetails = {};
            $scope.styledetails.selectedTable = undefined;
            if ($scope.mapsData[$scope.carouselIndex - 1].tables[0]) {
                $scope.styledetails.selectedTable = $scope.mapsData[$scope.carouselIndex - 1].tables[0];
            }
            //watch carousel index and when changed do line above ^
        });
        
        
    }]);
