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
    var barGor = ["0.3","0.4","0.5","0.6"];
    for (var i = 0; i < 4; i++) {
        document.getElementById(barGor[i]).style.background = "blue";    
    }
}

function moveBlock(elem) {
    function frameDown() {
        top++;  
        elem.style.top = top + 'px';
        if (top == 400) clearInterval(id);
    }
    function frameUp() {
        top--;  
        elem.style.top = top + 'px';
        if (top == 10) clearInterval(id);
    }
    if (elem.style.top !== "400px") {
        var top = 10;
        frameDown();
        var id = setInterval(frameDown, 10);
    } else {
        var top = elem.style.top;
        top = Number(top.replace("px", ""));
        var id = setInterval(frameUp, 10);
    }
}
