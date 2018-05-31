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
<script type="text/javascript" src="js/js-propios/ArranquePaginaAdministrador.js"></script>
<script type="text/javascript" src="js/js-propios/LogicaPaginaAdministrador.js"></script>
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

      		                <li class="dropdown">
      						<a href="" class="dropdown-toggle" data-toggle="dropdown" role="button">
      						  Ingresar <span class="caret"></span>
      						</a>
                         	<ul class="dropdown-menu">
                          <li><a href="#ventanaIngresarEquipo" data-toggle="modal" onclick="modoAgregar(); obtenerUbicacion();obtenerNumFacturayProveedor();obtenerTipoEquipo()">Ingresar Equipo</a></li>
                         	<li class="divider"></li>
                         	<li><a href="#ventanaIngresarFactura" data-toggle="modal" onclick="modoAgregar();obtenerProveedores()"  >Ingresar Compra</a></li>
                         	<li><a href="#ventanaIngresarOficina" data-toggle="modal" onclick="modoAgregar()">Ingresar Oficina</a></li>
                        	 <li><a href="#ventanaIngresarUsuario" data-toggle="modal" onclick="modoAgregar()">Ingresar Usuario</a></li>
                        	 <li><a href="#ventanaIngresarTraspaso" data-toggle="modal" onclick="modoAgregar()">Ingresar Traspaso</a></li>
                        	 <li><a href="#ventanaIngresarProveedor" data-toggle="modal" onclick="modoAgregar()">Ingresar Proveedor</a></li>
                         	</ul>
      					</li>
      					<!-- <li><a> Generar Reporte</a></li> -->


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
 
      					<li onclick="mostrarHistorial()"><a> Historial</a></li>
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
                          <button id="agregarTipo" class="btn btn-primary" onclick="limpiarFormularioNuevoTipo()">
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
            
              <div class="form-group" id="grupoUbicacion">
                <div class="row">
                  <div>
                    <div class="input-group">
                      <span class="input-group-addon"><label class="requerido">*</label> Oficina</span>
                      <select class="form-control" name="ubicacion" id="ubicacion" style="border-top-left-radius:0;" onkeypress="return soloLetras(event)" onchange="return validarUbicacion()">
                         
                      </select>
                    </div>
                  </div>
                  <div>
                </div>
                </div> 
              </div>

          
            <div class="form-group" id="grupoSeñas">
                 <div class="row"> 
            <div class="col-xs-10 col-sm-11">  
                  
                    <div class="input-group">
                      <span class="input-group-addon"> Dependencia</span>
                    <select disabled="disabled" class="form-control" name="otrasSenas" id="otrasSenas" style="border-top-left-radius:0;" onkeypress="return soloLetras(event)" onchange="return validarUbicacionSeñas()">
                         <option value=''>-- Sin Seleccionar --</option>
                      </select>
                    </div>

             
                  <div>
                </div>
                </div> 
              

                        <div class="col-xs-2 col-sm-1">
                        <a href="#ventanaNuevaDependencia" data-toggle="modal">
                          <button disabled="disabled" id="agregarDependencia" class="btn btn-primary">
                            <span class="glyphicon glyphicon-plus"></span>
                          </button>
                        </a>
                      </div>
                      </div>
                      </div>  
                   

 

<!-- 
   <div class="form-group" id="grupoSeñas" style="padding-top:0px;margin-top: 0px">                  
       <input  class="form-control" type="text" name="otrasSenas" id="otrasSenas" onkeypress="return soloAlfanumericos(event)" placeholder="+ Otras Señas" onchange="return validarUbicacionSeñas()">
      </div> -->


    <div class="form-group" id="grupoFactura">
    <div class="input-group">

      <span  class="input-group-addon"><label class="requerido">*</label> N° Contrato</span>
      <select class="form-control" style="border-bottom-left-radius:0;border-top-left-radius:0" name="factura" id="factura" type="text"  onchange="return validarFactura()"></select>
      </div>
       </div>


<!--     <div class="form-group" id="grupoFactura">
		<div class="input-group">

			<span  class="input-group-addon"><label class="requerido">*</label> N°Factura-proveedor</span>
			<select class="form-control" style="border-bottom-left-radius:0;border-top-left-radius:0" name="factura" id="factura" type="text"  onchange="return validarFactura()"></select>
	   	</div>
       </div> -->
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

