<?php
session_start(); 
require_once 'PDO.php';

if($_POST!=null){
try{

    if(isset($_SESSION['id'])){
     $idUsuario=$_SESSION['id'];    

	$contrasena=$_POST["contrasena"];
    $clave=hash('sha512',$contrasena);


	$nuevaContrasena=$_POST["nuevaContrasena"];
    $nuevaClave=hash('sha512',$nuevaContrasena);

$statement=$conexion->prepare("UPDATE usuario SET contrasena = :pass WHERE idUsuario= :id and contrasena= :cont");
$statement->execute(array(':id'=>$idUsuario,':pass'=>$nuevaClave,':cont'=>$clave));
if($statement->rowCount() == 1){
echo 1;
}
else{
    echo 0;
}

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
echo "No se han enviado datos...";
die();
}

?>