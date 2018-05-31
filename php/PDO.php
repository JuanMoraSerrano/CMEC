<?php

	try{
$conexion= new PDO('mysql:host=localhost;dbname=cmec_db','root','');

}
catch(PDOE $e){
echo "Error no se pudo conectar a la base de datos: ".$e->getMessage();
die();
}

?>