<!--     <div class="form-group" id="grupoIP">
		<div class="input-group">
		<span class="input-group-addon">Dirección IP</span>
    <input class="form-control" name="IP" id="IP" type="tel" maxlength="15" min="0" onkeypress="return soloNumerosYPuntos(event)" onchange="return validarIP()">
         </div>
		</div> -->

                <div class="form-group" id="grupoGarantia">
              <div class="input-group">

            <span  class="input-group-addon"><label class="requerido">*</label> Garantía</span>
           <input class="form-control" name="garantia" id="garantia"  type="number" min="0" max="60" required maxlength="2" onkeypress="return soloNumeros(event)" onchange="return validarGarantia()">
            <span  class="input-group-addon">Meses</span>
            </div>
                </div>

<!-- 		<div class="form-group" id="grupoTraspaso">

        <div class="input-group">
        <span  class="input-group-addon">Número de traspaso</span>
		    <input class="form-control" name="traspaso" id="traspaso" type="number" min="0" onkeypress="return soloNumeros(event)" onchange=   "return validarTraspaso()">
           </div>

		   </div> -->

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
        <span class="glyphicon glyphicon-floppy-save"></span> Agregar
        </button>
           </div>
                </div>

        </div>
      </div>
      
    </div>
  </div>



                                  <!-- VENTANA NUEVA DEPENDENCIA -->



        <div class="modal fade" id="ventanaNuevaDependencia" role="dialog" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog" style="margin-top:3px">
    
      <!-- Modal content-->
      <div class="modal-content" style="overflow:hidden">
        <div class="modal-header" style="padding-bottom:5px">
          <button type="button" class="close" data-dismiss="modal" onclick="limpiarFormularioNuevaDependencia()">&times;</button>
          <center><h2 id="tituloNuevaDependencia" class="modal-title" style="color:#286090"> <span class=" icon-office"></span> Nueva Dependencia  <span class="icon-home"></span> </h2></center></h2></center>
        </div>
        <div class="modal-body">


        <form id="formularioNuevaDependencia" class="form-horizontal">
            <div class="form-group" id="grupoNuevaDependencia">
          <div class="input-group">
      
      <span class="input-group-addon"><label class="requerido">*</label> Nombre Dependencia</span>
