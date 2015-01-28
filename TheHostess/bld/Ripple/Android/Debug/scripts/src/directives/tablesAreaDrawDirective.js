angular.module('hostess.directives',[])
    .directive("tablesareadraw", function () {
        return function ($scope, element) {

            //get objects from database and draw entire area
            //var tables = [{ tableId: '1', tableX: '25', tableY: '25', tableWidth: '50px', tableHeight: '50px' }];
            //var stage = new Kinetic.Stage({
            //    container: 'tablesArea',
            //    width: window.innerWidth,
            //    height: (window.innerHeight*90)/100
            //});
            //var rect = new Kinetic.Rect({
            //    x: 50,
            //    y: 50,
            //    width: 75,
            //    height: 75,
            //    fill: 'green',
            //    draggable: true
            //});

            //var layer = new Kinetic.Layer();
            //layer.add(rect);
            //stage.add(layer);
            //on mouse up check if hit. if so set scope.selectedid
        };
    });