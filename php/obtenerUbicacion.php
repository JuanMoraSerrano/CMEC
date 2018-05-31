<?php 
require('PDO.php');
$SQL = 'SELECT nombreOficina FROM oficina';
$stmt = $conexion->prepare($SQL);
$result = $stmt->execute();
$rows = $stmt->fetchAll(\PDO::FETCH_OBJ);
echo(json_encode($rows));
?>