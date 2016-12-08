angular.module('hostess.directives', [])
    .directive('myDraggable', ['$document',function ($document) {
        return {
            restrict: "A",
            scope: { table: "=table", carouseldetails:"=", styledetails:"=" },
            link: function (scope, element, attr) {

                var startX = 0, startY = 0, x = 0, y = 0;//x y are percent
                
                var ulTop = document.getElementById('ulCarousel').offsetTop;
                var ulLeft = document.getElementById('ulCarousel').offsetLeft;
                
                scope.$watch('table', function (newVal) {//is necessary?
                    if (newVal)
                    {
                        x = Number(scope.table.posx);
                        y = Number(scope.table.posy);
                        element.css({
                            top: y + "%",
                            left: x + "%",
                            width: (scope.table.width) * (window.innerWidth) / 100,
                            height: (scope.table.height) * (window.innerWidth) / 100
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
                if (scope.table.shape == "circle") {
                    element.addClass('circleBase');
                }
                element.css({
                    position: 'absolute',
                    border: '1px solid black',
                    backgroundColor: 'lightgrey',
                    width: (scope.table.width) * (window.innerWidth) / 100,
                    height: (scope.table.height) * (window.innerWidth) / 100
                });

                element.on('touchstart', function (event) {//mousedown
                    //lock carousel.//make this table the selected table
             
                    scope.carouseldetails.islocked = true;
                    scope.styledetails.selectedTable = scope.table;
                    scope.$apply();
                    
                    event.preventDefault();
                    
                    if (event.originalEvent.targetTouches.length == 1) {
                        var touch = event.originalEvent.targetTouches[0];
                        
                        x = (touch.clientX - ulLeft) * 100 / (window.innerWidth);//we need to go back 2 parents to reach the ul element
                        y = (touch.clientY - ulTop) * 100 / (window.innerWidth);
                    }
                    
                    $document.on('touchmove', divmove);
                    $document.on('touchend', release);
                });
                
                function divmove(event) {
                    
                    if (event.originalEvent.targetTouches.length == 1) {
                        
                        event.preventDefault();
                        
                        var touch = event.originalEvent.targetTouches[0];
                        //alert(touch.target.offsetParent.offsetParent.offsetTop);
                        
                        x = (touch.clientX - ulLeft) * 100 / (window.innerWidth);
                        y = (touch.clientY - ulTop) * 100 / (window.innerWidth);
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
                    scope.table.posx = x;
                    scope.table.posy = y;
                    scope.carouseldetails.islocked = false;
                    scope.$apply();
                }
                
                
            }
        };
}]);