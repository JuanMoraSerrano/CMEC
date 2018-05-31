<?php
 
require_once 'PDO.php';


if($_POST!=null){

try{
	
$tipo=$_POST["tipo"];
$activo=$_POST["activo"];
$serie=$_POST["serie"];
$oficina=$_POST["oficina"];
$contrato=$_POST["contrato"];
$garantia=$_POST["garantia"];
$marca=$_POST["marca"];
$modelo=$_POST["modelo"];
$dependencia=$_POST["dependencia"];
/*$traspaso=$_POST["traspaso"];*/

$statement=$conexion->prepare('UPDATE equipo SET tipoEquipo=:ti,serie=:ser,oficina=:ofi,dependencia=:dep,contrato=:con,garantia=:gar,marca=:mar,modelo=:mo WHERE activo=:act');

if($statement->execute(
     array(
      ':ti'=>$tipo,
      ':ser'=>$serie,
       ':ofi'=>$oficina,
       ':dep'=>$dependencia,
       ':con'=>$contrato,
       ':gar'=>$garantia,
       ':mar'=>$marca,
       ':mo'=>$modelo,
       ':act'=>$activo
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