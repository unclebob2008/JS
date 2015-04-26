/* global _sgames, Phaser */

"use strict";

_sgames.Tetris2 = function() {
        var game = new Phaser.Game(250, 500, Phaser.AUTO, 'tetris2', 
            { create: create });
        var bars = [];
        bars[0] = [100, 0, 100, 75, 150, 75, 150, 50, 125, 50, 125, 0];
        var bar;
        var graphics;
        var timer;
        var delay = 1000;
        var step = 25;

        function create () {
            game.stage.backgroundColor = '#99FFCC';
            createBar();
            timer = game.time.create(false);
            timer.loop(delay, moveBar, this);
            timer.start();
        }
        
        function createBar() {
            bar = new Phaser.Polygon(bars[0]);
            graphics = game.add.graphics(0, 0);
            graphics.beginFill(0xFF33ff);
            graphics.drawPolygon(bar.points);
            graphics.endFill();
        }
        
        function canMove() {
            var minMax = getMinMax();
            if (minMax.yMax < game.height && minMax.xMax < game.width && minMax.xMin > 0) {
                return true;
            } else return false;
        }
        
        function getMinMax() {
            var x = [];
            var y = [];
            for (var i=0; i < bar.points.length; i++) {
                x[i] = bar.points[i].x;
                y[i] = bar.points[i].y;
            }
            var xMax = Math.max.apply(Math, x);
            var xMin = Math.min.apply(Math, x);
            var yMax = Math.max.apply(Math, y);
            return {
                xMax: xMax,
                xMin: xMin,
                yMax: yMax
            };
        }
        
        function moveBar() {
            if (canMove()) {
                for (var i=0; i < bar.points.length; i++) {
                    graphics.beginFill(0x99FFCC);
                    graphics.drawPolygon(bar.points);
                    graphics.endFill();
                    bar.points[i].y += step;
                    graphics.beginFill(0xFF33ff);
                    graphics.drawPolygon(bar.points);
                    graphics.endFill();
                }
            } else createBar();
        }
};

_sgames.tetris2 = new _sgames.Tetris2();
