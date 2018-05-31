<?php
 
require_once 'PDO.php';


if($_POST!=null){

try{
	
$nombreTipoEquipo=$_POST["nombreTipoEquipo"];


$statement=$conexion->prepare("INSERT INTO tipoequipo VALUES(null, '$nombreTipoEquipo')");
if($statement->execute()){
echo 1;	
}
else{
	echo $statement->error;
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