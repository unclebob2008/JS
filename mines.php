<?php
require_once('head.php');
require_once('menu.php');
?>

<div id="mainDiv" class="main">
  <h2>Сапёр</h2>
  Ширина поля: <input id="wF" type="number" name="widthField" min="3" max="30" value=10>
  <br>
  Высота поля: <input id="hF" type="number" name="heightField" min="3" max="30" value=10>
  <br>
  Количество мин: <input id="pM" type="number" name="procMines" min="10" max="50" value=25>% от размера поля
  <br>
  <button onclick="_sgames.matrix.setTable();">Начать новую игру</button>
  <h3 id="secundomer"></h3>
  <br/>
  <h3 id="baner"></h3>
</div>

  <script src="js/jquery-2.1.4.min.js"></script>
  <script src="js/_namespace.js"></script>
  <script src="js/matrix.js"></script>

<?php
require_once('footer.php');
?>