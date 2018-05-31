<?php
   require_once 'PDO.php';

   

   if($_POST!=null){

    $numeroFactura =$_POST["numeroFactura"];
    $proveedor =$_POST["proveedor"];
    
    $statement=$conexion->prepare('SELECT numeroProcedimiento,proveedor FROM compra WHERE numeroProcedimiento=:id and proveedor=:prov');
   $statement->execute(
    array(
    ':id'=>$numeroFactura,
    ':prov'=>$proveedor));
   $re=$statement->fetch();

    if($re!=null){

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