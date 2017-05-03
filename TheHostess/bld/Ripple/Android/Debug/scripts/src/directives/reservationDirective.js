angular.module('hostess.directives')
    .directive('reservation', ['$document', function ($document) {
        return {
            restrict: "E",
            scope: { res: "=reservation" },
            templateUrl: 'scripts/src/views/reservationItem.html',
            link: function (scope, element, attr) {
                scope.isEditing = false;

                function editReservation(res) {
                    //on edit we save the original reservation object to be able to recover its values in case of cancellation
                    scope.resBackup = angular.copy(res);
                    scope.isEditing = true;
                }

                function updateReservation(res) {
                    //update in db - and THEN scope.isEditing = false, 
                    //get update function from controller via directive scope binding and then execute it here
                }

                function cancelEdit(res) {
                    //update res with the original values (resBackup) 
                    angular.forEach(res, function (value, key) {
                        if (res.hasOwnProperty(key)) {
                            res[key] = scope.resBackup[key];
                        }
                    });
                    scope.isEditing = false;
                }
            }
        }
    }]);