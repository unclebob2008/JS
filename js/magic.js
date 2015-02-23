"use strict";
function clickImg() {
    var imgUrl = document.getElementById("bfImg").src;
    if (imgUrl.indexOf("smile3.jpg") > 0) {
//      console.log(imgUrl.indexOf("balls.gif"));
//      alert("Рад вас видеть, " + userName + "." + " Нажми ОК и я превращусь в бабочку");
        document.getElementById("bfImg").src = "images/smile1.gif";
        document.getElementById("head01").innerHTML = "Хи-Хи-Хи";
        setTimeout("document.getElementById('bfImg').src = 'images/smile3.jpg'; \
        document.getElementById('head01').innerHTML = 'Привет. Кликни по мне мышкой.';", 1000);
    }
}
