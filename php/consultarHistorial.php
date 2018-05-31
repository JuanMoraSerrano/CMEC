<?php

   require_once 'coneccion_mysql.php';
/*
   if($_POST){*/

/*   	$fechaInicio=$_POST["fechaInicio"];
   	$fechaActual=$_POST["fechaActual"];*/

	$query="SELECT * FROM historial ORDER BY 5 DESC,6 DESC";
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
/*}*/
/*else{
	echo "No se enviaron datos..";
}*/
?>