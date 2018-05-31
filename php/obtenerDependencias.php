<?php 
require('PDO.php');
$nombreOfi=$_POST["nombreOficina"];
$SQL = "SELECT nombreDependencia FROM dependencia where nombreOficina = '$nombreOfi'";
$stmt = $conexion->prepare($SQL);
$result = $stmt->execute();
$rows = $stmt->fetchAll(\PDO::FETCH_OBJ);
echo(json_encode($rows));
?>