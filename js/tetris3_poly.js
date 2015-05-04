/* global _sgames, Phaser */

"use strict";

_sgames.Tetris3 = function() {
    var game = new Phaser.Game(250, 500, Phaser.AUTO, 'tetris2', 
        { create: create, update: update });
    var bars = [];
    bars[0] = [100, 0, 100, 75, 125, 75, 125, 50, 150, 50, 150, 25, 125, 25, 125, 0];
    var bar;
    var stopedBar;
    var graphics;
    var timer;
    var cursors;
    var delay;
    var step = 25;

    function create () {
        stopedBar = [];
        delay = 1000;
        graphics = game.add.graphics(0, 0);
        game.stage.backgroundColor = '#99FFCC';
        cursors = game.input.keyboard.createCursorKeys();
        timer = game.time.events.loop(delay, fallBar, this);
        createBar();
    }

    function createBar() {
        timer.delay = delay;
        bar = new Phaser.Polygon(bars[0]); 
        drawBar(0xFF33ff, bar);
    }
    
    function canMove(x, y, dir) {
        var temp = bar.clone();
        for (var i = 0; i < temp.points.length; i++) {
            if (y) {
                if (temp.points[i].y >= game.height) return false;
                temp.points[i].y += step*y;
            }
            if (x) {
                if (dir === 1 && temp.points[i].x >= game.width) return false;
                if (dir === -1 && temp.points[i].x <= 0) return false;
                temp.points[i].x += step*x*dir;
            }
        }
        for (var j = 0; j < stopedBar.length; j++) {
            if (temp.contains(stopedBar[j].y, stopedBar[j].x)) return false;
        }
        return true;
    }

    function drawBar(color, poly) {
        graphics.beginFill(color);
        graphics.drawPolygon(poly.points);
        graphics.endFill();
    }
    
    function moveBar(x, y, dir) {
        drawBar(0x99FFCC, bar);
        for (var i = 0; i < bar.points.length; i++) {
            bar.points[i].x += (step * x * dir);
            bar.points[i].y += (step * y);
        }
        bar.setTo(bar.points);
        drawBar(0xFF33ff, bar);
    }

    function fallBar() {
        if (canMove(0, 1, 0)) {
            moveBar(0, 1, 0);
        } else {
            for (var i = 0; i < bar.points.length; i++) {
                stopedBar.push(bar.points[i]);
            }
            createBar();
        }
    }
    
    function update() {
        if (cursors.up.isDown && !cursors.up.repeats) {
//            moveBar(false, true, true);
        }
        if (cursors.down.isDown && !cursors.down.repeats) {
            timer.delay = 10;
        }
        if (cursors.left.isDown && !cursors.left.repeats && 
                canMove(1, 0, -1)) {
            moveBar(1, 0, -1);
        }
        if (cursors.right.isDown && !cursors.right.repeats && 
                canMove(1, 0, 1)) {
            moveBar(1, 0, 1);
        }
    }
};

_sgames.tetris3 = new _sgames.Tetris3();
