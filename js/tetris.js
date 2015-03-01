"use strict";

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
    var barCur = ["0.4","0.5","1.4","1.5"];
    var y = [];
    var x = [];
    for (var i = 0; i < 4; i++) {
         var id = barCur[i].split(".");
         y[i] = Number(id[0]);
         x[i] = Number(id[1]);
    }
    moveBlock(y,x);
}

function moveBlock(y,x) {
    var d = 0;
    var timer = setInterval(drawBlock, 1000);
    function drawBlock() {
        for (var i = 0; i < 4; i++) {
            document.getElementById((y[i] + d) + "." + x[i]).className = "blocknow";
            if (d > 0) {
                document.getElementById((d - 1) + "." + x[i]).className = "block";
            }
        }
        d++;
        if (d == 19) {
            clearInterval(timer);
        }
    }
}


