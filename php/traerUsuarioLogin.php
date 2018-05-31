<?php
   session_start();
   require_once 'PDO.php';


   if($_POST!=null){

    $idUsuario =$_POST["idUsuario"];
    $clave=$_POST["password"];
    $password=hash('sha512',$clave);
    

    $statement=$conexion->prepare('SELECT * FROM usuario WHERE idUsuario=:id and contrasena=:pass');
   $statement->execute(
    array(
    ':id'=>$idUsuario,
    ':pass'=>$password)
    );

   $re=$statement->fetch(\PDO::FETCH_ASSOC);

    if($re!=null){
    
    if($re['estado']=='Habilitado'){

    $_SESSION['id']=$re['idUsuario'];
    $_SESSION['nombre']=$re['nombreUsuario'];
    $_SESSION['tipo']=$re['tipoUsuario'];

    echo json_encode($re);

     }
   
     else{
    echo json_encode(null);
          }
    }

    else{
    echo json_encode(null);
    }
    
  }
  else{
    echo "No se envio ningún dato a validar para realizar login..";
  }
?>