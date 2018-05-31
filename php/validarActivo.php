<?php
   require_once 'PDO.php';

    /*$nombreOficina = mysql_real_escape_string('nombre');*/

   if($_POST!=null){

    $activo =$_POST["activo"];
    $statement=$conexion->prepare('SELECT activo FROM equipo WHERE activo=:act');
   $statement->execute(
    array(
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