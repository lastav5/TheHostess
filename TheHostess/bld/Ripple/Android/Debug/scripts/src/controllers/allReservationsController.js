angular.module('hostess.controllers')
    .controller('allReservationsController', ['$scope', '$routeParams', '$uibModalInstance', '$rootScope',
    function ($scope, $routeParams, $uibModalInstance, $rootScope) {

        $scope.allReservationList = [];
        $(document).ready(function () {
            $(document).on('focus', ".clockpicker", function () {
                $(this).clockpicker();
            });
        });
       

        $scope.handleHourFormat = function (reservationList) {
            for (var i = 0; i < reservationList.length; i++) {
                if (reservationList[i].starthour != "" && reservationList[i].starthour != null) {
                    reservationList[i].starthour = reservationList[i].starthour.substring(0, 5);
                }
                if (reservationList[i].endhour != "" && reservationList[i].endhour != null) {
                    reservationList[i].endhour = reservationList[i].endhour.substring(0, 5);
                }
            } 
            return reservationList;

        };

        $scope.getAllReservations = function () {
            //Extract reservations from mapsData into a new list
            angular.forEach($rootScope.mapsData, function (map) {
                angular.forEach(map.tables, function (table) {
                    if (typeof (table.reservations) != 'undefined') {
                        angular.forEach(table.reservations, function (res) {
                            $scope.allReservationList.push(res);
                        });
                    }
                });
            });
            

            //Go over the unassigned reservations' list
            foreach(map in $rootScope.mapsData)//NEEDS TO BE CHANGED SO THAT reservationsNoTable IS NOT PER MAP
            {
                if (typeof (map.reservationsNoTable) != 'undefined'){
                    foreach(res in map.reservationsNoTable)
                    {
                        $scope.allReservationList.push(res);
                    }
                }
            }
            

            if ($scope.allReservationList.length > 0) {
                $scope.allReservationList.sort(compareByStartHour);
                $scope.handleHourFormat($scope.allReservationList);
            }
             
        }

        //$scope.getAllReservations();

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.resizeModal = function () {
            $('.modalDiv').css({ 'height': '' });
        };

        $scope.onChangeTableNumber = function (reservationid) {
            var cont = $(".modalDiv");
            var el = $("#reservation" + reservationid);
            var h = el.height()* 0.3;
            var elementTop = el.position().top;
            var pos = cont.scrollTop() + elementTop - h;
            $('.modalDiv').css({ 'height': $(window).height() *0.2 });
            $('.modalDiv').animate({
                scrollTop: pos 
            }, 1000);
        };

        function compareByStartHour(a, b) {
            if (a.starthour < b.starthour)
                return -1;
            else if (a.starthour > b.starthour)
                return 1;
            else
                return 0;
        }
    }]);




