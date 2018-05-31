<?php
   require_once 'PDO.php';

   if($_POST!=null){

    $traspaso =$_POST["traspaso"];
    $statement=$conexion->prepare('SELECT traspaso FROM equipo WHERE traspaso=:tras');
   $statement->execute(
    array(
  ':tras'=>$traspaso));
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