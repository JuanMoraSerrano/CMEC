<?php

require('PDO.php');

$columna=$_POST['columna'];
$fechaInicio=$_POST['fechaInicio'];
$fechaFinal=$_POST['fechaFinal'];

	$SQL="SELECT e.tipoEquipo, e.activo, e.serie, e.marca, e.modelo, e.oficina, e.dependencia, e.garantia, e.contrato, 
	f.numeroProcedimiento, f.proveedor, f.fecha, f.obsolescencia, e.estado FROM equipo e, compra f where e.contrato=f.contrato 
  and $columna BETWEEN '$fechaInicio' AND '$fechaFinal'";

$stmt = $conexion->prepare($SQL);
$result = $stmt->execute();
$rows = $stmt->fetchAll(\PDO::FETCH_OBJ);
echo(json_encode($rows));

?>