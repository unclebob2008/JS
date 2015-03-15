(function(sgames, $, undefined) {
    "use strict";
    sgames.clickImg = function() {
        var imgUrl = $("#bfImg").attr('src');
        if (imgUrl.indexOf("smile3.jpg") > 0) {
            $("#bfImg").attr('src', "images/smile1.gif");
            $("#head01").text("Хи-Хи-Хи");
            setTimeout("$('#bfImg').attr('src', 'images/smile3.jpg'); \
            $('#head01').text('Привет. Кликни по мне мышкой.')", 1000);
        }
    };
    sgames.setMinesP1 = function() {
        $("#bfImg").remove();
        $("#head01").remove();
        $("#div01").css("text-align", "left");
        var p1 = '<h1 id="head01">Сапёр</h1> \
        Ширина поля: <input id="wF" type="number" name="widthField" min="3" max="30" value=10> \
        <br> \
        Высота поля: <input id="hF" type="number" name="heightField" min="3" max="30" value=10> \
        <br> \
        Количество мин: <input id="pM" type="number" name="procMines" min="10" max="50" value=25>% от размера поля \
        <br> \
        <input type="button" name="startBut" onclick="sgames.setTable();" value="Начать новую игру"> \
        <br/> \
        <br/> \
        <h2 id="baner"></h2>'
        $("#div01").append(p1)
    }
}(window.sgames = window.sgames || {}, jQuery));