<input class="form-control" type="text" name = "nuevaDependencia" id="nuevaDependencia" onchange="validarNuevaDependencia()">
            </div>
            </div>
           </form>
           <div class="modal-footer" style="padding-bottom:0px;margin-bottom:0px;margin-top:0px">
          <div class="form-group">
                    <button id="btnLimpiarFormularioEquipo" class="btn btn-default" onClick="limpiarFormularioNuevaDependencia()"><span class="glyphicon glyphicon-erase"></span> Limpiar</button>
        <button id="btnNuevaDependencia" class="btn btn-primary" onclick="return validarFormularioNuevaDependencia()">
        <span class="glyphicon glyphicon-floppy-save"></span> Agregar
        </button>
           </div>
                </div>

        </div>
      </div>
      
    </div>
  </div>








                                                        <!-- VENTANA  FACTURA -->





 <div class="modal fade" id="ventanaIngresarFactura"  data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog" style="margin-top:3px">
        <div class="modal-content" style="overflow:hidden">

             		<div class="modal-header">
                <button tyle="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="limpiarFormularioFactura(this);">&times;</button>
             		<center><h2 id="tituloVentanaFactura" class="modal-title" style="color:#286090"> Ingresar Compra <span class="icon-document2"></span></h2></center>
             		</div>

  	      <div class="modal-body">
           <form action="ingresarFactura.php" method="POST" class="form-horizontal" id="formularioFactura">

		          <div class="form-group" id="grupoNumeroFactura">
		          <div class="input-group ">

			       <span class="input-group-addon"><label class="requerido">*</label> Número de Procedimiento</span>
             <input class="form-control" type="number" maxlength="15" name= "numeroFactura" id="numeroFactura" min="0" required onkeypress="return soloNumeros(event)" onchange="return validarNumeroFactura()">
           	</div>
            </div>

		         <div class="form-group" id="grupoProveedor" >
		        <div class="input-group">

			      <span  class="input-group-addon"><label class="requerido">*</label> Proveedor</span>

            <select class="form-control" name= "proveedor" id="proveedor" required style="border-bottom-left-radius:0;border-top-left-radius:0" onchange="return validarProveedor()">
            </select>
		           </div>
		          </div>


		          <div class="form-group" id="grupoOrden" >
		          <div class="input-group">

			         <span  class="input-group-addon"><label class="requerido">*</label>Nº Contrato</span>
              <input class="form-control" name="orden" id="orden" min="0" required onkeypress="return soloAlfanumericos(event)" onchange="return validarOrdenCompra()">
		           </div>
		           </div>



             <div class="form-group" id="grupoFecha">
		        <div class="input-group">

			     <span  class="input-group-addon"><span class=" icon-calendar5"></span> <label class="requerido">*</label> Fecha de Ingreso</span>

              <div class="input-group date fechaEspecial">
         <input type="text" class="form-control" name="fecha" id="fecha" maxlength="10" style="border-bottom-left-radius:0;border-top-left-radius:0" required onkeypress="return soloParaFechas(event)" onchange="return validarFechaIngreso()"><span class="input-group-addon"><i class="glyphicon glyphicon-th"></i></span>
         </div>
		        </div>
     	        </div>
            <div class="form-group" id="grupoPreaviso">
		         <div class="input-group">

		         <span class="input-group-addon"><span class="icon-alarm"></span> Fecha preaviso</span>
		         <input class="form-control" name="preaviso" id="preaviso"  type="text" disabled>
             </div>
		           </div>

		          <div class="form-group" id="grupoObsolescencia">
		          <div class="input-group">

		          <span class="input-group-addon"><span class="icon-clock2"></span> Fecha de Obsolescencia</span>
		          <input class="form-control" name="obsolescencia" id="obsolescencia" type="text" disabled>
             </div>
		         </div>


           </form>

         </div>


             	<div class="modal-footer" style="padding-bottom:1px;margin-bottom:0px,margin-top:0px">
                	<div class="form-group">
			          <button class="btn btn-default" id = "btnLimpiarFormularioFactura" onClick="limpiarFormularioFactura(this)"><span class=" glyphicon glyphicon-erase">
			          </span> Limpiar</button>
				   <button id="btnGuardarFactura" class="btn btn-primary" onClick="return validarFormularioFactura(); cantidadRegistrosHistorial()">

				           <span class="glyphicon glyphicon-floppy-save"></span> Guardar
				           </button>

                   </div>
             	</div>

   	 </div>
  </div>

 </div>



                                    <!--           VENTANA PROVEEDOR    -->





             <div class="modal fade" id="ventanaIngresarProveedor"  data-keyboard="false" data-backdrop="static">
             	<div class="modal-dialog">
             	<div class="modal-content">

             		<div class="modal-header">
                <button tyle="button" class="close" data-dismiss="modal" aria-hidden="true" onClick="limpiarFormularioProveedor(this)">
             		&times;</button>
             		<center><h2 id="tituloVentanaProveedor" class="modal-title" style="color:#286090">Ingresar Proveedor <span class=" icon-users"></span></h2></center>
             		</div>

             		<div class="modal-body">


             			<form action="ingresarProveedor.php" method="POST" class="form-horizontal"  id="formularioProveedor">

		       <div class="form-group" id="grupoNombreProveedor">
		      <div class="input-group ">

			<span class="input-group-addon"><label class="requerido">*</label> Nombre Proveedor</span>
      <input class="form-control" type="text" name= "nombreProveedor" id="nombreProveedor" onkeypress="return soloAlfanumericosYPuntos(event)" onchange="return validarNombreProveedor()">
           	</div>
            </div>

    <div class="form-group" id="grupoTelefono" >
		<div class="input-group">

			<span  class="input-group-addon"><label class="requerido">*</label> Teléfono</span>
     <input class="form-control" name = "telefono"  id="telefono" type="tel" maxlength="8" min="0"  onkeypress="return soloNumeros(event)" onchange="return validarTelefono()">
		</div>
		</div>


		<div class="form-group" id="grupoEmail" >
		<div class="input-group">

			<span  class="input-group-addon">E-mail</span>
    <input class="form-control" name = "email" id="email" type="email" onkeypress="return soloParaEmails(event)" onchange="return validarEmail()">
    </div>
		</div>
     </form>
     </div>
           <div class="modal-footer">
             			 <div class="form-group">
			    <button id="btnLimpiarFormularioProveedor" class="btn btn-default" onClick="limpiarFormularioProveedor(this)"><span class=" glyphicon glyphicon-erase">
			    </span> Limpiar</button>
				<button id="btnGuardarProveedor" class="btn btn-primary" onClick="return validarFormularioProveedor()">
				<span  class="glyphicon glyphicon-floppy-save"></span> Guardar
				</button>
		       </div>
             		</div>


             	</div>

             	</div>

             </div>




                                                <!-- VENTANA OFICINA -->










      <div class="modal fade" id="ventanaIngresarOficina"  data-keyboard=”false” data-backdrop="static">
             	<div class="modal-dialog">
             	<div class="modal-content">

             		<div class="modal-header">
             		<button tyle="button" class="close" data-dismiss="modal" aria-hidden="true" onClick="limpiarFormularioOficina(this)">&times;</button>
             		<center><h2 id="tituloVentanaOficina" class="modal-title" style="color:#286090">Ingresar Oficina <span class=" icon-office"></span></h2></center>
             		</div>

             		<div class="modal-body">


             			<form action="ingresarOficina.php" method="POST" class="form-horizontal" id="formularioOficina">

		       <div class="form-group" id="grupoNombreOficina">
		      <div class="input-group ">

			<span class="input-group-addon"><label class="requerido">*</label> Nombre Oficina</span>
