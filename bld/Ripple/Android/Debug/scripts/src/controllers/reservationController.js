angular.module('hostess.controllers')
    .controller('reservationController', ['$scope', '$routeParams', 'tableId', '$uibModalInstance', '$rootScope', 'mapIndex',
    function ($scope, $routeParams, tableId, $uibModalInstance, $rootScope, mapIndex) {
     
       
        $scope.reservationList = [];
        $(document).ready(function () {
            // $('.clockpicker').clockpicker();
            var input = $('.clockpicker');
            input.clockpicker({
                autoclose: true
            });
        });

        $scope.handleHourFormat = function (reservationList) {
            for (var i = 0; i < reservationList.length; i++) {
                if (reservationList[i].starthour != "" && reservationList[i].starthour != null) {
                    reservationList[i].starthour = reservationList[i].starthour.substring(0, reservationList[i].starthour.lastIndexOf(":"));
                }
                if (reservationList[i].endhour != "" && reservationList[i].endhour != null) {
                        reservationList[i].endhour = reservationList[i].endhour.substring(0, reservationList[i].endhour.lastIndexOf(":"));
                }
            }
            return reservationList;
        };

        $scope.getAllReservations=function()
        {
            var currentMap = mapIndex;
            var tableCounter = $rootScope.mapsData[currentMap].tables.length;
            for (var i = 0; i < tableCounter;i++)
            {
                if ($rootScope.mapsData[currentMap].tables[i].tableid == tableId) {
                    if (typeof ($rootScope.mapsData[currentMap].tables[i].reservations) != 'undefined' && $rootScope.mapsData[currentMap].tables[i].reservations.length >0) {
                        for (var j = 0; j < $rootScope.mapsData[currentMap].tables[i].reservations.length; j++) {
                            $scope.reservationList.push(angular.copy($rootScope.mapsData[currentMap].tables[i].reservations[j]));
                        }
                        $scope.reservationList.sort(compareByStartHour);
                        $scope.reservationList = $scope.handleHourFormat($scope.reservationList);
                    }
                    break;
                }
            }
        }

        $scope.addReservations= function()
        { //Need to be fixed if we want to use it
            var reservation = {
                reservationId: "",
                name: "",
                guestcount:"",
                date:"",
                hour:"",
                notes:"",
                phone: "",
                mode:'edit'
            };
            if (typeof($scope.reservationList) == 'undefined') {
                $scope.reservationList = [];
                $scope.reservationList[0] = reservation;
            }
            else
                $scope.reservationList.push(reservation);
        }

        $scope.getAllReservations();
        $scope.saveReservations = function () {

        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

      

    }]);

    function compareByStartHour(a, b) {
        if (a.starthour < b.starthour)
            return -1;
        else if (a.starthour > b.starthour)
            return 1;
        else
            return 0;
    }

    
