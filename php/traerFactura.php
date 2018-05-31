<?php
   require_once 'PDO.php';


   if($_POST!=null){

    $numeroFactura =$_POST["numeroFactura"];
    $proveedor=$_POST["proveedor"];

    $statement=$conexion->prepare('SELECT * FROM compra WHERE numeroProcedimiento=:numF and proveedor=:pro');
   $statement->execute(
    array(
    ':numF'=>$numeroFactura,
    ':pro'=>$proveedor
    )
     
                        );
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