<input class="form-control" type="text" name = "nombreOficina" id="nombreOficina" required onkeypress="return soloLetras(event)" onchange="return validarNombreOficina()">
           	</div>
            </div>

    <div class="form-group" id="grupoCodigo" >
		<div class="input-group">

			<span  class="input-group-addon"><label class="requerido">*</label> Código de Oficina</span>
<input class="form-control" name = "codigoOficina" id="codigoOficina" type="text" required onkeypress="return soloAlfanumericos(event)" onchange="return validarCodigoOficina()">
		</div>
		</div>

          </form>
           </div>

		<div class="modal-footer">
             			 <div class="form-group">
			    <button id="btnLimpiarFormularioOficina" class="btn btn-default" onClick="limpiarFormularioOficina(this)"><span class=" glyphicon glyphicon-erase">
			    </span> Limpiar</button>
				<button id="btnGuardarOficina" class="btn btn-primary" onClick="return validarFormularioOficina()">
				<span class="glyphicon glyphicon-floppy-save"></span> Guardar
				</button>
		       </div>
             		</div>

             	</div>

             	</div>

             </div>





                                     <!--            VENTANA USUARIO     -->







                <div class="modal fade" id="ventanaIngresarUsuario"  data-keyboard=”false” data-backdrop="static">
             	<div class="modal-dialog">
             	<div class="modal-content">

             		<div class="modal-header">
             		<button tyle="button" class="close" data-dismiss="modal" aria-hidden="true" onClick="limpiarFormularioUsuario(this)">
             		&times;</button>
             		<center><h2 id="tituloVentanaUsuario" class="modal-title" style="color:#286090">Ingresar Usuario <span class="icon-user-plus"></span></h2></center>
             		</div>

             		<div class="modal-body">


             			<form action="ingresarUsuario.php" method="POST" class="form-horizontal" id="formularioUsuario">

                  <div class="form-group" id="grupoId">
		      <div class="input-group ">

			<span class="input-group-addon"><label class="requerido">*</label> Cédula</span>
