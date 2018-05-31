<?php
   require_once 'PDO.php';

   if($_POST!=null){

    $ip =$_POST["IP"];
    $activo=$_POST["activo"];

    $statement=$conexion->prepare('SELECT * FROM equipo WHERE ip=:ipe and activo!=:act');
   $statement->execute(
    array(
  ':ipe'=>$ip,
  ':act'=>$activo));
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