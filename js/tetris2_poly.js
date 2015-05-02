/* global _sgames, Phaser */

"use strict";

_sgames.Tetris2 = function() {
    var game = new Phaser.Game(250, 500, Phaser.AUTO, 'tetris2', 
        { create: create, update: update });
    var bars = [];
    bars[0] = [100, 0, 100, 75, 125, 75, 125, 50, 150, 50, 150, 25, 125, 25, 125, 0];
    var bar;
    var stopedBar = [];
    var graphics;
    var timer;
    var loopTimer;
//    var upKey;
//    var downKey;
//    var leftKey;
//    var rightKey;
    var cursors;
    var delay = 1000;
    var step = 25;
    var numb = 4;

    function create () {
        graphics = game.add.graphics(0, 0);
        game.stage.backgroundColor = '#99FFCC';
        cursors = game.input.keyboard.createCursorKeys();
//        upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
//        downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
//        leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
//        rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        timer = game.time.create(false);
        loopTimer = game.time.events.loop(delay, fallBar, this);
        createBar();
        timer.start();
    }

    function createBar() {
        loopTimer.delay = 1000;
        bar = new Phaser.Polygon(bars[0]); 
        drawBar(0xFF33ff, bar);
    }
    
    function isCollide(xPlus, xMinus) {
        for (var j = 0; j < stopedBar.length; j++) {
            if (bar[i].x - step * xMinus < stopedBar[j].x + step &&
                bar[i].x + step + step * xPlus > stopedBar[j].x &&
                bar[i].y <= stopedBar[j].y + step &&
                bar[i].y + step >= stopedBar[j].y) return true;
        }
        return false;
    }
        
    function canMove(x, y, dir) {
        var minMax = getMinMax();
        if (y) {
            if (minMax.yMax >= game.height) return false;
            if (isCollide(0, 0)) return false;
        }
        if (x && dir) {
            if (minMax.xMax >= game.width) return false;
            if (isCollide(1, 0)) return false;
        }
        if (x && !dir) {
            if (minMax.xMin <= 0) return false;
            if (isCollide(0, 1)) return false;
        }
        return true;
    }

    function getMinMax() {
        var x = [];
        var y = [];
        for (var i=0; i < bar.points.length; i++) {
            x[i] = bar.points[i].x;
            y[i] = bar.points[i].y;
        }
        return {
            xMax: Math.max.apply(Math, x),
            xMin: Math.min.apply(Math, x),
            yMax: Math.max.apply(Math, y),
            yMin: Math.min.apply(Math, y)
        };
    }

    function drawBar(color, poly) {
        graphics.beginFill(color);
        graphics.drawPolygon(bar.points);
        graphics.endFill();
    }
    
    function moveBar(x, y, dir) {
        drawBar(0x99FFCC, bar);
        var stepX = x ? step : 0;
        var stepY = y ? step : 0;
        stepX = dir ? stepX : -stepX;
        for (var i = 0; i < points.length; i++) {
            points[i].x += stepX;
            points[i].y += stepY;
        }
        bar.setTo(points);
        drawBar(0xFF33ff, bar);
    }

    function fallBar() {
            if (canMove(false, true)) {
                moveBar(false, true, true);
            } else {
                stopedBar.push(bar);
                createBar();
            }
    }
    
    function update() {
        if (cursors.up.isDown && !cursors.up.repeats) {
//            moveBar(false, true, true);
        }
        if (cursors.down.isDown && !cursors.down.repeats) {
            loopTimer.delay = 10;
        }
        if (cursors.left.isDown && !cursors.left.repeats && 
                canMove(true, false, false)) {
            moveBar(true, false, false);
        }
        if (cursors.right.isDown && !cursors.right.repeats && 
                canMove(true, false, true)) {
            moveBar(true, false, true);
        }
    }
};

_sgames.tetris2 = new _sgames.Tetris2();
