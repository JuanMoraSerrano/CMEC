<?php
 
require_once 'PDO.php';


if($_POST!=null){

try{
	
$numeroFactura=$_POST["numeroFactura"];
$proveedor=$_POST["proveedor"];

$statement=$conexion->prepare("UPDATE factura SET anulada='True' WHERE numeroFactura=:num and proveedor=:pro");
if($statement->execute(array(':num'=>$numeroFactura,':pro'=>$proveedor))){
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