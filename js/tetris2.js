/* global _sgames, Phaser */

"use strict";

_sgames.Tetris2 = function() {
    var game = new Phaser.Game(250, 500, Phaser.AUTO, 'tetris2', 
        { create: create, update: update });
    var bars = [];
    bars[0] = [100, 0, 100, 25, 100, 50, 125, 25];
    var bar = [];
    var stopedBar = [];
    var graphics;
    var timer;
    var loopTimer;
    var upKey;
    var downKey;
    var leftKey;
    var rightKey;
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
//        timer.loop(delay, fallBar, this);
        createBar();
        timer.start();
    }

    function createBar() {
        loopTimer.delay = 1000;
        for (var i = 0; i < numb; i++) {
            bar[i] = new Phaser.Rectangle(bars[0][(i * 2)], 
                 bars[0][((i * 2) + 1)], step, step);
            graphics.beginFill(0xFF33ff);
            graphics.drawRect(bar[i].x, bar[i].y, step, step);
            graphics.endFill();
        }
    }
    
    function isCollide() {
        for (var j = 0; j < stopedBar.length; j++) {
            for (var i = 0; i < numb; i++) {
                if (game.math.distance(bar[i].x, bar[i].y, 
                    stopedBar[j].x, stopedBar[j].y) <= step) return true;
            }
        }
        return false;
    }
        
    function canMove(x, y, dir) {
        var minMax = getMinMax();
        if (y) {
            if (minMax.yMax >= game.height) return false;
            if (isCollide()) return false;
        }
        if (x && dir) {
            if (minMax.xMax >= game.width) return false;
            if (isCollide()) return false;
        }
        if (x && !dir) {
            if (minMax.xMin <= 0) return false;
            if (isCollide()) return false;
        }
        return true;
    }

    function getMinMax() {
        var x = [];
        var y = [];
        for (var i=0; i < numb; i++) {
            x[i] = bar[i].x;
            y[i] = bar[i].y;
        }
        var xMax = Math.max.apply(Math, x);
        var xMin = Math.min.apply(Math, x);
        var yMax = Math.max.apply(Math, y);
        return {
            xMax: xMax + step,
            xMin: xMin,
            yMax: yMax + step
        };
    }

    function eraseBar() {
        for (var i=0; i < numb; i++) {
            graphics.beginFill(0x99FFCC);
            graphics.drawRect(bar[i].x, bar[i].y, step, step);
            graphics.endFill();
        }
    }

    function drawBar() {
        for (var i=0; i < numb; i++) {
            graphics.beginFill(0xFF33ff);
            graphics.drawRect(bar[i].x, bar[i].y, step, step);
            graphics.endFill();
        }
    }
    
    function moveBar(x, y, dir) {
        eraseBar();
        var stepX = x ? step : 0;
        var stepY = y ? step : 0;
        stepX = dir ? stepX : -stepX;
        for (var i=0; i < numb; i++) {
            bar[i].x += stepX;
            bar[i].y += stepY;
        }
        drawBar();
    }

    function fallBar() {
            if (canMove(false, true)) {
                moveBar(false, true, true);
            } else {
                for (var i=0; i < numb; i++) {
                    stopedBar.push(bar[i]);
                }
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
