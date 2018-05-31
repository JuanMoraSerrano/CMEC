<?php
 
require_once 'PDO.php';


if($_POST!=null){

try{
	
$serie=$_POST["serie"];

$statement=$conexion->prepare("UPDATE equipo SET estado='True' WHERE serie=:ser");
$statement->execute(array(':ser'=>$serie));
if($statement->rowCount()==1){
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