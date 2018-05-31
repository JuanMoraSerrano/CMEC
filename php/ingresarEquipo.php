<?php
 
require_once 'PDO.php';

if($_POST!=null){

try{
	
	 $activo=$_POST["activo"];
	 $serie=$_POST["serie"];
	 $ubicacion=$_POST["ubicacion"];
	 $sennas=$_POST["sennas"];
	 $contrato=$_POST["contrato"];
     $marca=$_POST["marca"];
	 $modelo=$_POST["modelo"];
	 $tipoEquipo=$_POST["tipoEquipo"];
	 $estado=$_POST["estado"];
	  $garantia=$_POST["gar"];
	


$statement=$conexion->prepare("INSERT INTO equipo VALUES(null,'$activo','$serie','$ubicacion','$sennas',$contrato,'$marca','$modelo','$estado','$tipoEquipo','$garantia')");
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
	echo "No se enviaron datos..";
}


?>