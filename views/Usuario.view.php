<!DOCTYPE html>
<html lang= "en">

<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<meta name="viewport" content="width-device-width, initial-scale=1">
<title>Administración-CMEC</title>


<link href='img/TSE1.ico' rel='shortcut icon' type='image/x-icon'>
<link rel="stylesheet" type="text/css" href="Administrador_files/bootstrap.css">
<link rel="stylesheet" type="text/css" href="css/Estilos.css">
<link href="Administrador_files/translator.css" id="SL_Style" type="text/css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="TSE-Iconos/style.css">
<link rel="stylesheet" type="text/css" href="sweetalert-master/sweetalert.css">
<link rel="stylesheet" type="text/css" href="bootstrap-datepicker/css/bootstrap-datepicker.css">
<link rel="stylesheet" type="text/css" href="DataTables/datatables.min.css">

<link href="css/font-awesome.css" rel="stylesheet" type="text/css">
<link href="css/responsive.css" rel="stylesheet" type="text/css">
<link href="css/animate.css" rel="stylesheet" type="text/css">

<script src="sweetalert-master/sweetalert.min.js"></script>
<script type="text/javascript" src="js/js-propios/ArranquePaginaUsuario.js"></script>
<script type="text/javascript" src="js/js-propios/LogicaPaginaUsuario.js"></script>
<script type="text/javascript" src="js/moment.js"></script>
<script type="text/javascript" src="js/wow.js"></script>

</head>


<!--                      INICIO DEL BODY    -->


<body style="padding-top:49px">
<span class="ir-arriba icon-circle-up"></span> <!--  BOTON DE IR ARRIBA -->
<header style="padding-bottom:0px;margin-bottom: 0px">                   



<!--                         BARRA DE NAVEGACION -->


		<nav class="navbar navbar-default navbar-fixed-top navbar-inverse">

			<div class="container-fluid">

				<div class="navbar-header">

 					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#barraNavegacion">
 						<span class="sr-only">Menu</span>
 						<span class="icon-bar"></span>
 						<span class="icon-bar"></span>
 						<span class="icon-bar"></span>
 					</button>
 					<a onclick="recargar()" href="" class="navbar-brand" style="padding-left:27px;padding-right:10px">TSE</a>

 				</div>
          <div class="collapse navbar-collapse" id="barraNavegacion" >

      				<ul class="nav navbar-nav">
 
  
               	<li><a href="#ventanaAcercaDe" data-toggle="modal"> Acerca de</a></li>

      				</ul>

        <ul class="nav navbar-nav navbar-right">
      <li><label style="display: inline-block;color:#9d9d9d;padding-top:15.5px;padding-left:15px"><?php echo $_SESSION['nombre'];?></label></li>
       <li><a href="php/cerrarSesion.php" style="padding-right:25px"> Salir <span class="icon-switch"></span></a></li>
       </ul>
 </div>
 </div>
