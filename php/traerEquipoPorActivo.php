<?php
   require_once 'PDO.php';


   if($_POST!=null){

    $activo =$_POST["activo"];
    $statement=$conexion->prepare('SELECT * FROM equipo WHERE activo=:act');
   $statement->execute(
    array(
    ':act'=>$activo));
   $re=$statement->fetch(\PDO::FETCH_OBJ);

    if($re!=null){
     echo json_encode($re);
    }
    else
    {
    echo('Error');
    }
  }
  else{
    echo "No se envio ningún dato a validar..";
  }
?>