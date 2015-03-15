"use strict";

sgames.bars = [];
sgames.bars[0] = ["0_4","0_5","1_4","1_5"];
sgames.bars[1] = ["0_3","0_4","0_5","0_6"];
sgames.bars[2] = ["0_5","1_5","2_5","3_5"];
sgames.bars[3] = ["0_4","0_5","1_4","2_4"];
sgames.bars[4] = ["0_4","0_5","1_5","2_5"];
sgames.bars[5] = ["0_3","1_3","1_4","1_5"];
sgames.bars[6] = ["0_4","0_5","0_6","1_4"];
sgames.bars[7] = ["0_3","0_4","0_5","1_5"];
sgames.bars[8] = ["1_4","1_5","1_6","0_6"];
sgames.bars[9] = ["0_5","1_5","2_5","2_6"];
sgames.bars[10] = ["0_5","1_5","2_5","2_4"];
sgames.bars[11] = ["0_5","1_5","1_6","2_6"];
sgames.bars[12] = ["0_5","1_5","1_4","2_4"];
sgames.bars[13] = ["0_4","0_5","1_5","1_6"];
sgames.bars[14] = ["1_4","1_5","0_5","0_6"];

sgames.yPos = [];
sgames.xPos = [];

sgames.setGlass = function() {
    $("#div01").empty();
    var tetrBut = '<button onclick="sgames.startGame();">Start game</button>';
    var top = 50;
    var glass  = document.createElement('div');
    glass.id = "div03";
    for(var i = 0; i < 20; i++) {
        var left = 100;
        for(var j = 0; j < 10; j++) {
            var block = document.createElement('div');
            block.style.top = top + "px";
            block.style.left = left +"px";
            block.className = "block blocknow";
            block.id = i + "_" + j;
            glass.appendChild(block);
            left += 30
        }
        top += 26
    }
    $("#div01").append(tetrBut, glass);
};

sgames.startGame = function() {
    var barCur = sgames.bars[Math.floor((Math.random() * 14))];
    for (var i = 0; i < 4; i++) {
         var id = barCur[i].split("_");
         sgames.yPos[i] = Number(id[0]);
         sgames.xPos[i] = Number(id[1]);
         $("#" + sgames.yPos[i] + "_" + sgames.xPos[i]).removeClass("block").addClass("blocknow");
    }
    sgames.pressedKey();
    sgames.moveBlock(sgames.yPos,sgames.xPos,"y",19,1,1000);
};

sgames.moveBlock = function(yCoord, xCoord, dir, gap, step, time) {
    var coord = (dir == "y") ? yCoord : xCoord;
    var delta = coord[0] + gap;
    var timer = setInterval(drawBlock, time);
    function drawBlock() {
        for (var i = 0; i < 4; i++) {
            $("#" + sgames.yPos[i] + "_" + sgames.xPos[i]).removeClass("blocknow").addClass("block");
            coord[i] += step;
        }
        for (var i = 0; i < 4; i++) {
            $("#" + sgames.yPos[i] + "_" + sgames.xPos[i]).removeClass("block").addClass("blocknow");
        }
        if (coord[3] == delta) {
            clearInterval(timer);
        }
    }
};

sgames.pressedKey = function() {
    window.onkeydown = function(pKey) {
        if(pKey.which == 65) sgames.moveBlock(sgames.yPos,sgames.xPos,"x",1,-1,1000);
        if(pKey.which == 87) console.log('rotate');
        if(pKey.which == 68) sgames.moveBlock(sgames.yPos,sgames.xPos,"x",1,1,1000);
        if(pKey.which == 83) console.log('drop');
    };
}

