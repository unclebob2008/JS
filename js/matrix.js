"use strict";

var widthField, heightField, procMines, numMines;
var arrField = {};

function setTable() {
  widthField = document.getElementById("wF").value;
  heightField = document.getElementById("hF").value;
  procMines = document.getElementById("pM").value;
  numMines = widthField * heightField / 100 * procMines;
  document.getElementById("baner").innerHTML = "";
  if (widthField >= 3 && widthField <= 30 && heightField >= 3 && heightField <= 30 && procMines >= 10 && procMines <= 50) {
    var fld = document.getElementById('field');
    var body = document.body;
    var tbl  = document.createElement('table');
    tbl.id = 'field';
    for(var i = 0; i < heightField; i++) {
        var tr = tbl.insertRow();
        for(var j = 0; j < widthField; j++) {
            var td = tr.insertCell();
            td.appendChild(document.createTextNode(''));
            td.id = i + "." + j;
            td.onclick = function(){clickCell();};
            arrField[td.id] = 0;
        }
    }
    if (fld) {
        body.replaceChild(tbl, fld);
    } else {
        body.appendChild(tbl);
    }
    for (var m = 0; m < numMines; m++) {
        var y = Math.floor((Math.random() * heightField));
        var x = Math.floor((Math.random() * widthField));
        if (arrField[y + "." + x] !== 9) {
            arrField[y + "." + x] = 9;
        } else {
            m--;
        }
    }
    for(var i = 0; i < heightField; i++) {
        for(var j = 0; j < widthField; j++) {
            if (arrField[i + "." + j] == 9) {
                var nb = collectNear(i, j);
                for (var k = 0; k < nb.length; k++) {
                    if (arrField[nb[k]] != 9) {
                        arrField[nb[k]]++;
                    }
                }
            }
        }
    }
  } else {
      document.getElementById("baner").innerHTML = "Ширина и высота могут быть от 3 до 30, количество мин от 10 до 50%.";
  }
}

function clickCell() {
    var clickId = event.target.id;
    if (event.button == 0) {
        if (arrField[clickId] !== 9) {
            document.getElementById(clickId).style.background = "white";
            if (arrField[clickId] !== 0) {
                document.getElementById(clickId).childNodes[0].nodeValue = arrField[clickId];
            } else {
                openNear(clickId);
            }
            checkEndGame();
        } else {
            showMines();
            document.getElementById(clickId).style.background = "red";
            document.getElementById("baner").innerHTML = "Вы проиграли. Попробуйте ещё раз.";    
        }
    } else {
        var checkBG = document.getElementById(clickId).style.background;
        switch (checkBG) {
            case '':
                document.getElementById(clickId).style.background = "blue";
                break;
            case 'blue':
                document.getElementById(clickId).attributes.removeNamedItem("style");
                break;
        }
        checkEndGame();
    }
}

function checkEndGame() {
    var count = 0;
    var mines = 0;
    for (var i = 0; i < heightField; i++) {
        for (var j = 0; j < widthField; j++) {
            var checkBG = document.getElementById(i + "." + j).style.background;
            if (arrField[i + "." + j] !== 9 && checkBG == '') count++;
            if (arrField[i + "." + j] == 9 && checkBG == 'blue') mines++;
        }
    }
    if (count == 0 || mines == numMines) {
        document.getElementById("baner").innerHTML = "Вы победили. Ура!!!";
        showMines();
    }
}

function openNear(clId) {
    var id = clId.split(".");
    var i = Number(id[0]);
    var j = Number(id[1]);
    var idCol = collectNear(i, j);
    for (var k = 0; k < idCol.length; k++) {
        var checkBG = document.getElementById(idCol[k]).style.background;
        if (checkBG !== 'white') {
            document.getElementById(idCol[k]).style.background = "white";
            if (arrField[idCol[k]] !== 0) {
                document.getElementById(idCol[k]).childNodes[0].nodeValue = arrField[idCol[k]];
            } else {
                openNear(idCol[k]);
            }
        }
    }
}

function showMines() {
    for (var i = 0; i < heightField; i++) {
         for (var j = 0; j < widthField; j++) {
              if (arrField[i + "." + j] == 9) {
                        document.getElementById(i + "." + j).childNodes[0].nodeValue =
                        'Bomb';
                        document.getElementById(i + "." + j).style.color = "white";
                        document.getElementById(i + "." + j).style.fontSize = "10px";
              }
          }
    }
}

function collectNear(x, y) {
    var idCol = [];
    var n = 0;
    if (y - 1 >= 0) {
        idCol[n] = x + "." + (y - 1);
        n++;
    }
    if (y + 1 < widthField) {
        idCol[n] = x + "." + (y + 1);
        n++;
    }
    if (x - 1 >= 0) {
        idCol[n] = (x - 1) + "." + y;
        n++;
    }
    if (x + 1 < heightField) {
        idCol[n] = (x + 1) + "." + y;
        n++;
    }
    if (y - 1 >= 0 && x - 1 >= 0) {
        idCol[n] = (x - 1) + "." + (y - 1);
        n++;
    }
    if (y - 1 >= 0 && x + 1 < heightField) {
        idCol[n] = (x + 1) + "." + (y - 1);
        n++;
    }
    if (x - 1 >= 0 && y + 1 < widthField) {
        idCol[n] = (x - 1) + "." + (y + 1);
        n++;
    }
    if (x + 1 < heightField && y + 1 < widthField) {
        idCol[n] = (x + 1) + "." + (y + 1);
        n++;
    }
    return idCol;
}
