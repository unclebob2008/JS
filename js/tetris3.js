/* global _sgames, Phaser */

"use strict";

_sgames.Tetris3 = function() {
    var game = new Phaser.Game(250, 500, Phaser.AUTO, 'tetris2', 
        { create: create, update: update,  render: render });
    var bars = [
        [100, 0, 100, 25, 100, 50, 125, 25], //T
        [100, 0, 100, 25, 100, 50, 125, 50], //L-right
        [100, 0, 100, 25, 100, 50, 75, 50], //L-left
        [100, 0, 100, 25, 100, 50, 100, 75], //I
        [100, 0, 125, 0, 100, 25, 125, 25], //cube
        [100, 0, 100, 25, 125, 25, 125, 50], //S-left
        [100, 0, 100, 25, 75, 25, 75, 50] //S-right
    ];
    
    var display = true;
    
    var bar;
    var stopedBar;
    var graphics;
//    var loopTimer;
    var cursors;
    var color;
    var delay;
    var step = 25;
    var numb = 4;
    var colors = [
        '#FF0000', // red
        '#FF3300', // orange
        '#FFCC00', // yellow
        '#009900', // green
        '#00CCFF', // cyan
        '#3399FF', // blue
        '#CC00FF' //violet
    ];

    function create () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        bar = [];
        stopedBar = [];
        delay = 1000;
        graphics = game.add.graphics(0, 0);
        game.stage.backgroundColor = '#99FFCC';
        cursors = game.input.keyboard.createCursorKeys();
//        loopTimer = game.time.events.loop(delay, fallBar, this);
        createBar();
    }
    
    function createBar() {
//        loopTimer.delay = delay;
        var barInd = Math.floor(Math.random() * bars.length);
        color = Phaser.ArrayUtils.getRandomItem(colors);
//        color = colors[Math.floor(Math.random() * colors.length)];
//        for (var i = 0; i < numb; i++) {
//            bar[i] = new Phaser.Rectangle(bars[barInd][(i * 2)], 
//                 bars[barInd][((i * 2) + 1)], step, step);
//        }
        var bmd = game.add.bitmapData(50, 50);
        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, 50, 50);
        bmd.ctx.fillStyle = color;
        bmd.ctx.fill();
        bar.push(game.add.sprite(100, 0, bmd));
//        game.physics.p2.gravity.y = 0;
        game.physics.arcade.enable(bar);
        bar[bar.length - 1].body.collideWorldBounds = true;
//        console.log(game.physics.arcade);
//        sprite.gravity = 0;
//     	sprite.body.setZeroDamping();
//	sprite.body.fixedRotation = true;
        bar[bar.length - 1].body.velocity.y = 50;
    }
    
//    function isCollide(xPlus, xMinus) {
//        for (var j = 0; j < stopedBar.length; j++) {
//            for (var i = 0; i < numb; i++) {
//                if (bar[i].x - step * xMinus < stopedBar[j].x + step &&
//                    bar[i].x + step + step * xPlus > stopedBar[j].x &&
//                    bar[i].y <= stopedBar[j].y + step &&
//                    bar[i].y + step >= stopedBar[j].y) return true;
//            }
//        }
//        return false;
//    }
        
//    function canMove(x, y, dir) {
//        var minMax = getMinMax();
//        if (y) {
//            if (minMax.yMax >= game.height) return false;
//            if (isCollide(0, 0)) return false;
//        }
//        if (x && dir) {
//            if (minMax.xMax >= game.width) return false;
//            if (isCollide(1, 0)) return false;
//        }
//        if (x && !dir) {
//            if (minMax.xMin <= 0) return false;
//            if (isCollide(0, 1)) return false;
//        }
//        return true;
//    }

//    function getMinMax() {
//        var x = [];
//        var y = [];
//        for (var i=0; i < numb; i++) {
//            x[i] = bar[i].x;
//            y[i] = bar[i].y;
//        }
//        var xMax = Math.max.apply(Math, x);
//        var xMin = Math.min.apply(Math, x);
//        var yMax = Math.max.apply(Math, y);
//        return {
//            xMax: xMax + step,
//            xMin: xMin,
//            yMax: yMax + step
//        };
//    }

//    function drawBar(color) {
//        for (var i=0; i < numb; i++) {
//            graphics.beginFill(color);
//            graphics.drawRect(bar[i].x, bar[i].y, step, step);
//            graphics.endFill();
//        }
//    }
    
//    function moveBar(x, y, dir) {
//        drawBar(0x99FFCC);
//        var stepX = x ? step : 0;
//        var stepY = y ? step : 0;
//        stepX = dir ? stepX : -stepX;
//        for (var i=0; i < numb; i++) {
//            bar[i].x += stepX;
//            bar[i].y += stepY;
//        }
//        drawBar(color);
//    }

 //   function fallBar() {
//        console.log(sprite);
//        sprite.y += step;
//            if (canMove(false, true)) {
//                moveBar(false, true, true);
//            } else {
//                for (var i=0; i < numb; i++) {
//                    stopedBar.push(bar[i]);
//                }
//                createBar();
//            }
//    }
    
//    function rotateBar() {
//        for (var i=0; i < numb; i++) {
//            tmp[numb - 1 - bar[i].x][y] = 
//                    bar.shape[y][x];
//        }
//        if (canMove(1, 1, 1, bar)) bar.shape = tmp;
//    }

    
    function update() {
        if (bar[bar.length - 1].body.onFloor() || 
                game.physics.arcade.collide(bar[bar.length - 1], bar)) {
            bar[bar.length - 1].body.velocity.y = 0;
            createBar();
 //           console.log(sprite.body);
        }
//        if (display && bar.length === 2) {
//            display = false;
//            console.log(bar);
//        }
//        if (cursors.up.isDown && !cursors.up.repeats) {
//            moveBar(false, true, true);
//        }
//        if (cursors.down.isDown && !cursors.down.repeats) {
//            loopTimer.delay = 10;
//        }
//        if (cursors.left.isDown && !cursors.left.repeats && 
//                canMove(true, false, false)) {
//            moveBar(true, false, false);
//        }
//        if (cursors.right.isDown && !cursors.right.repeats && 
//                canMove(true, false, true)) {
//            moveBar(true, false, true);
//        }
    }
    
    function render() {
//        game.debug.bodyInfo(sprite);
//        game.debug.body(bar);
    }
};

_sgames.tetris3 = new _sgames.Tetris3();
