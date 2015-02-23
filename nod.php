<!DOCTYPE html>
<html lang="en-US">
<head>
  <meta charset="UTF-8">
  <title>Алгоритм Эвклида</title>
</head>
<body>
<h1>Наибольший общий делитель</h1>
<?php
if (isset($_GET['submit'])) {
    if (($_GET['firstVal'] > 0) && ($_GET['secondVal'] > 0)) {
        $n1 = $_GET['firstVal'];
        $n2 = $_GET['secondVal'];
        $n3 = $n1 % $n2;
        while ($n3 !== 0) {
            $n1 = $n2;
            $n2 = $n3;
            $n3 = $n1 % $n2;
        }
        echo 'НОД = ' . $n2;
    } else {
        echo "Введите оба числа";
    }
}
?>
<br>
<br>
<form action="<?php echo $_SERVER['PHP_SELF'];?>" method="get" >
  Первое число: <input type="number" name="firstVal" value="<?php if (isset($_GET['firstVal'])) echo $_GET['firstVal']; ?>">
  <br>
  Второе число: <input type="number" name="secondVal" value="<?php if (isset($_GET['secondVal'])) echo $_GET['secondVal']; ?>">
  <br>
  <input type="submit" name="submit" value="Пуск">
</form>
</body>
</html>