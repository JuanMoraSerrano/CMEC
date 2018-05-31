<?php
 
require_once 'PDO.php';


if($_POST!=null){

try{
	

$nombreAnterior=$_POST["nombreAnterior"];

$nombreNuevo=$_POST["nombreOficina"];
$codigoNuevo=$_POST["codigoOficina"];

$statement=$conexion->prepare('UPDATE oficina SET nombreOficina=:nombre,codigoOficina=:codigo WHERE 
	nombreOficina=:nombreAnterior');
if($statement->execute(
     array(
       ':nombre'=>$nombreNuevo,
       ':codigo'=>$codigoNuevo,
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