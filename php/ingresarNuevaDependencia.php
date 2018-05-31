<?php
 
require_once 'PDO.php';


if($_POST!=null){

try{
	
$nombreDependencia=$_POST["nombreDependencia"];
$nombreOficina=$_POST["nombreOficina"];



$statement=$conexion->prepare("INSERT INTO dependencia VALUES(null, '$nombreOficina','$nombreDependencia')");
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