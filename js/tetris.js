"use strict";

_sgames.Tetris = function() {
    
    var bars = [];
    bars[0] = ["0_4","0_5","1_4","1_5"];
    bars[1] = ["0_3","0_4","0_5","0_6"];
    bars[2] = ["0_5","1_5","2_5","3_5"];
    bars[3] = ["0_4","0_5","1_4","2_4"];
    bars[4] = ["0_4","0_5","1_5","2_5"];
    bars[5] = ["0_3","1_3","1_4","1_5"];
    bars[6] = ["0_4","0_5","0_6","1_4"];
    bars[7] = ["0_3","0_4","0_5","1_5"];
    bars[8] = ["1_4","1_5","1_6","0_6"];
    bars[9] = ["0_5","1_5","2_5","2_6"];
    bars[10] = ["0_5","1_5","2_5","2_4"];
    bars[11] = ["0_5","1_5","1_6","2_6"];
    bars[12] = ["0_5","1_5","1_4","2_4"];
    bars[13] = ["0_4","0_5","1_5","1_6"];
    bars[14] = ["1_4","1_5","0_5","0_6"];
    
    var blockColors = ["red", "orange", "yellow", "green", "blue", "violet"];
    
    var yPos = [];
    var xPos = [];
    var table = {};
    var delay = 0;
    var timer;
    var colCur = "";
    
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
    };
    
    var getNewBlock = function() {
        var barCur = bars[Math.floor((Math.random() * 14))];
        colCur = blockColors[Math.floor((Math.random() * 5))];
        console.log(colCur);
        for (var i = 0; i < 4; i++) {
            var id = barCur[i].split("_");
            yPos[i] = Number(id[0]);
            xPos[i] = Number(id[1]);
            $("#" + barCur[i]).css("background-color", colCur);
            table[barCur[i]] = 1;
        }
    };
    
    this.pauseGame = function() {
        $("#butPause").attr("onclick", "tetris.resumeGame();").text("Resume game");
        clearInterval(timer);
    };
    
    this.resumeGame = function() {
        $("#butPause").attr("onclick", "tetris.pauseGame();").text("Pause game");
        fallingBlock();
    };
    
    this.startGame = function() {
        getNewBlock();
        delay = 1000;
        fallingBlock();
    };
    
    var fallingBlock = function() { 
        timer = setInterval(fallBlock, delay);
        function fallBlock() {
            drawBlock(3);
            var yMax = Math.max.apply(Math, yPos);
            if (yMax == 19) {
                clearInterval(timer);
                tetris.startGame();
            }
        }
    };
    
    var moveLeft = function() {
        var xMin = Math.min.apply(Math, xPos);
        if ((xMin - 1) >= 0) {
            drawBlock(2);
        }
    };
    
    var moveRight = function() {
        var xMax = Math.max.apply(Math, xPos);
        if ((xMax + 1) < 10) {
            drawBlock(1);
        }
    };
    
    var drawBlock = function(dir) {
        for (var i = 0; i < 4; i++) {
             $("#" + yPos[i] + "_" + xPos[i]).css("background-color", "");
             table[yPos[i] + "_" + xPos[i]] = 0;
        }
        for (var i = 0; i < 4; i++) {
            switch (dir) {
                case 1:
                    xPos[i]++;
                    break;
                case 2:
                    xPos[i]--;
                    break;
                case 3:
                    yPos[i]++;
                    break;
            }
            $("#" + yPos[i] + "_" + xPos[i]).css("background-color", colCur);
            table[yPos[i] + "_" + xPos[i]] = 1;
         }
    };
    
    var pressedKey = function() {
        window.onkeydown = function(pKey) {
            if(pKey.which == 65) moveLeft();
            if(pKey.which == 87) console.log('rotate');
            if(pKey.which == 68) moveRight();
            if(pKey.which == 83) console.log('drop');
        };
    }
};

var tetris = new _sgames.Tetris();
