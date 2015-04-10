"use strict";

_sgames.Tetris = function() {
    
    var bars = [];
    bars[0] = ["0_4","0_5","1_4","1_5"]; //куб. В какую фигуру переходит при повороте по час. стрелке.
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
    bars[15] = ["1_4","1_5","0_5","1_6"]; //---> 16
    bars[16] = ["2_5","1_5","0_5","1_6"]; //---> 17
    bars[17] = ["0_4","1_5","0_5","0_6"]; //---> 18
    bars[18] = ["1_4","1_5","0_5","2_5"]; //---> 15
    
    var blockColors = [
        "peachpuff", //0 Номера цветов. Первый цвет - фон стакана.
        "red",  //1  
        "orange", //2
        "yellow", //3
        "green", //4
        "blue", //5
        "violet", //6
        "pink" //7
    ];
    
    var yPos = []; // Координаты Y текущей фигуры.
    var xPos = []; // Координаты X текущей фигуры.
    var table = []; // Матем. отображение стакана и остановившихся фигур.
    var delay; // Время задержки движения фигуры.
    var timer; // Таймер задержки.
    var colInd = 0; // Индекс цвета текущей фигуры.
    var barInd = 0; // Индекс текущей фигуры.
    var xDelta = 0; // Сдвиг фигуры влево-вправо от первоначального появления.
    var level = 1;
    var score = 0;
    
    this.pauseGame = function() {
        if (timer !== undefined) {
            $("#butPause").attr("onclick", "tetris.resumeGame();").text("Продолжить");
            clearInterval(timer);
        }
    };
    
    this.resumeGame = function() {
        $("#butPause").attr("onclick", "tetris.pauseGame();").text("Пауза");
        fallingBlock();
    };
    
    this.setGlass = function() {
        $("#div03").remove();
        var top = 40;
        var glass  = document.createElement('div');
        glass.id = "div03";
        for (var i = 0; i < 20; i++) {
            table[i] = [];
            var left = 100;
            for (var j = 0; j < 10; j++) {
                var block = document.createElement('div');
                block.style.top = top + "px";
                block.style.left = left +"px";
                block.style.background = blockColors[0];
                block.className = "block";
                block.id = i + "_" + j;
                table[i][j] = 0;
                glass.appendChild(block);
                left += 30
            }
            top += 26
        }
        $("#mainDiv").css("text-align", "");
        $("#mainDiv").append(glass);
        pressedKey();
        if (timer !== undefined) {
            clearInterval(timer);
            tetris.startGame();
        }
    };
    
    this.startGame = function() {
        $("#butStart").attr("onclick", "tetris.setGlass();");
        barInd = Math.floor(Math.random() * 18);
        colInd = Math.floor(Math.random() * 6) + 1;
        for (var i = 0; i < 4; i++) {
            var id = bars[barInd][i].split("_");
            yPos[i] = Number(id[0]);
            xPos[i] = Number(id[1]);
        }
        if (canMoveBlock(yPos, xPos, 0, 0)) {
            drawBlock(0, 0);
            delay = 1100 - (100 * level);  // расчёт скорости фигуры в зависимости от уровня.
            fallingBlock();
        } else {
            $("#div03").prepend("Игра окончена");
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
            case 15:
                getRotatedBlock(16);
                break;
            case 16:
                getRotatedBlock(17);
                break;
            case 17:
                getRotatedBlock(18);
                break;
            case 18:
                getRotatedBlock(15);
                break;
        }
    };
    
    var drawBlock = function(yD, xD) {
        for (var i = 0; i < 4; i++) {
            yPos[i] = yPos[i] + yD;
            xPos[i] = xPos[i] + xD;
            $("#" + yPos[i] + "_" + xPos[i]).css("background-color", blockColors[colInd]);
        }
    };

    var eraseBlock = function() {
        for (var i = 0; i < 4; i++) {
            $("#" + yPos[i] + "_" + xPos[i]).css("background-color", blockColors[0]);
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
                setTimeout(function(){
                    stopedBlock();
                    tetris.startGame();
                }, delay);
            }
        }
    };
    
    var canMoveBlock = function(yP, xP, yD, xD) {
        for (var i = 0; i < 4; i++) {
            if (table[yP[i] + yD][xP[i] + xD] > 0) {
                 return false;
             }
        }
        return true;
    };
    
    var scoreCount = function(fL) {
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
    };
    
    var stopedBlock = function() {
        var fL = 0;
        for (var i = 0; i < 4; i++) {
            table[yPos[i]][xPos[i]] = colInd;
        }
        xDelta = 0;
        fL = checkNeedClean();
        if (fL > 0) {
            clearLayer(fL);
            scoreCount(fL);
        }
    };
    
    var checkNeedClean = function() {
        var fL = 0;
        for (var y = 19; y > 15; y--) {
            for (var x = 0; x < 10; x++) {
                if (table[y][x] == 0) {
                    return fL;
                }
            }
            fL++;
        }
        return fL;
    };
    
    var clearLayer = function(fL) {
        for (var y = 19; y > (19 - fL); y--) {
            table.pop();
            table.unshift([0,0,0,0,0,0,0,0,0,0]);
        }
        for (var y = 0; y < 20; y++) {
            for (var x = 0; x < 10; x++) {
                $("#" + y + "_" + x).css("background-color", blockColors[table[y][x]]);
            }
        }
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
    
    var dropBlock = function() {
        clearInterval(timer);
        delay = 10;
        fallingBlock();
    };
    
    var pressedKey = function() {
        window.onkeydown = function(pKey) {
            if ($("#butPause").text() !== "Продолжить") {
                if(pKey.which == 65 || pKey.which == 37) moveLeft();
                if(pKey.which == 87 || pKey.which == 38) rotateBlock();
                if(pKey.which == 68 || pKey.which == 39) moveRight();
                if(pKey.which == 83 || pKey.which == 40) dropBlock();
            }
        };
    }
};

var tetris = new _sgames.Tetris();
