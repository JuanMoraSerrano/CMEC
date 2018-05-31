<?php
   require_once 'PDO.php';

   if($_POST!=null){

    $ip =$_POST["IP"];
    $statement=$conexion->prepare('SELECT ip FROM equipo WHERE ip=:ipe');
   $statement->execute(
    array(
  ':ipe'=>$ip));
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