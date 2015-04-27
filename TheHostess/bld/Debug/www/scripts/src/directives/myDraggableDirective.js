angular.module('hostess.directives', [])
    .directive('myDraggable', ['$document',function ($document) {
        return {
            restrict: "A",
            scope: { table: "=table", carouseldetails:"=" },
            link: function (scope, element, attr) {

                var startX = 0, startY = 0, x = 0, y = 0;//x y are px
                
                scope.$watch('table', function (newVal) {//is necessary?
                    if (newVal)
                    {
                        x = Number(scope.table.posX);
                        y = Number(scope.table.posY);
                        element.css({
                            top: y + "%",
                            left: x+"%"
                        });
                    }
                }, true);
                
                function objToString(obj) {
                    var str = '';
                    for (var p in obj) {
                        if (obj.hasOwnProperty(p)) {
                            str += p + '::' + obj[p] + '\n';
                        }
                    }
                    return str;
                }
                element.css({
                    position: 'absolute',
                    border: '1px solid black',
                    backgroundColor: 'lightgrey',
                    width: (scope.table.width) * (window.innerWidth) / 100,
                    height: (scope.table.height) * (window.innerWidth) / 100
                });

                element.on('touchstart', function (event) {//mousedown
                    //lock carousel
                    scope.carouseldetails.islocked = true;
                    scope.$apply();
                    alert(objToString(event.originalEvent.targetTouches[0]).target.offsetParent);
                    event.preventDefault();
                    
                    if (event.originalEvent.targetTouches.length == 1) {
                        var touch = event.originalEvent.targetTouches[0];
                        
                        x = touch.clientX * 100 / (window.innerWidth);//touch.clientX
                        y = touch.clientY * 100 / (window.innerWidth);
                    }
                    
                    $document.on('touchmove', divmove);
                    $document.on('touchend', release);
                });
                
                function divmove(event) {
                    
                    if (event.originalEvent.targetTouches.length == 1) {//if mobile
                        
                        event.preventDefault();
                        
                        var touch = event.originalEvent.targetTouches[0];
                        x = touch.clientX * 100 / (window.innerWidth);
                        y = touch.clientY * 100 / (window.innerWidth);
                        //attr.x = x;
                        element.css({
                            top: y+"%",
                            left: x+"%"
                        });
                    }
                    
                }
                //change to document.addevent...
                //check ngdraggable again for solution for absolute/relative
                function release() {
                    $document.off('touchmove', divmove);
                    $document.off('touchend', release);
                    scope.table.posX = x;
                    scope.table.posY = y;
                    scope.carouseldetails.islocked = false;
                    scope.$apply();
                }
                
                
            }
        };
}]);