"use strict";

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
