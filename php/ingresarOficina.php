<?php
 
require_once 'PDO.php';


if($_POST!=null){

try{
	

$nombreOficina=$_POST["nombreOficina"];
$codigoOficina=$_POST["codigoOficina"];


$statement=$conexion->prepare("INSERT INTO oficina VALUES('$nombreOficina','$codigoOficina')");
if($statement->execute()){
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