<input class="form-control" type="text" name = "idUsuario" id="idUsuario" maxlength="15" min="0" required onkeypress="return soloAlfanumericosSinEspacio(event)" onchange="return validarIdUsuario()">
           	</div>
            </div>
     <div class="form-group" id="grupoNombreUsuario">
		      <div class="input-group ">

			<span class="input-group-addon"><label class="requerido">*</label> Nombre Usuario</span>
       <input class="form-control" name= "nombreUsuario" type="text" id="nombreUsuario" required onkeypress="return soloLetras(event)" onchange="return validarNombreUsuario()">
           	<i class="glyphicon glyphicon-user form-control-feedback "></i>
           	</div>
            </div>

     <div class="form-group" id="grupoTipoUsuario" >
		<div class="input-group">

			<span  class="input-group-addon"><label class="requerido">*</label> Tipo Usuario</span>
			<select class="form-control" name= "tipoUsuario" id="tipoUsuario" required>

				<option value="Administrador">Administrador</option>
				<option value="Tecnico">Técnico</option>
        </select>

		</div>
		</div>

   <div class="form-group" id="grupoInhabilitarUsuario" style="display:none">
    <div class="btn-group" data-toggle="buttons">
 <label class="btn btn-danger" value="true" id="etiquetaBtnInhabilitarUsuario" onClick="inhabilitarUsuario()">

