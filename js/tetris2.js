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
        var rand = Math.floor(Math.random() * bars.length);
        return {
            shape: bars[rand],
            topLeft: {x: 3, y: 0},
            color: colors[rand]
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
        { create: create, update: update });
    var bar;
    var graphics;
    var timer;
    var loopTimer;
    var cursors;
    var color;
    var delay = 1000;
    var step = 25;
    var bars = new _sgames.TetrisShapes();
    var glass = new _sgames.TetrisGlass(10, 20);

    function create () {
        graphics = game.add.graphics(0, 0);
        game.stage.backgroundColor = '#99FFCC';
        cursors = game.input.keyboard.createCursorKeys();
        timer = game.time.create(false);
        loopTimer = game.time.events.loop(delay, fallBar, this);
        createBar();
        timer.start();
    }

    function createBar() {
        loopTimer.delay = 1000;
        bar = bars.getRand();
        color = bar.color;
        drawBar(color);
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

    function drawBar(color) {
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
    
    function moveBar(dx, dy) {
        drawBar(0x99FFCC);
        bar.topLeft.x += dx;
        bar.topLeft.y += dy;
        drawBar(color);
    }

    function fallBar() {
        if (canMove(0, 0, 1, bar)) {
            moveBar(0, 1);
        } else {
            for (var y = 0; y < bar.shape.length; y++) {
                for (var x = 0; x < bar.shape[y].length; x++) {
                    if (bar.shape[y][x] !== 0) {
                        glass[bar.topLeft.y + y][bar.topLeft.x + x] = 1;
                    }
                }
            }
            createBar();
        }
    }
    
    function rotateBar() {
        var tmp = [];
        for (var y = 0; y < bar.shape.length; y++) {
            tmp[y] = [];
            for (var x = 0; x < bar.shape[y].length; x++) {
                tmp[y][x] = 0;
            }
        }
        for (var y = 0; y < bar.shape.length; y++) {
            for (var x = 0; x < bar.shape[y].length; x++) {
                tmp[bar.shape.length - 1 - x][y] = 
                        bar.shape[y][x];
            }
        }
        if (canMove(1, 1, 1, bar)) bar.shape = tmp;
    }
    
    function update() {
        if (cursors.up.isDown && !cursors.up.repeats) {
            drawBar(0x99FFCC);
            rotateBar();
            drawBar(color);
        }
        if (cursors.down.isDown && !cursors.down.repeats) {
            loopTimer.delay = 10;
        }
        if (cursors.left.isDown && !cursors.left.repeats && 
                canMove(0, 1, 0, bar)) {
            moveBar(-1, 0);
        }
        if (cursors.right.isDown && !cursors.right.repeats && 
                canMove(1, 0, 0, bar)) {
            moveBar(1, 0);
        }
    }
};

_sgames.tetris2 = new _sgames.Tetris2();
