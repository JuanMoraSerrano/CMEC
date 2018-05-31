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
<script type="text/javascript" src="js/js-propios/ArranquePaginaTecnico.js"></script>
<script type="text/javascript" src="js/js-propios/LogicaPaginaTecnico.js"></script>
<script type="text/javascript" src="js/js-propios/Validaciones.js"></script>
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



                                 <!-- Ventana opciones -->
                 <li class="dropdown">
               <a href="" class="dropdown-toggle" data-toggle="dropdown" role="button">
             
                    Opciones <span class="caret"></span>
                  </a>
                  <ul class="dropdown-menu">
                          <li><a href="#ventanaCambiarContrasena" data-toggle="modal" onclick="">Cambiar Contraseña</li>
                            <li href="#ventanaReportes" data-toggle="modal" onclick=""><a> Reportes por rangos de fecha</a></li>
                          </ul>
                  </li>
 
  
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




		                                             <!-- VENTANA Ingresar EQUIPO -->



 <div class="modal fade" id="ventanaIngresarEquipo" data-keyboard="false" data-backdrop="static">
     <div class="modal-dialog" style="margin-top:3px">
        	<div class="modal-content" style="overflow:hidden">

             	<div class="modal-header" style="padding-bottom:5px">

             	<button tyle="button" class="close" data-dismiss="modal" aria-hidden="true" onClick="limpiarFormularioEquipo(this);obtenerTipoEquipo();obtenerUbicacion();obtenerNumFacturayProveedor();">&times;</button>
             		<center><h2 id="tituloVentanaEquipo" class="modal-title" style="color:#286090">Ingresar Equipo <span class="glyphicon glyphicon-save"></span></h2></center>
             		</div>

             		<div class="modal-body" style="padding-bottom:0px">

          <form action="ingresarEquipo.php" method="POST" class="form-horizontal" id="formularioEquipo">

              <div class="form-group" id="grupoTipoEquipo">
                <div class="row">
                  <div class="col-xs-10 col-sm-11">
                    <div class="input-group">
                      <span class="input-group-addon"><label class="requerido">*</label> Tipo</span>
                      <select  class="form-control"  name="tipoEquipo" id="tipoEquipo" onchange="validarTipoEquipo()">
                         
                      </select>
                    </div>
                  </div>
                  <div class="col-xs-2 col-sm-1">
                        <a href="#ventanaNuevoTipo" data-toggle="modal" id="a-nuevoTipo">
                          <button id="agregarTipo" class="btn btn-primary" onclick="obtenerTipoEquipo();limpiarFormularioNuevoTipo()">
                            <span class="glyphicon glyphicon-plus"></span>
                          </button>
                        </a>
                      </div>
                </div> 
              </div>

		         <div class="form-group" id="grupoActivo">
		         <div class="input-group ">

			                 <span class="input-group-addon">Número de Activo</span>
                    <input class="form-control" maxlength="6" name="activo" id="activo" type="number" max="999999" min="0" pattern="^([0-9])*$" onkeypress="return soloNumeros(event)" onchange="return validarActivo()" >
           	</div>
            </div>

            <div class="form-group" id="grupoSerie">
             <div class="input-group">
             <span class="input-group-addon">Número de serie</span>
             <input class="form-control" type="text" name="serie" id="serie" onkeypress="return soloAlfanumericosGuionMedioYSlash(event)" onchange="return validarSerie()">
          </div>
           </div>
            

            <div class="form-group" id="grupoUbicacion" style="padding-bottom: 0px;margin-bottom: 0px">
                <div class="row">
                  <div>
                    <div class="input-group">
                      <span class="input-group-addon"><label class="requerido">*</label> Ubicacion</span>
                      <select class="form-control" name="ubicacion" id="ubicacion" style="border-top-left-radius:0;" onkeypress="return soloLetras(event)" onchange="return validarUbicacion()">
                         
                      </select>
                    </div>
                  </div>
                  <div>
                </div>
                </div> 
              </div>




   <div class="form-group" id="grupoSeñas" style="padding-top:0px;margin-top: 0px">                  
       <input  class="form-control" type="text" name="otrasSenas" id="otrasSenas" onkeypress="return soloAlfanumericos(event)" placeholder="+ Otras Señas" onchange="return validarUbicacionSeñas()">
      </div>




    <div class="form-group" id="grupoFactura">
		<div class="input-group">

			<span  class="input-group-addon"><label class="requerido">*</label> N°Factura-proveedor</span>
			<select class="form-control" style="border-bottom-left-radius:0;border-top-left-radius:0" name="factura" id="factura" type="text"  onchange="return validarFactura()"></select>
	   	</div>
       </div>
		    <div class="form-group" id="grupoMarca">
		    <div class="input-group">
		    	<span  class="input-group-addon"><label class="requerido">*</label> Marca del equipo</span>
         <input class="form-control" name="marca" id="marca" onkeypress="return soloLetras(event)" onchange="return validarMarca()">
	    	</div>
         	</div>

      <div class="form-group" id="grupoModelo">
		<div class="input-group">

		<span class="input-group-addon"><label class="requerido">*</label> Modelo</span>
     <input class="form-control" name="modelo" id="modelo" type="text" onkeypress="return soloAlfanumericosGuionMedioYSlash(event)" onchange="return validarModelo()">
          </div>
		  </div>

    <div class="form-group" id="grupoIP">
		<div class="input-group">
		<span class="input-group-addon">Dirección IP</span>
    <input class="form-control" name="IP" id="IP" type="tel" maxlength="15" min="0" onkeypress="return soloNumerosYPuntos(event)" onchange="return validarIP()">
         </div>
		</div>



		<div class="form-group" id="grupoTraspaso">

        <div class="input-group">
        <span  class="input-group-addon">Número de traspaso</span>
		    <input class="form-control" name="traspaso" id="traspaso" type="number" min="0" onkeypress="return soloNumeros(event)" onchange=   "return validarTraspaso()">
           </div>

		   </div>

       </form>

   </div>
           <div class="modal-footer" style="padding-bottom:0px;margin-bottom:0px;margin-top:0px">
             			 <div class="form-group">
			    <button id="btnLimpiarFormularioEquipo" class="btn btn-default" onClick="limpiarFormularioEquipo(this)"><span class="glyphicon glyphicon-erase"></span> Limpiar</button>
				<button id="btnGuardarEquipo" class="btn btn-primary" onClick="return validarFormularioEquipo()">
				<span class="glyphicon glyphicon-floppy-save"></span> Guardar
				</button>
		       </div>
             		</div>

             	</div>

             	</div>

             </div>





                                  <!-- VENTANA NUEVO TIPO -->



        <div class="modal fade" id="ventanaNuevoTipo" role="dialog" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog" style="margin-top:3px">
    
      <!-- Modal content-->
      <div class="modal-content" style="overflow:hidden">
        <div class="modal-header" style="padding-bottom:5px">
          <button type="button" class="close" data-dismiss="modal" onclick="limpiarFormularioNuevoTipo()">&times;</button>
          <center><h2 id="tituloNuevoTipo" class="modal-title" style="color:#286090"><span class="icon-printer4"></span> <span class=" icon-laptop"></span> Nuevo tipo de Equipo  <span class="icon-keyboard"></span> <span class="glyphicon glyphicon-hdd"></span></h2></center></h2></center>
        </div>
        <div class="modal-body">


        <form id="formularioNuevoTipo" class="form-horizontal">
            <div class="form-group" id="grupoNuevoTipo">
          <div class="input-group">
      
      <span class="input-group-addon"><label class="requerido">*</label> Nuevo Tipo</span>
