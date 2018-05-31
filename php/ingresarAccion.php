<?php
 session_start();

require_once 'PDO.php';

if($_POST!=null){

try{
	 $actor=$_SESSION['id']."-".$_SESSION['nombre'];
	 $descripcion=$_POST["descripcion"];
	 $idObjetoGestionado=$_POST["idObjetoGestionado"];
	 $fecha=$_POST["fecha"];
	 $hora=$_POST["hora"];
	 
	


$statement=$conexion->prepare("INSERT INTO historial VALUES(null,'$actor','$descripcion','$idObjetoGestionado','$fecha','$hora')");


if($statement->execute()){
echo 1;	
}


}
catch(PDOE $e){
echo "Error: ".$e->getMessage();
die();
}
}
else{
	
}


?>