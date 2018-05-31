<?php
session_start();

require_once 'php/PDO.php';

if(isset($_SESSION['nombre']) && isset($_SESSION['tipo'])){

   if($_SESSION['tipo']=='Administrador'){
     header('Location: Administrador.php');
   }

    if($_SESSION['tipo']=='Tecnico'){
     header('Location: Tecnico.php');
   }

    if($_SESSION['tipo']=='USUARIO'){
     header('Location: Usuario.php');
   }
}

require_once 'views/Login.view.php';
?>

