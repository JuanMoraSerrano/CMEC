<?php
 
require_once 'PDO.php';


if($_POST!=null){

try{
	

$nombreAnterior=$_POST["nombreAnterior"];

$nombreNuevo=$_POST["nombreProveedor"];
$telefonoNuevo=$_POST["telefono"];
$emailNuevo=$_POST["email"];

$statement=$conexion->prepare('UPDATE proveedor SET nombreProveedor=:nombre,telefono=:tel, email=:correo WHERE 
	nombreProveedor=:nombreAnterior');
if($statement->execute(
     array(
       ':nombre'=>$nombreNuevo,
       ':tel'=>$telefonoNuevo,
       ':correo'=>$emailNuevo,
       ':nombreAnterior'=>$nombreAnterior
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