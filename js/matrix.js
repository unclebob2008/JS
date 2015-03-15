"use strict";

sgames.widthField;
sgames.heightField;
sgames.procMines;
sgames.numMines;
sgames.arrField = {};
sgames.viewField = {};

sgames.setTable = function () {
  sgames.widthField = $("#wF").val();
  sgames.heightField = $("#hF").val();
  sgames.procMines = $("#pM").val();
  sgames.numMines = sgames.widthField * sgames.heightField / 100 * sgames.procMines;
  $("#baner").text("");
  if (sgames.widthField >= 3 && sgames.widthField <= 30 && sgames.heightField >= 3 &&
      sgames.heightField <= 30 && sgames.procMines >= 10 && sgames.procMines <= 50) {
    var tbl  = document.createElement('table');
    tbl.id = 'field';
    for(var i = 0; i < sgames.heightField; i++) {
        var tr = tbl.insertRow();
        for(var j = 0; j < sgames.widthField; j++) {
            var td = tr.insertCell();
            td.appendChild(document.createTextNode(''));
            td.id = i + "_" + j;
            td.onclick = function(){sgames.clickCell();};
            sgames.arrField[td.id] = 0;
            sgames.viewField[td.id] = 0; //0 - original (green), 1 - clicked (white), 2 - marked (blue)
        }
    }
    if ($("#field").length) {
        $("#field").replaceWith(tbl);
    } else {
        $("#div01").append(tbl);
    }
    for (var m = 0; m < sgames.numMines; m++) {
        var y = Math.floor((Math.random() * sgames.heightField));
        var x = Math.floor((Math.random() * sgames.widthField));
        if (sgames.arrField[y + "_" + x] !== 9) {
            sgames.arrField[y + "_" + x] = 9;
        } else {
            m--;
        }
    }
    for(var i = 0; i < sgames.heightField; i++) {
        for(var j = 0; j < sgames.widthField; j++) {
            if (sgames.arrField[i + "_" + j] == 9) {
                var nb = sgames.collectNear(i, j);
                for (var k = 0; k < nb.length; k++) {
                    if (sgames.arrField[nb[k]] != 9) {
                        sgames.arrField[nb[k]]++;
                    }
                }
            }
        }
    }
  } else {
      $("#baner").text("Ширина и высота могут быть от 3 до 30, количество мин от 10 до 50%.");
  }
};

sgames.clickCell = function() {
    var clickId = event.target.id;
    if (event.button == 0) {
        if (sgames.arrField[clickId] !== 9) {
            $("#" + clickId).css("background", "white");
            sgames.viewField[clickId] = 1;
            if (sgames.arrField[clickId] !== 0) {
                $("#" + clickId).text(sgames.arrField[clickId]);
            } else {
                sgames.openNear(clickId);
            }
            sgames.checkEndGame();
        } else {
            sgames.showMines();
            $("#" + clickId).css("background", "red");
            $("#baner").text("Вы проиграли. Попробуйте ещё раз.");    
        }
    } else {
        switch (sgames.viewField[clickId]) {
            case 0:
                $("#" + clickId).css("background", "blue");
                sgames.viewField[clickId] = 2;
                break;
            case 2:
                $("#" + clickId).removeAttr("style");
                sgames.viewField[clickId] = 0;
                break;
        }
        sgames.checkEndGame();
    }
};

sgames.checkEndGame = function() {
    var count = 0;
    var mines = 0;
    for (var i = 0; i < sgames.heightField; i++) {
        for (var j = 0; j < sgames.widthField; j++) {
            if (sgames.arrField[i + "_" + j] !== 9 && sgames.viewField[i + "_" + j] == 0) count++;
            if (sgames.arrField[i + "_" + j] == 9 && sgames.viewField[i + "_" + j] == 2) mines++;
        }
    }
    if (count == 0 || mines == sgames.numMines) {
        $("#baner").text("Вы победили. Ура!!!");
        sgames.showMines();
    }
};

sgames.openNear = function(clId) {
    var id = clId.split("_");
    var i = Number(id[0]);
    var j = Number(id[1]);
    var idCol = sgames.collectNear(i, j);
     for (var k = 0; k < idCol.length; k++) {
        if (sgames.viewField[idCol[k]] == 0) {
            $("#" + idCol[k]).css("background", "white");
            sgames.viewField[idCol[k]] = 1;
            if (sgames.arrField[idCol[k]] !== 0) {
                $("#" + idCol[k]).text(sgames.arrField[idCol[k]]);
            } else {
                sgames.openNear(idCol[k]);
            }
        }
    }
};

sgames.showMines = function() {
    for (var i = 0; i < sgames.heightField; i++) {
         for (var j = 0; j < sgames.widthField; j++) {
              if (sgames.arrField[i + "_" + j] == 9) {
                        $("#" + i + "_" + j).text('Bomb');
                        $("#" + i + "_" + j).css("color", "white");
                        $("#" + i + "_" + j).css("font-size", "10px");
              }
          }
    }
};

sgames.collectNear = function(x, y) {
    var idCol = [];
    var n = 0;
    if (y - 1 >= 0) {
        idCol[n] = x + "_" + (y - 1);
        n++;
    }
    if (y + 1 < sgames.widthField) {
        idCol[n] = x + "_" + (y + 1);
        n++;
    }
    if (x - 1 >= 0) {
        idCol[n] = (x - 1) + "_" + y;
        n++;
    }
    if (x + 1 < sgames.heightField) {
        idCol[n] = (x + 1) + "_" + y;
        n++;
    }
    if (y - 1 >= 0 && x - 1 >= 0) {
        idCol[n] = (x - 1) + "_" + (y - 1);
        n++;
    }
    if (y - 1 >= 0 && x + 1 < sgames.heightField) {
        idCol[n] = (x + 1) + "_" + (y - 1);
        n++;
    }
    if (x - 1 >= 0 && y + 1 < sgames.widthField) {
        idCol[n] = (x - 1) + "_" + (y + 1);
        n++;
    }
    if (x + 1 < sgames.heightField && y + 1 < sgames.widthField) {
        idCol[n] = (x + 1) + "_" + (y + 1);
        n++;
    }
    return idCol;
}
