<?php 
require('PDO.php');
$SQL = 'SELECT contador FROM historial';
$stmt = $conexion->prepare($SQL);
$result = $stmt->execute();
$rows = $stmt->fetchAll(\PDO::FETCH_OBJ);
echo(json_encode($rows));
?>