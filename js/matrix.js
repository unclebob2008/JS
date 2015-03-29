"use strict";

_sgames.Matrix = function() {
    var self = this;
    var widthField;
    var heightField;
    var procMines;
    var numMines;
    var arrField = {};
    var viewField = {};
    var timer;
    
    var secundomer = function() {
        var c = 0;
        for (var i in viewField) {
            if (viewField[i]) c++;
        }
        if (!c) {
            var secs = 0;
            var mins = 0;
            if (timer) clearInterval(timer);
            $("#secundomer").text('0:00');
            timer = setInterval(
                function () {
                    secs++;
                    if (secs == 60) {
                        secs = 0;
                        mins++;
                    }
                    if (secs < 10) {
                    $("#secundomer").text(mins + ':' + '0' + secs);
                    } else {
                        $("#secundomer").text(mins + ':' + secs);
                    }
                },
                1000
            );
        }
    }
    
    this.setTable = function() {
        if (timer) clearInterval(timer);
        $("#secundomer").text('0:00');
        widthField = $("#wF").val();
        heightField = $("#hF").val();
        procMines = $("#pM").val();
        numMines = widthField * heightField / 100 * procMines;
        $("#baner").text("");
        if (widthField >= 3 && widthField <= 30 && heightField >= 3 && 
        heightField <= 30 && procMines >= 10 && procMines <= 50) {
            var tbl  = document.createElement('table');
            tbl.id = 'field';
            for(var i = 0; i < heightField; i++) {
                var tr = tbl.insertRow();
                for(var j = 0; j < widthField; j++) {
                    var td = tr.insertCell();
                    td.appendChild(document.createTextNode(''));
                    td.id = i + "_" + j;
                    td.onclick = function(){self.clickCell();};
                    arrField[td.id] = 0;
                    viewField[td.id] = 0; //0 - original (green), 1 - clicked (white), 2 - marked (blue)
                }
            }
            if ($("#field").length) {
                $("#field").replaceWith(tbl);
            } else {
                $("#mainDiv").append(tbl);
            }
            for (var m = 0; m < numMines; m++) {
                var y = Math.floor((Math.random() * heightField));
                var x = Math.floor((Math.random() * widthField));
                if (arrField[y + "_" + x] !== 9) {
                    arrField[y + "_" + x] = 9;
                } else {
                    m--;
                }
            }
            for(var i = 0; i < heightField; i++) {
                for(var j = 0; j < widthField; j++) {
                    if (arrField[i + "_" + j] == 9) {
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
            $("#baner").text("Ширина и высота могут быть от 3 до 30, количество мин от 10 до 50%.");
        }
    };
    
    this.clickCell = function() {
        secundomer();
        var clickId = event.target.id;
        if (event.button == 0) {
            if (arrField[clickId] !== 9) {
                $("#" + clickId).css("background", "white");
                viewField[clickId] = 1;
                if (arrField[clickId] !== 0) {
                    $("#" + clickId).text(arrField[clickId]);
                } else {
                    openNear(clickId);
                }
                checkEndGame();
            } else {
                clearInterval(timer);
                showMines();
                $("#" + clickId).css("background", "red");
                $("#baner").text("Вы проиграли. Попробуйте ещё раз.");    
            }
        } else {
            switch (viewField[clickId]) {
                case 0:
                    $("#" + clickId).css("background", "blue");
                    viewField[clickId] = 2;
                    break;
                case 2:
                    $("#" + clickId).removeAttr("style");
                    viewField[clickId] = 0;
                    break;
            }
            checkEndGame();
        }
    };
    
    var checkEndGame = function() {
        var count = 0;
        var mines = 0;
        for (var i in arrField) {
                if (arrField[i] !== 9 && viewField[i] == 0) count++;
                if (arrField[i] == 9 && viewField[i] == 2) mines++;
        }
        if (count == 0 || mines == numMines) {
            clearInterval(timer);
            $("#baner").text("Вы победили. Ура!!!");
            showMines();
        }
    };
    
    var openNear = function(clId) {
        var id = clId.split("_");
        var i = Number(id[0]);
        var j = Number(id[1]);
        var idCol = collectNear(i, j);
        for (var k = 0; k < idCol.length; k++) {
            if (viewField[idCol[k]] == 0) {
                $("#" + idCol[k]).css("background", "white");
                viewField[idCol[k]] = 1;
                if (arrField[idCol[k]] !== 0) {
                    $("#" + idCol[k]).text(arrField[idCol[k]]);
                } else {
                    openNear(idCol[k]);
                }
            }
        }
    };
    
    var showMines = function() {
        for (var i in arrField) {
                if (arrField[i] == 9) {
                    $("#" + i).html("<img src='/images/smile2-2.jpg'>");
                    $("#" + i).css("color", "white");
                }
        }
    };
    
    var collectNear = function(x, y) {
        var idCol = [];
        var n = 0;
        if (y - 1 >= 0) {
            idCol[n] = x + "_" + (y - 1);
            n++;
        }
        if (y + 1 < widthField) {
            idCol[n] = x + "_" + (y + 1);
            n++;
        }
        if (x - 1 >= 0) {
            idCol[n] = (x - 1) + "_" + y;
            n++;
        }
        if (x + 1 < heightField) {
            idCol[n] = (x + 1) + "_" + y;
            n++;
        }
        if (y - 1 >= 0 && x - 1 >= 0) {
            idCol[n] = (x - 1) + "_" + (y - 1);
            n++;
        }
        if (y - 1 >= 0 && x + 1 < heightField) {
            idCol[n] = (x + 1) + "_" + (y - 1);
            n++;
        }
        if (x - 1 >= 0 && y + 1 < widthField) {
            idCol[n] = (x - 1) + "_" + (y + 1);
            n++;
        }
        if (x + 1 < heightField && y + 1 < widthField) {
            idCol[n] = (x + 1) + "_" + (y + 1);
            n++;
        }
        return idCol;
    }
};

var matrix = new _sgames.Matrix();
