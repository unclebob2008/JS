"use strict";

function setGlass() {
    var body = document.body;
    var glass  = document.createElement('div');
    glass.id = "div03";
    for(var i = 10; i < 520; i+=26) {
        for(var j = 100; j < 410; j+=31) {
            var block = document.createElement('div');
            block.style.position = "fixed";
            block.style.top = i + "px";
            block.style.left = j +"px";
            block.className = "block";
            glass.appendChild(block);
        }
    }
    body.appendChild(glass);
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
