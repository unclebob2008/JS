"use strict";

var bars = [];
bars[0] = ["0.4","0.5","1.4","1.5"];
bars[1] = ["0.3","0.4","0.5","0.6"];
bars[2] = ["0.5","3.5","2.5","1.5"];

function setGlass() {
    var top = 50;
    var body = document.body;
    var glass  = document.createElement('div');
    glass.id = "div03";
    for(var i = 0; i < 20; i++) {
        var left = 100;
        for(var j = 0; j < 10; j++) {
            var block = document.createElement('div');
            block.style.top = top + "px";
            block.style.left = left +"px";
            block.className = "block";
            block.id = i + "." + j;
            glass.appendChild(block);
            left += 30
        }
        top += 26
    }
    body.appendChild(glass);
}

function start() {
    var barCur = bars[2];
    var y = [];
    var x = [];
    for (var i = 0; i < 4; i++) {
         var id = barCur[i].split(".");
         y[i] = Number(id[0]);
         x[i] = Number(id[1]);
    }
    y.sort(function(a, b){return a-b});
    moveBlock(y,x);
}

function moveBlock(y,x) {
    var timer = setInterval(drawBlock, 1000);
    function drawBlock() {
        var minY = y[0];
        for (var i = 0; i < 4; i++) {
            document.getElementById(y[i] + "." + x[i]).className = "blocknow";
            if (minY > 0) {
                document.getElementById((minY - 1) + "." + x[i]).className = "block";
            }
            y[i]++;
        }
        if (y[3] == 20) {
            clearInterval(timer);
        }
    }
}


