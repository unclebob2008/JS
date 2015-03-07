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
    var y = [];
    var x = [];
    for (var i = 0; i < 4; i++) {
         var id = barCur[i].split(".");
         y[i] = Number(id[0]);
         x[i] = Number(id[1]);
    }
    y.sort(function(a, b){return a-b});
    pressedKey();
    fallingBlock(y,x);
}

function fallingBlock(y,x) {
    var timer = setInterval(drawBlock, 1000);
    function drawBlock() {
        var minY = y[0];
        for (var i = 0; i < 4; i++) {
            $("#" + y[i] + "\\." + x[i]).attr("class", "blocknow");
            if (minY > 0) {
                $("#" + (minY - 1) + "\\." + x[i]).attr("class", "block");
            }
            y[i]++;
        }
        if (y[3] == 20) {
            clearInterval(timer);
        }
    }
}

function pressedKey() {
        $(document).keydown(function(pKey) {
        if(pKey.which == 37) console.log('left');
        if(pKey.which == 38) console.log('rotate');
        if(pKey.which == 39) console.log('right');
        if(pKey.which == 40) console.log('drop');
    });
}


