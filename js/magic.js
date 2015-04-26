/* global _sgames */

"use strict";

_sgames.Magic = function() {
    this.clickImg = function() {
        var imgUrl = $("#smile3").attr('src');
        if (imgUrl.indexOf("smile3.jpg") > 0) {
            $("#smile3").attr('src', "images/smile1.gif");
            $("#head01").text("Хи-Хи-Хи");
            setTimeout("$('#smile3').attr('src', 'images/smile3.jpg'); \
            $('#head01').text('Привет. Кликни по мне мышкой.')", 1000);
        }
    };
};

_sgames.magic = new _sgames.Magic();


