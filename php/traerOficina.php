<?php
   require_once 'PDO.php';


   if($_POST!=null){

    $nombreOficina =$_POST["nombreOficina"];
    $statement=$conexion->prepare('SELECT * FROM oficina WHERE nombreOficina=:nombre');
   $statement->execute(
    array(
    ':nombre'=>$nombreOficina));
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