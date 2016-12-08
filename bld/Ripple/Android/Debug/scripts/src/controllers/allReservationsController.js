angular.module('hostess.controllers')
    .controller('allReservationsController', ['$scope', '$routeParams', '$uibModalInstance', '$rootScope','mapIndex',
    function ($scope, $routeParams, $uibModalInstance, $rootScope, mapIndex) {


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
            var currentMap = mapIndex;
            var tableCounter = $rootScope.mapsData[currentMap].tables.length;
            for (var i = 0; i < tableCounter; i++) {
                if (typeof ($rootScope.mapsData[currentMap].tables[i].reservations) != 'undefined') {
                    var reservationsLength = $rootScope.mapsData[currentMap].tables[i].reservations.length;
                    for (var j = 0; j < reservationsLength; j++) {
                        $scope.allReservationList.push($rootScope.mapsData[currentMap].tables[i].reservations[j]);
                    }
                }
            }

            if (typeof ($rootScope.mapsData[currentMap].reservationsNoTable) != 'undefined') {
                var reservationsNoTableLength = $rootScope.mapsData[currentMap].reservationsNoTable.length;
                for (var i = 0; i < reservationsNoTableLength; i++) {
                    $scope.allReservationList.push($rootScope.mapsData[currentMap].reservationsNoTable[i]);
                }
            }

            if ($scope.allReservationList.length > 0) {
                $scope.allReservationList.sort(compareByStartHour);
                $scope.handleHourFormat($scope.allReservationList);
            }
             
        }

        $scope.getAllReservations();

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

    }]);

function compareByStartHour(a, b) {
    if (a.starthour < b.starthour)
        return -1;
    else if (a.starthour > b.starthour)
        return 1;
    else
        return 0;
}


