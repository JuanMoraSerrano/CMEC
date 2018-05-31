<?php
   require_once 'PDO.php';

   if($_POST!=null){

    $contrato =$_POST["contrato"];
    $statement=$conexion->prepare('SELECT contrato FROM compra WHERE contrato=:con');
   $statement->execute(
    array(
  ':con'=>$contrato));
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