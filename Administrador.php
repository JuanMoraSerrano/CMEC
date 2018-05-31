<?php
session_start();

if(isset($_SESSION['nombre']) && isset($_SESSION['tipo'])){

   if($_SESSION['tipo']=='Tecnico'){
     header('location:Tecnico.php');
   }

      if($_SESSION['tipo']=='USUARIO'){
     header('location:Usuario.php');
   }
}

else{
   header('location: index.php'); 
}

include_once 'views/Administrador.view.php';
?>



