<?php
   require_once 'PDO.php';

    /*$nombreOficina = mysql_real_escape_string('nombre');*/

   if($_POST!=null){

    $nombreProveedor =$_POST["nombreProveedor"];
    $statement=$conexion->prepare('SELECT nombreProveedor FROM proveedor WHERE nombreProveedor=:id');
   $statement->execute(
    array(
    ':id'=>$nombreProveedor));
   $re=$statement->fetch();

    if($re!=null)
    {
        $arreglo=[
       "resultado"  => "1"
        ];
        echo json_encode($arreglo);
    }
    else
    {
        $arreglo=[
       "resultado"  => "0"
        ];
        echo json_encode($arreglo);
    }
  }
  else{
    echo "No se envio ningún dato a validar..";
  }
?>