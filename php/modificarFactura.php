<?php
 
require_once 'PDO.php';


if($_POST!=null){

try{
	

$numeroFactura=$_POST["numeroFactura"];
$proveedor=$_POST["proveedor"];

$nuevoNumeroProcedimiento=$_POST["nuevoNumeroProcedimiento"];
$nuevoProveedor=$_POST["nuevoProveedor"];
$ordenNueva=$_POST["orden"];
$fechaNueva=$_POST["fecha"];
$preaviso=$_POST["preaviso"];
$obsolescencia=$_POST["obsolescencia"];

$contratoViejo=$_POST["contratoViejo"];


$statement=$conexion->prepare('UPDATE compra SET numeroProcedimiento=:numPro, proveedor=:proNue, contrato=:ord,fecha=:fec,preaviso=:pre,obsolescencia=:obs WHERE 
	numeroProcedimiento=:numF and proveedor=:pro');
if($statement->execute(
     array(
       ':numPro'=>$nuevoNumeroProcedimiento,
       ':proNue'=>$nuevoProveedor,
       ':ord'=>$ordenNueva,
       ':fec'=>$fechaNueva,
       ':pre'=>$preaviso,
       ':obs'=>$obsolescencia,
       ':numF'=>$numeroFactura,
       ':pro'=>$proveedor
     	)
	   )){
  
  $statement2=$conexion->prepare("UPDATE equipo SET contrato='$ordenNueva' WHERE 
  contrato='$contratoViejo'");
$statement2->execute();
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