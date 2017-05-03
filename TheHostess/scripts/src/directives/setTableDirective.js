angular.module('hostess.directives')
    .directive('setTable', ['$document', function ($document) {
        return {
            restrict: "A",
            scope: { table: "=table", carouseldetails: "=", styledetails: "=" },
            link: function (scope, element, attr) {

                var startX = 0, startY = 0, x = 0, y = 0;//x y are percent

                var ulTop = document.getElementById('ulCarousel').offsetTop;
                var ulLeft = document.getElementById('ulCarousel').offsetLeft;
                console.log(window.innerWidth);
                scope.$watch('table', function (newVal) {//is necessary?
                    if (newVal) {
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
                    height: (scope.table.height) * (window.innerWidth) / 100,
                    display: 'flex',
                    justifyContent: 'center',
                    fontWeight:'bold'
                });/*had window.innerWidth prev to screenWidth*/

                element.on('touchstart', function (event) {//mousedown
                    //lock carousel.//make this table the selected table

                    scope.carouseldetails.islocked = true;
                    //scope.styledetails.selectedTable = scope.table;
                    scope.$apply();

                    event.preventDefault();
                    $document.on('touchmove', divmove);
                    $document.on('touchend', release);
                });

              
                //change to document.addevent...
                //check ngdraggable again for solution for absolute/relative
                function release() {
                    $document.off('touchmove', divmove);
                    $document.off('touchend', release);
                  
                    scope.carouseldetails.islocked = false;
                    scope.$apply();
                }

                function divmove(event) {

                    if (event.originalEvent.targetTouches.length == 1) {

                        event.preventDefault();

                        var touch = event.originalEvent.targetTouches[0];
    
                    }

                }

            }
        };
    }]);