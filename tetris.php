<?php
require_once('head.php');
require_once('menu.php');
?>

<div id="mainDiv" class="main">
     <table class="menuTable">
      <tr>
        <td>
          <button id="butStart" class="menuBut" onclick="_sgames.tetris.startGame();">Старт</button>
        </td>
      </tr>
      <tr>
        <td>
          <button id="butPause" class="menuBut" onclick="_sgames.tetris.pauseGame();">Пауза</button>
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
</div>
<script src="js/jquery-2.1.4.min.js"></script>
<script src="js/_namespace.js"></script>
<script src="js/tetris.js"></script>
<script type="text/javascript">
   _sgames.tetris.setGlass();
</script>

<?php
require_once('footer.php');
?>
