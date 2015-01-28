(function () {
'use strict';

angular.module('hostess.controllers',[])
	.controller('overallController', ['$scope', '$routeParams',
    function ($scope, $routeParams) {
        
        $scope.tables = [];
        $scope.tables.push({ x: 130, y: 200, width: 100, height: 50, fill: 'blue' }, { x: 150, y: 250, width: 75, height: 75, fill: 'green' });
        var stage;
        var layer;
        $scope.createStage = function () {
            Kinetic.pixelRatio = 1;
            stage = new Kinetic.Stage({
                container: 'tablesArea',
                width: window.innerWidth,
                height: (window.innerHeight * 90) / 100
            });
            layer = new Kinetic.Layer();

            stage.add(layer);
            drawTablesArea();
        };
        $scope.createStage();
        function drawTablesArea()
        {
            //clear layer first
            for (var i = 0; i < $scope.tables.length; i++) {
                
                (function (iCopy) {
                    var rect = new Kinetic.Image({
                        x: $scope.tables[iCopy].x,
                        y: $scope.tables[iCopy].y,
                        width: $scope.tables[iCopy].width,
                        height: $scope.tables[iCopy].height,
                        fill: $scope.tables[iCopy].fill,
                        draggable: true
                    });
                    
                    rect.on('mouseup', function () {
                        //alert(i);
                        //alert("rect:" + rect.getHeight());
                        //$scope.tables[i].x = rect.getX();
                        //$scope.tables[i].y = rect.getY();
                        //rect.setHeight(180);
                    });

                    layer.add(rect);
                    // function (rectCopy) { onMouseUpFunc(iCopy, rectCopy); }(rect)
                    
                }(i));
            }
            stage.draw();
        }

        function onMouseUpFunc(i, rect)
        {//instead if i, id?
            alert(i);
            $scope.tables[i].x = rect.getX();
            $scope.tables[i].y = rect.getY();
            rect.setHeight(180);
            //assign selected id
            //$scope.selectedId = rect.getId(); uncomment after assiging ids
            //drawTablesArea();
        }

        $scope.createNewTable = function () {
            var newtable = { x: 50, y: 50, width: 75, height: 75, fill: 'blue' };
            $scope.tables.push(newtable);
            var rect = new Kinetic.Rect({
                x: newtable.x,
                y: newtable.y,
                width: newtable.width,
                height: newtable.height,
                fill: newtable.fill,
                draggable: true
            });
            layer.add(rect);
            stage.draw();
        };
    }]);
}());