<input type="radio" id="btnInhabilitarUsuario">Inhabilitar usuario <span class="glyphicon glyphicon-ban-circle">
          </span>
     </label>
     </div>
           </div>
         </form>
          </div>

             		<div class="modal-footer">
             			 <div class="form-group">
			    <button id="btnLimpiarFormularioUsuario" class="btn btn-default" onClick="limpiarFormularioUsuario(this)"><span class=" glyphicon glyphicon-erase">
			    </span> Limpiar</button>
				<button id="btnGuardarUsuario" class="btn btn-primary" onClick="return validarFormularioUsuario()">
				<span class="glyphicon glyphicon-floppy-save"></span> Guardar
				</button>
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





                                         <!--      VENTANA HISTORIAL  -->





              <div class="modal fade" id="ventanaHistorial"  data-keyboard="false" data-backdrop="static" style="overflow:hidden">
              <div class="modal-dialog" style="margin-top:1px;width: 100%;height: 100%">
              <div class="modal-content">

                <div class="modal-header" style="padding-bottom:1px;padding-top:3px">
                <button tyle="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="limpiarFormularioHistorial()">
                &times;</button>
                <center><h2 class="modal-title" style="color:green"><span class="glyphicon glyphicon-pencil"></span>  REGISTRO DE ACTIVIDAD <span class="glyphicon glyphicon-list-alt"></span></h2></center>
                </div>

                   <div class="modal-body" style="overflow:scroll;height:600px">
                        <table id="tablaHistorial" class="table  table-striped table-bordered table-hover table-responsive">
        <thead>


     <tr class="success"><th>ID-Nombre de Autor</th><th>Descripción evento</th><th>Objeto  gestionado</th><th>Fecha</th><th>Hora</th></tr>
     </thead>
     <tbody>
    </tbody>

         </table>

                 </div>

                 </div>

                </div>

             </div>







                                         <!--      VENTANA TRASPASOS  -->





              <div class="modal fade" id="ventanaIngresarTraspaso"  data-keyboard="false" data-backdrop="static" style="overflow:hidden">
              <div class="modal-dialog" style="margin-top:1px;width: 100%;height: 100%">
              <div class="modal-content">

                <div class="modal-header" style="padding-bottom:1px;padding-top:3px">
                <button tyle="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="limpiarFormularioTraspasos()">
                &times;</button>
                <center><h2 class="modal-title" style="color:gray"><span class="glyphicon glyphicon-list-alt"> </span> TRASPASO DE MOBILIARIO DE EQUIPO <span class="icon-laptop"></span> <span class="icon-truck"></span></h2></center>
                </div>

                   <div class="modal-body" style="overflow:scroll;height:600px">


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
       Oficina</th><th>Depend</th><th>Contrato</th><th>Procedim</th><th>Proveedor</th><th> Fecha Ingr</th><th>Garant</th><th>Obsoles</th><th>EnUso</th></tr></thead>
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
				<li role="presentation" id="liFacturas">
				<a href="#listadoFacturas" arial-controls="listadoFacturas" data-toggle="tab" role="tab" style="font-weight: bold;">Compras</a></li>
       <li role="presentation" id="liTraspasos">
        <a href="#listadoTraspasosConfirmados" arial-controls="listadoTraspasosConfirmados" data-toggle="tab" role="tab" style="font-weight: bold;">Traspasos</a></li>
        <li role="presentation" id="liProveedores">
        <a href="#listadoProveedores" arial-controls="listadoProveedores" data-toggle="tab" role="tab" style="font-weight: bold;">Proveedores</a></li>
				<li role="presentation" id="liUsuarios">
        <a href="#listadoUsuarios" arial-controls="listadoUsuarios" data-toggle="tab" role="tab" style="font-weight: bold;">Usuarios</a></li>
        <li role="presentation" id="liOficinas">
				<a href="#listadoOficinas" arial-controls="listadoOficinas" data-toggle="tab" role="tab" style="font-weight: bold;">Oficinas</a></li>


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
       Oficina</th><th>Depend</th><th>Garant</th><th>Contrato</th><th>Procedim</th><th>Proveedor</th><th> Fecha Ingr</th><th>Obsoles</th><th>EnUso</th></tr></thead>

        <tbody id="cuerpoTablaEquipos">
        </tbody>
      </table>
   	   </div>
       </div>



                                              <!--PESTAÑA LISTADO FACTURAS -->





 <div class="tab-pane" role="tabpanel" id="listadoFacturas">

            <div class="panel-body" style="overflow-x:auto;"><!-- style="margin-top:0px;height:425px; overflow:auto;padding-left:2px;padding-right:2px;"  -->

           <table id="tablaFacturas" class="table  table-striped table-bordered table-hover table-responsive ">
          <thead>


      <tr class="success"><th>N° Contrato</th><th>Nº Procedimiento</th><th>Proveedor</th><th> Fecha Ingreso</th><th>Fecha Obsolescencia</th></tr>
      </thead>
      <tbody>

              </tr>
        </tbody>
        </table>

       </div>
       </div>



                                                 <!--PESTAÑA LISTADO PROVEEDORES -->



       <div class="tab-pane" role="tabpanel" id="listadoProveedores">

            <div class="panel-body" style="overflow-x:auto;"> <!-- style="padding-left:2px;padding-right:2px;margin-top:0px;height:425px; overflow:auto;" -->

           <table id="tablaProveedores" class="table  table-striped table-bordered table-hover table-responsive">

          <thead>

      <tr class="success"><th>Nombre Proveedor</th><th>Teléfono</th><th>E-mail</th></tr>
      </thead>

        <tbody>
        </tbody>
        </table>
       </div>
       </div>



                                      <!--PESTAÑA LISTADO USUARIOS -->



         <div class="tab-pane" role="tabpanel" id="listadoUsuarios">

            <div class="panel-body" style="overflow-x:auto;"> <!-- style="padding-left:2px;padding-right:2px;margin-top:0px;height:425px; overflow:auto;" -->

           <table id="tablaUsuarios" class="table  table-striped table-bordered table-hover table-responsive ">


          <thead>


      <tr class="success"><th>ID</th><th>Nombre</th><th>Tipo de Usuario</th><th>¿Habilitado?</th></tr>
      </thead>

         <tbody>

        </tbody>
        </table>
      </div>
       </div>



                                                 <!--PESTAÑA LISTADO OFICINAS -->



           <div class="tab-pane" role="tabpanel" id="listadoOficinas">

            <div class="panel-body" style="overflow-x:auto;"><!--  style="padding-left:2px;padding-right:2px;margin-top:0px;height:425px; overflow:auto;" -->

                <table id="tablaOficinas" class="table  table-striped table-bordered table-hover table-responsive">


          <thead>


      <tr class="success"><th>Nombre de Oficina</th><th>Código de Oficina</th></tr>
      </thead>

       <tbody>
        </tbody>


        </table>

       </div>
       </div>


          <div class="tab-pane" role="tabpanel" id="listadoTraspasosConfirmados">

          <div class="panel-body" style="padding-left:0px;padding-right:0px;margin-top:0px; overflow-x:auto;">

               <table id="tablaTraspasosConfirmados" class="table table-striped table-bordered table-hover table-responsive">
            
            <thead>
       <tr class="success"><th>Autor</th><th>Nº Traspaso</th><th>Fecha</th><th>Origen</th><th>Destino</th><th>
       Act ó Serie</th><th>Observaciones</th></thead>

        <tbody id="cuerpoTablaTraspasosConfirmados">
        </tbody>
      </table>
       </div>
       </div>

       </div><!-- cierre content -->
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