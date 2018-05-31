<?php

   require_once 'coneccion_mysql.php';


$query="SELECT m.usuario, m.traspaso, m.fecha, m.dep_origen, m.dep_destino, d.id_activo, m.observaciones FROM traspaso_maestro m, traspaso_detalle d where m.traspaso=d.traspaso";

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