<?php
session_start();

if(isset($_SESSION['nombre']) && isset($_SESSION['tipo'])){

   if($_SESSION['tipo']=='Administrador'){
     header('location:Administrador.php');
   }

      if($_SESSION['tipo']=='USUARIO'){
     header('location:Usuario.php');
   }
}

else{
   header('location: index.php'); 
}

include_once 'views/Tecnico.view.php';
?>



