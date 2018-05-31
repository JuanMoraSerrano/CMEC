<?php
   require_once 'PDO.php';


   if($_POST!=null){

    $tipo =$_POST["tipo"];
    $statement=$conexion->prepare('SELECT * FROM tipoequipo WHERE nombreTipoEquipo=:nom');
   $statement->execute(
    array(
  ':nom'=>$tipo));
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