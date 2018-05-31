<?php

require_once 'PDO.php';


if($_POST!=null){

try{
	
$activo=$_POST["activo"];
$serie=$_POST["serie"];

$statement=$conexion->prepare("UPDATE equipo SET estado='False' WHERE activo=:act or serie=:ser");
if($statement->execute(array(':act'=>$activo,':ser'=>$serie))){
echo 1;	
}
else{
	echo 0;
}


}
catch(PDOE $e){
echo "Error: ".$e->getMessage();
die();
}
}

else{
	echo "No se han enviado datos";
}


?>