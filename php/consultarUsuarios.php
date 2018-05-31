<?php

   require_once 'coneccion_mysql.php';

	$query="SELECT * FROM Usuario";
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