<input class="form-control" type="text" name = "nuevoTipo" id="nuevoTipo" onchange="validarNuevoTipo()">
            </div>
            </div>
           </form>
           <div class="modal-footer" style="padding-bottom:0px;margin-bottom:0px;margin-top:0px">
          <div class="form-group">
                    <button id="btnLimpiarFormularioEquipo" class="btn btn-default" onClick="limpiarFormularioNuevoTipo()"><span class="glyphicon glyphicon-erase"></span> Limpiar</button>
        <button id="btnNuevoTipo" class="btn btn-primary" onclick="return validarFormularioNuevoTipo()">
        <span class="glyphicon glyphicon-floppy-save"></span> AGREGAR
        </button>
           </div>
                </div>

        </div>
      </div>
      
    </div>
  </div>






                      <!--            VENTANA CONTRASEÑA     -->







    <div class="modal fade" id="ventanaCambiarContrasena"  data-keyboard=”false” data-backdrop="static">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button tyle="button" class="close" data-dismiss="modal" aria-hidden="true" onClick="limpiarFormularioContrasena(this)">
            &times;</button>
            <center><h2 id="tituloVentanaContrasena" class="modal-title" style="color:#286090"><span class="icon-gears"></span> Cambio de Contraseña <span class="icon-tools-2"></span></h2></center>
          </div>

          <div class="modal-body">

            <form action="cambiarContrasena.php" method="POST" class="form-horizontal" id="formularioContrasena">

              <div class="form-group" id="grupoContrasena">
                <div class="input-group ">

                <span class="input-group-addon"><label class="requerido">*</label> Contraseña actual</span>
                <input class="form-control" type="password" name = "contrasena" id="contrasena" onchange="return validarContrasenaActual()">
                <i style="padding-top: 10px" class="icon-key form-control-feedback "></i>
                </div>
              </div>
              <div class="form-group" id="grupoNuevaContrasena">
                <div class="input-group ">

                <span class="input-group-addon"><label class="requerido">*</label> Nueva contraseña</span>
                <input class="form-control" name= "nuevaContrasena" type="password" id="nuevaContrasena" 
                onchange="return validarContrasena()">
                <i class="glyphicon glyphicon-lock form-control-feedback "></i>
                </div>
              </div>

              <div class="form-group" id="grupoRepetirContrasena">
                <div class="input-group ">

                <span class="input-group-addon"><label class="requerido">*</label> Repetir nueva contraseña</span>
                <input class="form-control" name= "repetirContrasena" type="password" id="repetirContrasena"  onchange="return validarConfirmacionContrasena()">
                <i class="glyphicon glyphicon-lock form-control-feedback "></i>
                </div>
              </div>

            </form>
          </div>

          <div class="modal-footer">
            <div class="form-group">
              <button id="btnLimpiarFormularioContrasena" class="btn btn-default" onClick="limpiarFormularioContrasena(this)"><span class=" glyphicon glyphicon-erase">
                </span> Limpiar</button>
                <button id="btnGuardarContrasena" class="btn btn-primary" onClick="return validarFormularioContrasena()">
                <span class="glyphicon glyphicon-floppy-save"></span> Guardar Cambios..
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>






                                         <!--      VENTANA REPORTES  -->





              <div class="modal fade" id="ventanaReportes"  data-keyboard="false" data-backdrop="static" style="overflow:hidden">
              <div class="modal-dialog" style="margin-top:1px;width: 100%;height: 100%">
              <div class="modal-content">

                <div class="modal-header" style="padding-bottom:1px;padding-top:3px">
                <button tyle="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="limpiarFormularioReportes()">
                &times;</button>
                <center><h2 class="modal-title" style="color:orange"><span class="glyphicon glyphicon-folder-open"> </span>  Reportes por rangos de fecha <span class=" glyphicon glyphicon-calendar"></span></h2></center>
                </div>

                <div class="modal-body">
                  
                 <form class="form-inline" id="formularioReportes">
                      <select class="form-control"  id="filtroColumna" required>
                      <option value="" selected>Filtrar por:</option>
                      <option value="f.fecha">FECHA DE INGRESO  ---> (de Equipos y sus respectivas Facturas).</option>
                      <option value="f.preaviso">FECHA DE PREAVISO  ---> (Fechas a 1 año de que el equipo quede obsoleto).</option>
                       <option value="f.obsolescencia">FECHA OBSOLESCENCIA  ---> (Fecha en que los Equipos cumplen 5 años de ingreso a la institución).</option>
                     </select>

                <div class="input-group date fechaInicio">
                <input placeholder="Fecha Inicio" type="text" class="form-control"  id="fechaIni" maxlength="10" style="border-bottom-left-radius:0;border-top-left-radius:0" required onkeypress="return soloParaFechas(event)" ><span class="input-group-addon"><i class="glyphicon glyphicon-th"></i></span>
                  </div>

                   <div class="input-group date fechaFinal">
                <input placeholder="Fecha Final" type="text" class="form-control"  id="fechaFin" maxlength="10" style="border-bottom-left-radius:0;border-top-left-radius:0" required onkeypress="return soloParaFechas(event)" ><span class="input-group-addon"><i class="glyphicon glyphicon-th"></i></span>
                  </div>

                             
                    <button type="button" class="btn btn-warning" onclick="return generarReporte()">
                    <span class="glyphicon glyphicon-search" style="font-size:15px"></span>
                    </button>

                 </form>

                </div>

                   <div class="modal-footer" style="overflow:scroll;height:515px;padding-right:30px">
        
        <table id="tablaReportes" class="table  table-striped table-bordered table-hover table-responsive">
        <thead>
       <tr class="success"><th>Tipo</th><th>Activo</th><th>Serie</th><th>Marca</th><th>Modelo</th><th>
       Ubicación</th><th>Traspaso</th><th>IP</th><th>Factura</th><th>Proveedor</th><th >Orden Compra</th><th> Fecha Ingr</th><th>Garantía</th><th>Obsoles</th><th>EnUso</th></tr>
      </thead>
     <tbody>
    </tbody>
   </table>

                 </div>

                 </div>

                </div>

             </div>





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
       Ubicación</th><th>Traspaso</th><th>IP</th><th>Factura</th><th>Proveedor</th><th >Orden Compra</th><th> Fecha Ingr</th><th>Garantía</th><th>Obsoles</th><th>EnUso</th></tr></thead>

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