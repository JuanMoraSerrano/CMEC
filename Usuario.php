<?php
session_start();

if(isset($_SESSION['nombre']) && isset($_SESSION['tipo'])){

   if($_SESSION['tipo']=='Administrador'){
     header('location:Administrador.php');
   }

      if($_SESSION['tipo']=='Tecnico'){
     header('location:Tecnico.php');
   }
}

else{
   header('location: index.php'); 
}

include_once 'views/Usuario.view.php';
?>



