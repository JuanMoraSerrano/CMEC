<?php
   require_once 'PDO.php';

   if($_POST!=null){

    $serie =$_POST["serie"];
    $statement=$conexion->prepare('SELECT serie FROM equipo WHERE serie=:ser');
   $statement->execute(
    array(
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