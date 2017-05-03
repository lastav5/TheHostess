angular.module('hostess.directives')
    .directive('reservationsList', ['$document', function ($document) {
        return {
            restrict: "E",
            scope: { reservationList: "=reservationList" },
            templateUrl: 'scripts/src/views/reservationsOfTable.html',
            link: function (scope, element, attr) {
                
            }
        }
    }]);