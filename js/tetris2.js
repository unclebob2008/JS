/* global _sgames, Phaser */

"use strict";

_sgames.TetrisShapes = function() {
    
    var bars = [
        [
            [0,0,1],
            [1,1,1],
            [0,0,0]
        ],
        [
            [1,0,0],
            [1,1,1],
            [0,0,0]
        ],
        [
            [0,1,1],
            [1,1,0],
            [0,0,0]
        ],
        [
            [1,1,0],
            [0,1,1],
            [0,0,0]
        ],
        [
            [0,1,0],
            [1,1,1],
            [0,0,0]
        ],
        [
            [1,1],
            [1,1]
        ],
        [
            [0,0,0,0],
            [1,1,1,1],
            [0,0,0,0],
            [0,0,0,0]
        ]

    ];
    
    var colors = [
        0xFF0000, // red
        0xFF3300, // orange
        0xFFCC00, // yellow
        0x009900, // green
        0x00CCFF ,// cyan
        0x3399FF ,// blue
        0xCC00FF //violet
    ];

    this.getRand = function () {
        return {
            shape: bars[Math.floor(Math.random() * bars.length)],
            topLeft: {x: 3, y: 0},
            color: colors[Math.floor(Math.random() * colors.length)]
            };
    };
    
};

_sgames.TetrisGlass = function(width, height) {
    
    var glass = [];
    for (var row = 0; row < height; row++) {
        glass[row] = [];
        for (var col = 0; col < width; col++) {
            glass[row][col] = 0;
        }
    }
    return glass;
};


