<?php
 
require_once 'PDO.php';
if($_POST!=null){
try{
	$nombreProveedor=$_POST["nombreProveedor"];
	$telefono=$_POST["telefono"];
	$email=$_POST["email"];

$statement=$conexion->prepare("INSERT INTO proveedor VALUES('$nombreProveedor','$telefono', '$email')");
if($statement->execute()){
echo 1 ;
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
	echo "No se enviaron datos...";
}

?>