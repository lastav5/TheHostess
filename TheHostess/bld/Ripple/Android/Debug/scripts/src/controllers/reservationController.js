angular.module('hostess.controllers')
    .controller('reservationController', ['$scope', '$routeParams', '$uibModalInstance', '$rootScope', 'table', 'reservationFactory',
    function ($scope, $routeParams, $uibModalInstance, $rootScope, table, reservationFactory) {
     
        $scope.reservationList = [];

        $(document).ready(function () {
            // $('.clockpicker').clockpicker();
            var input = $('.clockpicker');
            input.clockpicker({
                autoclose: true
            });
        });
        getAllReservations(table);

        

        function getAllReservations(tableObj)// extract reservations by table from reservationsList in order to show them in modal
        {
            $scope.reservationList = tableObj.reservations;//it's important that both scope variables point to the same array object in memory
            $scope.reservationList.sort(compareByStartHour);
        }

        $scope.RemoveReservation = function(res){
            //first need to remove from db
            reservationFactory.deleteReservation(res.reservationid).then(function (result) {
                console.log("in angular: " + result);
                //remove from angular's scope mapsData
                angular.forEach($rootScope.mapsData, function (map) {
                    angular.forEach(map.tables, function (table) {
                        var counter = table.reservations.length;
                        for (var i = 0; i < counter; i++) {
                            if (table.reservations[i].reservationid == res.reservationid) {
                                table.reservations.splice(i, 1);//IMPORTANT splice alters the original array so we don't lose the reference
                            }
                        }
                    });
                });
            }, function (error) {
                console.log(error);
            });
        };

        $scope.addReservations = function () { //Needs to be fixed if we want to use it
            var reservation = {
                reservationId: "",
                name: "",
                guestcount: "",
                date: "",
                hour: "",
                notes: "",
                phone: "",
                mode: 'edit'
            };
            if (typeof ($scope.reservationList) == 'undefined') {
                $scope.reservationList = [];
                $scope.reservationList[0] = reservation;
            }
            else
                $scope.reservationList.push(reservation);
        };

        $scope.saveReservations = function () {

        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
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
    
