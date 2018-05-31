<?php
   require_once 'PDO.php';

   if($_POST!=null){

    $ip =$_POST["IP"];
    $serie=$_POST["serie"];

    $statement=$conexion->prepare('SELECT * FROM equipo WHERE ip=:ipe and serie!=:ser');
   $statement->execute(
    array(
  ':ipe'=>$ip,
  ':ser'=>$serie));
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