</nav>

         <div class="row">
		<div class="jumbotron col-lg-12"> <!-- INICIO DE LA PRIMER FILA (JUMBOTRON) -->

      		<div class="container-fluid">


                     <img class="img-responsive pull-left hidden-xs col-sm-2 col-md-2 col-lg-1" src="img/TSE1.jpg" style="padding:8px;" alt="Responsive image">

                    <img class="img-responsive pull-left col-xs-12 hidden-sm hidden-md hidden-lg" src="img/TSE.jpg" style="padding:8px;" alt="Responsive image">

      				<div class="hidden-xs col-sm-10 col-md-10 col-lg-11">
      				<h2 class="letra"><strong>Control y Mantenimiento de Equipo de Cómputo.</strong></h2>
      				</div>
                     <div class="col-xs-12 hidden-sm hidden-md hidden-lg">
      				<center><h1 class="letra"><strong>C.M.E.C</strong></h1></center>
      				</div>

           </div>
           </div> <!-- CIERRE DEl jumbotron -->
           </div>
		</header><!-- /header -->




                                         <!-- VENTANA ACERCA DE -->



      <div class="modal fade" id="ventanaAcercaDe"  data-keyboard=”false” data-backdrop="static" >
        <div class="modal-dialog" style="margin-top:0px;width: 100%;height: 100%;padding-bottom:0px;margin-bottom:0px">
              <div class="modal-content" style="padding-bottom:0px;margin-bottom:0px">

                <div class="modal-header">
                <button tyle="button" class="close" data-dismiss="modal" aria-hidden="true" >&times;</button>
                <center><h2 id="tituloVentanaAcercaDe" class="modal-title" style="color:inherit"> <span class="icon-user-tie"></span>   Team Masters <span class="icon-briefcase"></span></h2></center>
                </div>

                <div class="modal-body">


                  <div class="container">
                  <div class="row">
                       <div class="col hidden-xs hidden-sm col-md-2 col-lg-3">
                         
                       </div>
                        <div class="team-leader-block clearfix" style="padding-bottom: 0px;margin-bottom: 0px">
                            <div class="team-leader-box">
                                <div class="team-leader wow fadeInDown delay-03s"> 
                                    <div class="team-leader-shadow"><a href="#"></a></div>
                                    <img src="img/team-leader-pic1.jpg" alt="">
                                    <ul>
                                        <li><a href="https://www.facebook.com/juan.moraserrano" target="_blank" class="icon-facebook"></a></li>
                                        <li><a href="mailto:tocheserrano1@gmail.com" target="_blank" class="icon-mail"></a></li>
                                        <li><a href="https://plus.google.com/116856644058897753171?hl=es" target="_blank" class="icon-google-plus"></a></li>
                                    </ul>
                                </div>
                                <h4 class="wow fadeInDown delay-03s">Juan Mora Serrano</h4>
                                <span class="wow fadeInDown delay-03s">Phone:83531812</span>
                                <span class="wow fadeInDown delay-03s">Developer</span>
                                <p class="wow fadeInDown delay-03s">Universidad Nacional de Costa Rica</p>
                                <img src="img/una.PNG">
                            </div>
                            <div class="team-leader-box">
                                <div class="team-leader wow fadeInDown delay-09s"> 
                                    <div class="team-leader-shadow"><a href="#"></a></div>
                                    <img src="img/team-leader-pic4.jpg" alt="">
                                    <ul>
                                        <li><a href="https://www.facebook.com/franciscojavier.viquez.1" target="_blank" class="icon-facebook"></a></li>
                                        <li><a href="mailto:fjviquez@gmail.com" target="_blank" class="icon-mail"></a></li>
                                        <li><a href="https://plus.google.com/u/0/108570134133675279074" target="_blank" class="icon-google-plus"></a></li>
                                  </ul>
                                </div>
                                <h4 class="wow fadeInDown delay-09s">Francisco Viquez Peñaranda</h4>
                                <span class="wow fadeInDown delay-09s">Phone: 83291045</span>
                                <span class="wow fadeInDown delay-09s">Developer</span>
                                <p class="wow fadeInDown delay-09s">Universidad Nacional de Costa Rica</p>
                                <img src="img/una.PNG">
                            </div>
                        </div>
                          </div>
        

                  </div>
                    </div> <!-- container -->
                    

                <script>
                    wow = new WOW(
                      {
                        animateClass: 'animated',
                        offset:       400
                      }
                    );
                    wow.init();
                
                  </script>



              </div>


       </div>


           </div>

     </div>

              </div>



              
                                


                 <!--               PANEL CENTRAL Y SUS PESTAÑAS -->




        <div class="panel panel-default" id="divCentral" role="tabpanel" style="margin:0px 3px">

        <div class="panel-heading">
        <ul class="nav nav-tabs" role="tablist" id="menuDeTabs">
        <li role="presentation" class="active" id="liSCTI">
        <a href="#panelSCTI" arial-controls="panelSCTI" data-toggle="tab" role="tab" style="font-weight: bold;">S.C.T.I</a></li>
   			<li role="presentation" id="liEquipos">
				<a href="#listadoEquipos" arial-controls="listadoEquipos" data-toggle="tab" role="tab" style="font-weight: bold;">Equipos</a></li>
			    </ul>
           </div>

        <div class="tab-content">


                                               <!-- PESTAÑA S.C.T.I -->



           <div class="tab-pane active" role="tabpanel" id="panelSCTI">
              <div class="panel-body"  padding-bottom: 0px; margin:0px;">
                <img class="img-responsive pull-left" src="img/TSE4.png" alt="Responsive image">

              </div>
       </div>



                                                   <!--PESTAÑA LISTADO EQUIPO -->



   <div class="tab-pane" role="tabpanel" id="listadoEquipos">

          <div class="panel-body" style="padding-left:0px;padding-right:0px;margin-top:0px; overflow-x:auto;">

               <table id="tablaEquipos" class="table table-striped table-bordered table-hover table-responsive">
            
            <thead>
       <tr class="success"><th>Tipo</th><th>Activo</th><th>Serie</th><th>Marca</th><th>Modelo</th><th>
       Ubicación</th><th>Traspaso</th><th>IP</th><th>EnUso</th></tr></thead>

        <tbody id="cuerpoTablaEquipos">
        </tbody>
      </table>
   	   </div>
       </div>




</body>                      <!--     CIERRE DEL BODY -->


                           <!--   LINKS BIBLIOTECAS  -->


  <script type="text/javascript" src="Administrador_files/jquery.js"></script>
  <script type="text/javascript" src="DataTables/datatables.min.js"></script>
  <script type="text/javascript" src="bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
  <script type="text/javascript" src="bootstrap-datepicker/locales/bootstrap-datepicker.es.min.js"></script>
 <script type="text/javascript" src="Administrador_files/bootstrap.js"></script>

 <script type="text/javascript">
   $(document).ready(function(){

    iniciar();
   });
 </script>

</html>

<!-- #286090 -->