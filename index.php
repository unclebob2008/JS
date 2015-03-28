<!DOCTYPE html>
<html lang="en-US">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" type="text/css" href="css/style.css">
  <title>Magic</title>
  <script src="js/jquery-2.1.3.js"></script>
  <script src="js/_namespace.js"></script>
  <script src="js/magic.js"></script>
  <script src="js/matrix.js"></script>
  <script src="js/tetris.js"></script>
</head>
<body>
  <div id="div02">
    <table class="menuTable">
      <tr>
        <td>
          <div class="menuDiv" onclick="matrix.setMinesP1();">Сапёр</div>
        </td>
        <td>
          <div class="menuDiv" onclick="tetris.setGlass();">Тетрис</div>
        </td>
      </tr>
    </table>
  </div>
   <div id="div01" class="main">
    <h1 id="head01"> Привет. Кликни по мне мышкой.</h1>
    <img id="bfImg" src="images/smile3.jpg" alt="iBF" onclick="magic.clickImg();"/>
  </div>
</body>
</html>