_sgames.Tetris2 = function() {
    var game = new Phaser.Game(250, 500, Phaser.AUTO, 'tetris2', 
        { create: create, update: update, render:render });
    var bar;
    var graphics;
    var timer;
    var cursors;
    var color;
    var stopedBar;
    var delay;
    var step = 25;
    var bars;
    var glass;
    var score;
    var level;

    function create () {
        bars = new _sgames.TetrisShapes();
        glass = new _sgames.TetrisGlass(10, 20);
        stopedBar = [];
        delay = 1000;
        score = 0;
        level = 1;
        graphics = game.add.graphics(0, 0);
        game.stage.backgroundColor = '#99FFCC';
        cursors = game.input.keyboard.createCursorKeys();
        timer = game.time.events.loop(delay, fallBar, this);
        timer.timer.running = false;
    }
    
    this.startGame = function() {
        game.time.events.remove(timer);
        graphics.clear();
        create();
        createBar();
        timer.timer.running = true;
    };
    
    this.pauseGame = function() {
        timer.timer.paused = !timer.timer.paused;
        $("#butPause").text("Пауза");
        if (timer.timer.paused) $("#butPause").text("Продолжить");
     } 

    function createBar() {
        timer.delay = delay;
        bar = bars.getRand();
        color = bar.color;
        drawBar(color, bar);
    }
    
    function canMove(pX, mX, pY, test) {
        for (var y = 0; y < test.shape.length; y++) {
            for (var x = 0; x < test.shape[y].length; x++) {
                if (test.shape[y][x] !== 0) {
                    if (pY) {
                        if (test.topLeft.y + y >= glass.length - 1 ||
                            glass[bar.topLeft.y + y + 1][test.topLeft.x + x] === 1) return false;
                    }
                    if (pX) {
                        if (test.topLeft.x + x >= glass[y].length - 1 ||
                            glass[test.topLeft.y + y][test.topLeft.x + x + 1] === 1) return false;
                    }
                    if (mX) {
                        if (test.topLeft.x + x <= 0 ||
                            glass[test.topLeft.y + y][test.topLeft.x + x - 1] === 1) return false;
                    }
                }
            }
        }
        return true;
    }

    function drawBar(color, bar) {
        for (var y = 0; y < bar.shape.length; y++) {
            for (var x = 0; x < bar.shape[y].length; x++) {
                if (bar.shape[y][x] !== 0) {
                    graphics.beginFill(color);
                    graphics.drawRect((bar.topLeft.x + x)*step, 
                        (bar.topLeft.y + y)*step, step, step);
                    graphics.endFill();
                }
            }
        }
    }
    
    function moveBar(dx, dy, bar) {
        drawBar(0x99FFCC, bar);
        bar.topLeft.x += dx;
        bar.topLeft.y += dy;
        drawBar(bar.color, bar);
    }

    function fallBar() {
        if (canMove(0, 0, 1, bar)) {
            moveBar(0, 1, bar);
        } else {
            fillGlass();
            stopedBar.push(bar);
            var fullLines = checkLastLines();
            if (fullLines) {
                clearLayer(fullLines);
                scoreCount(fullLines);
            }
            if (checkLine0()) {
                timer.timer.running = false;
            } else {
                createBar();
            } 

        }
    }
    
    function fillGlass() {
        for (var y = 0; y < bar.shape.length; y++) {
            for (var x = 0; x < bar.shape[y].length; x++) {
                if (bar.shape[y][x] !== 0) {
                    glass[bar.topLeft.y + y][bar.topLeft.x + x] = 1;
                }
            }
        }
    }
    
    function clearLayer(fL) {
        for (var y = 19; y > (19 - fL); y--) {
            glass.pop();
            glass.unshift([0,0,0,0,0,0,0,0,0,0]);
        }
        for (var i = 0; i < stopedBar.length; i++) {
            moveBar(0, fL, stopedBar[i]);
        }
    }
    
    function checkLine0() {
        for (var x = 0; x < glass[0].length; x++) {
            if (glass[0][x] === 1) return true;
        }
    }
    
    function checkLastLines() {
        var count = 0;
        for (var y = 19; y > 15; y--) {
            for (var x = 0; x < glass[y].length; x++) {
                if (glass[y][x] === 0) return count;
            }
            count++;
        }
        return count;
    }
    
    function rotateBar() {
        var tmp = [];
        for (var y = 0; y < bar.shape.length; y++) {
            tmp[y] = [];
        }
        for (var y = 0; y < bar.shape.length; y++) {
            for (var x = 0; x < bar.shape[y].length; x++) {
                tmp[bar.shape.length - 1 - x][y] = 
                        bar.shape[y][x];
            }
        }
        if (canMove(1, 1, 1, bar)) bar.shape = tmp;
    }
    
    function scoreCount(fL) {
        var addScr = 0;
        switch(fL) {
            case 1:
                addScr = 10;
                break;
            case 2:
                addScr = 30;
                break;
            case 3:
                addScr = 60;
                break;
            case 4:
                addScr = 100;
                break;
        }
        score += addScr;
        $("#score").text('Счёт: ' + score);
        if (score >= 100 && score < 200) level = 2;
        if (score >= 200 && score < 300) level = 3;
        if (score >= 300 && score < 400) level = 4;
        if (score >= 400 && score < 500) level = 5;
        if (score >= 500 && score < 600) level = 6;
        $("#level").text('Уровень: ' + level);
        delay = 1000 - (100 * (level - 1));
    };
    
    function update() {
        if (cursors.up.isDown && !cursors.up.repeats) {
            drawBar(0x99FFCC, bar);
            rotateBar();
            drawBar(color, bar);
        }
        if (cursors.down.isDown && !cursors.down.repeats) {
            timer.delay = 10;
        }
        if (cursors.left.isDown && !cursors.left.repeats && 
                canMove(0, 1, 0, bar)) {
            moveBar(-1, 0, bar);
        }
        if (cursors.right.isDown && !cursors.right.repeats && 
                canMove(1, 0, 0, bar)) {
            moveBar(1, 0, bar);
        }
    }
    
    function render() {

    // Camera
//    game.debug.cameraInfo(game.camera, 32, 32);

}
};

_sgames.tetris2 = new _sgames.Tetris2();
