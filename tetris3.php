<?php
require_once('head.php');
require_once('menu.php');
?>
<div id="mainDiv" class="main">
     <table class="menuTable">
      <tr>
        <td>
          <button id="butStart" class="menuBut" onclick="">Старт</button>
        </td>
      </tr>
      <tr>
        <td>
          <button id="butPause" class="menuBut" onclick="">Пауза</button>
        </td>
      </tr>
      <tr>
        <td>
          <button id="score" class="menuBut" disabled>Счёт: 0</button>
        </td>
      </tr>
      <tr>
        <td>
          <button id="level" class="menuBut" disabled>Уровень: 1</button>
        </td>
      </tr>
    </table>
    <div id="tetris2"></div>
</div>
<script src="js/jquery-2.1.3.js"></script>
<script src="js/phaser.js"></script>
<script src="js/_namespace.js"></script>
<script src="js/tetris3.js"></script>
<script>
  _sgames.tetris3;
</script>

<?php
require_once('footer.php');
?>
