"use strict";

_sgames.Magic = function() {
    this.clickImg = function() {
        var imgUrl = $("#bfImg").attr('src');
        if (imgUrl.indexOf("smile3.jpg") > 0) {
            $("#bfImg").attr('src', "images/smile1.gif");
            $("#head01").text("Хи-Хи-Хи");
            setTimeout("$('#bfImg').attr('src', 'images/smile3.jpg'); \
            $('#head01').text('Привет. Кликни по мне мышкой.')", 1000);
        }
    };
};

var magic = new _sgames.Magic();


