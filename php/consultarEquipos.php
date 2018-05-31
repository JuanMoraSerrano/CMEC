<?php

   require_once 'coneccion_mysql.php';


$query="SELECT e.tipoEquipo, e.activo, e.serie, e.marca, e.modelo, e.oficina,e.dependencia, e.garantia, e.contrato, f.numeroProcedimiento,
f.proveedor, f.fecha, f.obsolescencia, e.estado FROM equipo e, compra f where e.contrato=f.contrato";

	$resultado=mysqli_query($conexion2,$query);
if(!$resultado){
	 die("ERROR");
}else{
	$arreglo["data"] = [];
	while($data=mysqli_fetch_assoc($resultado)){
		$arreglo["data"][]=array_map("utf8_decode", $data) ;
	}
	echo json_encode($arreglo);
}
mysqli_free_result($resultado);
?>