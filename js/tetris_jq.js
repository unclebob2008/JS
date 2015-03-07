"use strict";

var bars = [];
bars[0] = ["0.4","0.5","1.4","1.5"];
bars[1] = ["0.3","0.4","0.5","0.6"];
bars[2] = ["0.5","3.5","2.5","1.5"];
bars[3] = ["0.4","0.5","1.4","2.4"];
bars[4] = ["0.4","0.5","1.5","2.5"];
bars[5] = ["0.3","1.3","1.4","1.5"];
bars[6] = ["0.4","0.5","0.6","1.4"];
bars[7] = ["0.3","0.4","0.5","1.5"];
bars[8] = ["1.4","1.5","1.6","0.6"];
bars[9] = ["0.5","1.5","2.5","2.6"];
bars[10] = ["0.5","1.5","2.5","2.4"];
bars[11] = ["0.5","1.5","1.6","2.6"];
bars[12] = ["0.5","1.5","1.4","2.4"];
bars[13] = ["0.4","0.5","1.5","1.6"];
bars[14] = ["1.4","1.5","0.5","0.6"];

var y = [];
var x = [];

function setGlass() {
    var top = 50;
    var glass  = $("<div>");
    glass.attr("id", "div03");
    for(var i = 0; i < 20; i++) {
        var left = 100;
        for(var j = 0; j < 10; j++) {
            var block = $("<div>");
            block.css("top",
            (top + 'px')).css("left", (left + 'px')).attr("class", "block").attr("id", (i + "." + j));
            glass.append(block);
            left += 30;
        }
        top += 26;
    }
    $("body").append(glass);
}

function startGame() {
    var barCur = bars[Math.floor((Math.random() * 14))];
    for (var i = 0; i < 4; i++) {
         var id = barCur[i].split(".");
         y[i] = Number(id[0]);
         x[i] = Number(id[1]);
    }
    for (var i = 0; i < 4; i++) {
        $("#" + y[i] + "\\." + x[i]).attr("class", "blocknow");
    }
    pressedKey();
    moveBlock(y,x,"y",19,1,1000);
}

function moveBlock(y,x,dir,gap,step,time) {
    var coord = (dir == "y") ? y : x;
    var delta = coord[0] + gap;
    var timer = setInterval(drawBlock, time);
    function drawBlock() {
        for (var i = 0; i < 4; i++) {
            $("#" + y[i] + "\\." + x[i]).attr("class", "block");
            coord[i] = coord[i] + step;
        }
        for (var i = 0; i < 4; i++) {
            $("#" + y[i] + "\\." + x[i]).attr("class", "blocknow");
        }
        if (coord[3] == delta) {
            clearInterval(timer);
        }
    }
}

function pressedKey() {
        $(document).keydown(function(pKey) {
        if(pKey.which == 37) moveBlock(y,x,"x",1,-1,100);
        if(pKey.which == 38) console.log('rotate');
        if(pKey.which == 39) moveBlock(y,x,"x",1,1,100);
        if(pKey.which == 40) console.log('drop');
    });
}


