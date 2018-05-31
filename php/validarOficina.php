<?php
   require_once 'PDO.php';

    /*$nombreOficina = mysql_real_escape_string('nombre');*/

   if($_POST!=null){

    $nombreOficina =$_POST["nombreOficina"];
    $statement=$conexion->prepare('SELECT nombreOficina FROM oficina WHERE nombreOficina=:nombre');
   $statement->execute(
    array(
    ':nombre'=>$nombreOficina));
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