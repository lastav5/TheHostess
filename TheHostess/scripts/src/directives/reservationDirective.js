angular.module('hostess.directives')
    .directive('reservation', ['$document', function ($document) {
        return {
            restrict: "E",
            scope: { res: "=reservation" },
            templateUrl: 'scripts/src/views/reservationItem.html',
            link: function (scope, element, attr) {

            }
        }
    }]);