<?php
   require_once 'PDO.php';


   if($_POST!=null){

    $idUsuario =$_POST["idUsuario"];
    $statement=$conexion->prepare('SELECT * FROM usuario WHERE idUsuario=:id');
   $statement->execute(
    array(
    ':id'=>$idUsuario));
   $re=$statement->fetch(\PDO::FETCH_OBJ);

    if($re!=null){
     echo json_encode($re);
    }
    else
    {
    echo json_encode(null);
    }
  }
  else{
    echo "No se envio ningún dato a validar..";
  }
?>