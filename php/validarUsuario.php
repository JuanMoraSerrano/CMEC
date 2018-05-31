<?php
   require_once 'PDO.php';

    

   if($_POST!=null){

    $idUsuario =$_POST["idUsuario"];
    $statement=$conexion->prepare('SELECT idUsuario FROM usuario WHERE idUsuario=:id');
   $statement->execute(
    array(
    ':id'=>$idUsuario));
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