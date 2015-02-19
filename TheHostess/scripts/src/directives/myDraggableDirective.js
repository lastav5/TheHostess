angular.module('hostess.directives', [])
    .directive('myDraggable', ['$document',function ($document) {
        return {
            restrict: "A",
            scope: { table: "=curTable" },
            link: function (scope, element, attr) {

                var startX = 0, startY = 0, x = 0, y = 0;
                //$q.when(scope.table).then(function (table) {
                //    alert(scope.table);
                //    x = Number(scope.table.posX);
                //    y = Number(scope.table.posY);
                //    element.css({
                //        top: y + 'px',
                //        left: x + 'px'
                //    });
                //});
                x = Number(scope.table.posX);
                y = Number(scope.table.posY);
                element.css({
                    top: y + 'px',
                    left: x + 'px'
                });
                //scope.$watch('table', function (newVal) {
                //    if (newVal)
                //    {
                //        alert(scope.table);
                //        x = Number(scope.table.posX);
                //        y = Number(scope.table.posY);
                //        element.css({
                //            top: y + 'px',
                //            left: x + 'px'
                //        });
                //    }
                //}, true);
                
                element.css({
                    position: 'relative',
                    border: '1px solid red',
                    backgroundColor: 'lightgrey',
                    cursor: 'pointer'
                });

                element.on('mousedown', function (event) {
                    // Prevent default dragging of selected content
                    event.preventDefault();
                    startX = event.pageX - x;
                    startY = event.pageY - y;
                    $document.on('mousemove', mousemove);
                    $document.on('mouseup', mouseup);
                });

                function mousemove(event) {
                    y = event.pageY - startY;
                    x = event.pageX - startX;
                    attr.x = x;
                    element.css({
                        top: y + 'px',
                        left: x + 'px'
                    });
                }

                function mouseup() {
                    $document.off('mousemove', mousemove);
                    $document.off('mouseup', mouseup);
                    //scope.table.posX = x;
                    //scope.table.posY = y;
                }

            }
        };
}]);