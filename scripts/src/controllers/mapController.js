/// <reference path="../views/reservation.html" />
angular.module('hostess.controllers')
    .controller('mapController', ['$scope', '$routeParams', 'mapsFactory', '$location', '$uibModal','$rootScope','reservationFactory','$timeout',
    function ($scope, $routeParams, mapsFactory, $location, $uibModal, $rootScope, reservationFactory, $timeout) {

        $scope.carouselIndex = 1;
        $scope.carouseldetails = {};
        $scope.carouseldetails.islocked = false;
        $scope.showAddReservationDiv = false;
        $scope.reservation = {};
        $scope.reservation.alldayres = true;
        var today = new Date();
        var output = (today.getDate() < 10 ? '0' : '') + today.getDate() + '/' +
            ((today.getMonth() + 1) < 10 ? '0' : '') + (today.getMonth() + 1) + '/' + today.getFullYear();

        $scope.selectedDate = output;
        $scope.mapsData = [];
        $scope.mapsData = mapsFactory.getMapsData($scope.selectedDate).then(function (result) {
            $scope.mapsData = result;
            $rootScope.mapsData = result;
        });
        $('.clockpicker').clockpicker();
        $scope.nextWeek = [];

        for (var i = 0; i < 6; i++)
        {
            var _today = new Date();
            var d = new Date();
            d.setDate(_today.getDate() + i)
            $scope.nextWeek[i] = {};
            $scope.nextWeek[i].date = d;
            switch ($scope.nextWeek[i].date.getDay())
            {
                case 0: $scope.nextWeek[i].dayOfWeek = "א"; break;
                case 1: $scope.nextWeek[i].dayOfWeek = "ב"; break;
                case 2: $scope.nextWeek[i].dayOfWeek = "ג"; break;
                case 3: $scope.nextWeek[i].dayOfWeek = "ד"; break;
                case 4: $scope.nextWeek[i].dayOfWeek = "ה"; break;
                case 5: $scope.nextWeek[i].dayOfWeek = "ו"; break;
                case 6: $scope.nextWeek[i].dayOfWeek = "ש"; break;
            }
            
        }

        $(function () {
            
            $('#datetimepicker').datetimepicker({           
                //defaultDate : "11/02/2016",//today.getDay()+ "/"+today.getMonth+1 +"/"+ today.getFullYear,
                format: 'DD/MM/YYYY'
            });
            $("#datetimepicker").on("dp.change", function (e) {
                $scope.onDatePickerChange();               
            });
        });

        $scope.onDatePickerChange = function () {
            $scope.showAddReservationDiv = false;
            $scope.mapsData = mapsFactory.getMapsData($('#datetimepicker').val()).then(function (result) {
                $scope.mapsData = result;
                $rootScope.mapsData = result;
                $scope.selectedDate = $('#datetimepicker').val();
            });
        };

        $scope.editMap = function()
        {
            $location.path("/editMap");

        };

        $scope.addReservation = function () {
            $scope.showAddReservationDiv = true;
            $scope.reservation = {};
            $scope.reservation.tablenumbers = "";
            $scope.reservation.alldayres = true;
            $scope.SetDisablity();
        };

        $scope.openReservation = function (tableId) {
            if ($scope.showAddReservationDiv) {
                if (($scope.reservation.starthour == "" || $scope.reservation.starthour == null) &&
                    ($scope.reservation.endhour == "" || $scope.reservation.endhour == null) && $scope.reservation.alldayres == false) {
                    alert("לא ניתן לשבץ שולחן לפני בחירת שעה או הזמנה של כל היום");
                    return;
                }
            
                if ($scope.reservation.tablenumbers.search(tableId) == -1)
                    $scope.reservation.tablenumbers += tableId + ".";
           
                else
                    $scope.reservation.tablenumbers = $scope.reservation.tablenumbers.replace(tableId + ".", "");
            }
            else {
                var modalInstance = $uibModal.open({
                    templateUrl: 'scripts/src/views/reservation.html',
                    controller: 'reservationController',
                    resolve: {
                        tableId: tableId,
                        mapIndex: $scope.carouselIndex
                    }

                });
            }
        };

        $scope.CloseReservation = function () {
            $scope.showAddReservationDiv = false;
            $scope.SetDisablity();
        };

        $scope.saveReservation = function () {
            var isResValid = $scope.validation($scope.reservation);
            if (!isResValid)
                return;

            var currentMapId = $scope.mapsData[$scope.carouselIndex].mapid;
            var reservationToSave = angular.copy($scope.reservation);
            reservationToSave.date = $('#datetimepicker').val();
            reservationToSave.mapid = currentMapId;
            if (typeof (reservationToSave.starthour) == "undefined" || reservationToSave.starthour==null)
                reservationToSave.starthour = null;
            else
                reservationToSave.starthour += ":00";
            if (typeof (reservationToSave.endhour) == "undefined" || reservationToSave.endhour==null)
                reservationToSave.endhour = null;
            else
                reservationToSave.endhour += ":00";
            if (typeof (reservationToSave.notes) == "undefined")
                reservationToSave.notes = "";
            var resFactory = new reservationFactory.reservationResource();

            resFactory.save(reservationToSave,
                function (result) {
                    //var reservationToSave = $scope.reservation;
                    reservationToSave.reservationid = result[0].reservationid;
                    var mapsDataLength = $scope.mapsData.length;
                    for (var i = 0; i < mapsDataLength; i++) {

                        if (reservationToSave.tablenumbers == "") {
                            $scope.mapsData[i].reservationsNoTable.push(reservationToSave);
                        }
                        else {
                            var tablesLength = $scope.mapsData[i].tables.length;
                            if (reservationToSave.mapid == $scope.mapsData[i].mapid) {
                                for (var j = 0; j < tablesLength; j++) {
                                    if ($scope.reservation.tablenumbers.search($scope.mapsData[i].tables[j].tableid) != -1) {
                                        if (typeof ($scope.mapsData[i].tables[j].reservations) == "undefined")
                                            $scope.mapsData[i].tables[j].reservations = [];
                                        $scope.mapsData[i].tables[j].reservations.push(reservationToSave);
                                        if (reservationToSave.alldayres == true) {
                                            $scope.mapsData[i].tables[j].isDisabled = true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    $rootScope.mapsData = $scope.mapsData;
                    alert("הזמנה נשמרה");
                    $scope.resetReservation();
                }, function (error) {
                    alert("adding failed " + error);
                });
        };

        $scope.SetDisablity = function () {
            
            var tablesCounter = 0;
            if (typeof($scope.mapsData[$scope.carouselIndex].tables)!= 'undefined')
                $scope.mapsData[$scope.carouselIndex].tables.length;
            for (var i = 0; i < tablesCounter; i++)
            { 
                if ($scope.showAddReservationDiv == false) {
                    $scope.mapsData[$scope.carouselIndex].tables[i].isDisabled = false;
                }
                else
                {
                    var reservationsCounter = 0;
                    if (typeof( $scope.mapsData[$scope.carouselIndex].tables[i].reservations) !='undefined')
                        reservationsCounter = $scope.mapsData[$scope.carouselIndex].tables[i].reservations.length;
                    if ($scope.reservation.alldayres == true) {
                        $scope.mapsData[$scope.carouselIndex].tables[i].isDisabled = reservationsCounter > 0;
                    }
                    else {
                        for (var j = 0; j < reservationsCounter; j++) {
                            
                            var hoursOverlapp;
                            if ($scope.mapsData[$scope.carouselIndex].tables[i].reservations[j].alldayres == true)
                            {
                                hoursOverlapp = true;
                            }
                            else
                                hoursOverlapp = $scope.CheckHoursOverlapp($scope.reservation.starthour, $scope.reservation.endhour, $scope.mapsData[$scope.carouselIndex].tables[i].reservations[j].starthour, $scope.mapsData[$scope.carouselIndex].tables[i].reservations[j].endhour);

                            if (hoursOverlapp == true) {
                                $scope.mapsData[$scope.carouselIndex].tables[i].isDisabled = true;
                                break;
                            }
                            else
                                $scope.mapsData[$scope.carouselIndex].tables[i].isDisabled = false;

                        }
                    }
                }
            }
        };

        $scope.CheckHoursOverlapp = function (currentStartHour,currentEndHour, existsStartHour,existsEndHour) {
            if ((currentStartHour >= existsStartHour && currentStartHour < existsEndHour) || (currentEndHour > existsStartHour && currentEndHour < existsEndHour)
                || currentStartHour < existsStartHour && currentEndHour > existsEndHour)
                return true;
            else
                return false;
        };

        $scope.validation = function (reservation) {

            if (((reservation.starthour == null || reservation.endhour == null) && reservation.alldayres == false)
                || ((reservation.starthour != null || reservation.endhour!= null) && reservation.alldayres == true)) {
                alert("בחר הזמנה של כל היום או שעת התחלה וסיום");
                return false;
            }
            else
                return true;
        };

        $scope.$watch('reservation.starthour', function () {
            if ($scope.reservation.starthour != "")
                $scope.reservation.alldayres = false;
        });

        $scope.$watch('reservation.endhour', function () {
            if ($scope.reservation.endhour != "")
                $scope.reservation.alldayres = false;
        });

        $scope.openAllReservations = function () {
            var modalInstance = $uibModal.open({
                templateUrl: 'scripts/src/views/allReservations.html',
                controller: 'allReservationsController',
                resolve: {
                    mapIndex: $scope.carouselIndex
                }
            });
        };
     
        $scope.resetReservation = function () {
            $scope.reservation.starthour = null;
            $scope.reservation.endhour = null;
            $scope.reservation.name = null;
            $scope.reservation.phone = null;
            $scope.reservation.alldayres = true;
            $scope.reservation.guestcount = null;
            $scope.reservation.tablenumbers = "";
            $scope.reservation.notes = null;
        };

        $scope.setDate = function (date) {
            var dateToSet = (date.getDate() < 10 ? '0' : '') + date.getDate() + '/' +
            ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1) + '/' + date.getFullYear();

            $scope.selectedDate = dateToSet;
            $timeout(function () {
                $scope.onDatePickerChange();
            }, 0);
           
        };

        $scope.SearchReservation = function () {
            $scope.ClearAllHighlightTables();
            if ($scope.nameToSearch.length < 2)
                return;

            var tableCounter = $rootScope.mapsData[$scope.carouselIndex].tables.length;
            for (var i = 0; i < tableCounter; i++) {       
                if (typeof($rootScope.mapsData[$scope.carouselIndex].tables[i].reservations) != "undefined") {
                    var reservationsCounter = $rootScope.mapsData[$scope.carouselIndex].tables[i].reservations.length;
                    for (var j = 0; j < reservationsCounter; j++) {
                        if ($rootScope.mapsData[$scope.carouselIndex].tables[i].reservations[j].name.search($scope.nameToSearch) > -1) {
                            $rootScope.mapsData[$scope.carouselIndex].tables[i].isHighlight = true;
                            break;
                        }

                    }
                }             
            }
        };
       
        $scope.ClearAllHighlightTables = function () {
            var tableCounter = $rootScope.mapsData[$scope.carouselIndex].tables.length;
            for (var i = 0; i < tableCounter; i++) {               
                $rootScope.mapsData[$scope.carouselIndex].tables[i].isHighlight = false;
            }
        };

    }]);