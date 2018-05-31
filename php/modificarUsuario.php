<?php
 
require_once 'PDO.php';


if($_POST!=null){

try{
	

$idUsuario=$_POST["idUsuario"];

$nombreNuevo=$_POST["nombreUsuario"];
$tipoNuevo=$_POST["tipoUsuario"];

$statement=$conexion->prepare('UPDATE usuario SET nombreUsuario=:nombre,tipoUsuario=:tipo WHERE 
	idUsuario=:id');
if($statement->execute(
     array(
       ':nombre'=>$nombreNuevo,
       ':tipo'=>$tipoNuevo,
       ':id'=>$idUsuario
     	)
	   )){
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