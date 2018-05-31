<?php
   require_once 'PDO.php';


   if($_POST!=null){

    $dependencia =$_POST["dependencia"];
    $oficina =$_POST["oficina"];


    $statement=$conexion->prepare('SELECT * FROM dependencia WHERE nombreDependencia=:nom and nombreOficina=:ofi');
   $statement->execute(
    array(
  ':nom'=>$dependencia,
   ':ofi'=>$oficina
   ));
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