<?php
 
require_once 'PDO.php';


if($_POST!=null){

try{
	
$activo=$_POST["activo"];

$statement=$conexion->prepare("UPDATE equipo SET estado='True' WHERE activo=:act");
$statement->execute(array(':act'=>$activo));
if($statement->rowCount()==1){
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