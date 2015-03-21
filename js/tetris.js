"use strict";

_sgames.Tetris = function() {
    
    var bars = [];
    bars[0] = ["0_4","0_5","1_4","1_5"]; //куб
    bars[1] = ["0_3","0_4","0_5","0_6"]; //---> 2
    bars[2] = ["0_5","1_5","2_5","3_5"]; //---> 1
    bars[3] = ["0_4","0_5","1_4","2_4"]; //---> 7
    bars[4] = ["0_4","0_5","1_5","2_5"]; //---> 8 
    bars[5] = ["0_3","1_3","1_4","1_5"]; //---> 3
    bars[6] = ["0_4","0_5","0_6","1_4"]; //---> 4
    bars[7] = ["0_3","0_4","0_5","1_5"]; //---> 10
    bars[8] = ["1_4","1_5","1_6","0_6"]; //---> 9
    bars[9] = ["0_5","1_5","2_5","2_6"]; //---> 6
    bars[10] = ["0_5","1_5","2_5","2_4"]; //---> 5
    bars[11] = ["0_5","1_5","1_6","2_6"]; //---> 14
    bars[12] = ["0_5","1_5","1_4","2_4"]; //---> 13
    bars[13] = ["0_4","0_5","1_5","1_6"]; //---> 12
    bars[14] = ["1_4","1_5","0_5","0_6"]; //---> 11
    
    var blockColors = ["red", "orange", "yellow", "green", "blue", "violet", "pink"];
    
    var yPos = [];
    var xPos = [];
    var table = {};
    var delay = 1000;
    var timer;
    var colCur = "";
    var barInd = 0;
    var xDelta = 0;
    
    this.pauseGame = function() {
        $("#butPause").attr("onclick", "tetris.resumeGame();").text("Resume game");
        clearInterval(timer);
    };
    
    this.resumeGame = function() {
        $("#butPause").attr("onclick", "tetris.pauseGame();").text("Pause game");
        fallingBlock();
    };
    
    this.setGlass = function() {
        $("#div01").empty();
        var butStart = '<button id="butStart" onclick="tetris.startGame();">Start game</button>';
        var butPause = '<button id="butPause" onclick="tetris.pauseGame();">Pause game</button>';
        var top = 50;
        var glass  = document.createElement('div');
        glass.id = "div03";
        for (var i = 0; i < 20; i++) {
            var left = 100;
            for (var j = 0; j < 10; j++) {
                var block = document.createElement('div');
                block.style.top = top + "px";
                block.style.left = left +"px";
                block.className = "block";
                block.id = i + "_" + j;
                table[block.id] = 0;
                glass.appendChild(block);
                left += 30
            }
            top += 26
        }
        $("#div01").append(butStart, butPause, glass);
        pressedKey();
        if (timer !== undefined) {
            clearInterval(timer);
            tetris.startGame();
        }
    };
    
    this.startGame = function() {
        $("#butStart").attr("onclick", "tetris.setGlass();");
        barInd = Math.floor(Math.random() * 14);
        colCur = blockColors[Math.floor(Math.random() * 6)];
        for (var i = 0; i < 4; i++) {
            var id = bars[barInd][i].split("_");
            yPos[i] = Number(id[0]);
            xPos[i] = Number(id[1]);
        }
        if (canMoveBlock(yPos, xPos, 0, 0)) {
            drawBlock(0, 0);
            fallingBlock();
        } else {
            $("#div03").prepend("Game over");
        }
    };
    
    var getRotatedBlock = function(index) {
        var yP = [], xP = [];
        var yMax = 0, xMax = 0, xMin = 0;
        yMax = Math.max.apply(Math, yPos);
        for (var i = 0; i < 4; i++) {
            var id = bars[index][i].split("_");
            yP[i] = Number(id[0]) + Number(yMax) - 1;
            xP[i] = Number(id[1]) + Number(xDelta);
        }
        yMax = Math.max.apply(Math, yP);
        xMax = Math.max.apply(Math, xP);
        xMin = Math.min.apply(Math, xP);
        if (yMax < 20 && xMax < 10 && xMin >= 0 && (canMoveBlock(yP, xP, 0, 0))) {
            eraseBlock();
            yPos = yP;
            xPos = xP;
            drawBlock(0, 0);
            barInd = index;
        }
    };
    
    var rotateBlock = function() {
        switch (barInd) {
            case 1:
                getRotatedBlock(2);
                break;
            case 2:
                getRotatedBlock(1);
                break;
            case 3:
                getRotatedBlock(7);
                break;
            case 4:
                getRotatedBlock(8);
                break;
            case 5:
                getRotatedBlock(3);
                break;
            case 6:
                getRotatedBlock(4);
                break;
            case 7:
                getRotatedBlock(10);
                break;
            case 8:
                getRotatedBlock(9);
                break;
            case 9:
                getRotatedBlock(6);
                break;
            case 10:
                getRotatedBlock(5);
                break;
            case 11:
                getRotatedBlock(14);
                break;
            case 12:
                getRotatedBlock(13);
                break;
            case 13:
                getRotatedBlock(12);
                break;
            case 14:
                getRotatedBlock(11);
                break;
        }
    };
    
    var drawBlock = function(yD, xD) {
        for (var i = 0; i < 4; i++) {
            yPos[i] = yPos[i] + yD;
            xPos[i] = xPos[i] + xD;
            $("#" + yPos[i] + "_" + xPos[i]).css("background-color", colCur);
        }
    };

    var eraseBlock = function() {
        for (var i = 0; i < 4; i++) {
            $("#" + yPos[i] + "_" + xPos[i]).css("background-color", "");
        }
    };
    
    var fallingBlock = function() { 
        timer = setInterval(fallBlock, delay);
        function fallBlock() {
            eraseBlock();
            drawBlock(1, 0);
            var yMax = Math.max.apply(Math, yPos);
            if (yMax == 19 || !canMoveBlock(yPos, xPos, 1, 0)) {
                clearInterval(timer);
                stopedBlock();
                tetris.startGame();
            }
        }
    };
    
    var canMoveBlock = function(yP, xP, yD, xD) {
        for (var i = 0; i < 4; i++) {
            if (table[(yP[i] + yD) + "_" + (xP[i] + xD)] == 1) {
                 return false;
             }
        }
        return true;
    };
    
    var stopedBlock = function() {
        for (var i = 0; i < 4; i++) {
            table[yPos[i] + "_" + xPos[i]] = 1;
        }
        xDelta = 0;
    };
    
    var moveLeft = function() {
        var xMin = Math.min.apply(Math, xPos);
        if ((xMin - 1) >= 0 && canMoveBlock(yPos, xPos, 0, -1)) {
            eraseBlock();
            drawBlock(0, -1);
            xDelta--;
        }
    };
    
    var moveRight = function() {
        var xMax = Math.max.apply(Math, xPos);
        if ((xMax + 1) < 10 && canMoveBlock(yPos, xPos, 0, 1)) {
            eraseBlock();
            drawBlock(0, 1);
            xDelta++;
        }
    };
    
    var pressedKey = function() {
        window.onkeydown = function(pKey) {
            if(pKey.which == 65) moveLeft();
            if(pKey.which == 87) rotateBlock();
            if(pKey.which == 68) moveRight();
            if(pKey.which == 83) console.log('drop');
        };
    }
};

var tetris = new _sgames.Tetris();
