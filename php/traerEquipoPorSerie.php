<?php
   require_once 'PDO.php';


   if($_POST!=null){

    $serie =$_POST["serie"];
    $statement=$conexion->prepare('SELECT * FROM equipo WHERE serie=:ser');
   $statement->execute(
    array(
    ':ser'=>$serie));
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