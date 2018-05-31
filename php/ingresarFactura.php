<?php
 
require_once 'PDO.php';

if($_POST!=null){

try{
	 $numeroFactura=$_POST["numeroFactura"];
	 $proveedor=$_POST["proveedor"];
	 $orden=$_POST["orden"];
	 $fecha=$_POST["fecha"];
	 $preaviso=$_POST["preaviso"];
	 $obsolescencia=$_POST["obsolescencia"];

	


$statement=$conexion->prepare("INSERT INTO compra VALUES('$numeroFactura','$proveedor','$orden','$fecha','$preaviso','$obsolescencia')");

/*$statement=$conexion->prepare('INSERT INTO factura (numeroFactura) VALUES (numeroFact)');
*/
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
	
}


?>