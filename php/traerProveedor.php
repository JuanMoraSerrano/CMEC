<?php
   require_once 'PDO.php';


   if($_POST!=null){

    $nombreProveedor =$_POST["nombreProveedor"];
    $statement=$conexion->prepare('SELECT * FROM proveedor WHERE nombreProveedor=:nombre');
   $statement->execute(
    array(
    ':nombre'=>$nombreProveedor));
   $re=$statement->fetch(\PDO::FETCH_OBJ);

    if($re!=null){
     echo json_encode($re);
    }
    else
    {
    echo('Error');
    }
  }
  else{
    echo "No se envio ningún dato a validar..";
  }
?>