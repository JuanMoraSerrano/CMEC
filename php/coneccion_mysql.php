<?php
 $server = "localhost";
	$user = "root";
	$password = "";
	$bd = "cmec_db";

 $conexion2 = mysqli_connect($server, $user, $password, $bd);
	if (!$conexion2){ 
		die('Error');	
	}	
?>