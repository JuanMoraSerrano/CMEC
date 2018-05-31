<?php
 
require_once 'PDO.php';


if($_POST!=null){

try{
	
$idUsuario=$_POST["idUsuario"];

$statement=$conexion->prepare("UPDATE usuario SET estado='Inhabilitado' WHERE 
	idUsuario=:id");
if($statement->execute(array(':id'=>$idUsuario))){
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