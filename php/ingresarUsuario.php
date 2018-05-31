<?php
 
require_once 'PDO.php';

if($_POST!=null){
try{

	$idUsuario=$_POST["idUsuario"];
	$nombreUsuario=$_POST["nombreUsuario"];
	$tipoUsuario=$_POST["tipoUsuario"];

	$password=hash('sha512',$idUsuario);

$statement=$conexion->prepare("INSERT INTO usuario VALUES('$idUsuario','$nombreUsuario', '$tipoUsuario', '$password', 'Habilitado')");
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
echo "No se han enviado datos...";
die();
}

?>