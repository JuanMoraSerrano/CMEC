
var modo=0;

const NEUTRO=0;
const AGREGAR=1;
const EDITAR=2;
const EDITANDO_SIN_ACTIVO=3;
const EDITANDO_SIN_SERIE=4;
const EDITANDO_CON_ACTIVO_Y_SERIE=5;
const FACTURA_ANULADA=6;
const USUARIO_INHABILITADO=7;
const EQUIPO_INHABILITADO=8;
const EQUIPO_HABILITADO=9;


var PROVEEDOR_MODIFICANDO_ACTUALMENTE="";
var OFICINA_MODIFICANDO_ACTUALMENTE="";

var CONTRATO_MODIFICANDO_ACTUALMENTE="";
var NUMERO_PROCEDIMIENTO_MODIFICANDO_ACTUALMENTE="";
var PROVEEDOR_DE_COMPRA_MODIFICANDO_ACTUALMENTE="";


var TABLA_OFICINAS="";
var TABLA_PROVEEDORES="";
var TABLA_USUARIOS="";
var TABLA_FACTURAS="";
var TABLA_EQUIPOS="";
var TABLA_HISTORIAL="";
var TABLA_REPORTES="";
var TABLA_TRASPASOS_CONFIRMADOS="";


function modoAgregar(){
  modo=AGREGAR;
}

function recargar(){
  window.parent.location.reload();
}

function generarReporte(){
  
    columna=document.getElementById("filtroColumna").value;
     fechaInicio=document.getElementById("fechaIni").value.trim();
     fechaFinal=document.getElementById("fechaFin").value.trim();

     if(columna == null || columna.length == 0 || /^\s+$/.test(columna)){
      swal("Información!", "Debe llenar todos los campos..");
      return false;
    }

     if(fechaInicio == null || fechaInicio.length == 0 || /^\s+$/.test(fechaInicio)){
      swal("Información!", "Debe llenar todos los campos..");
      return false;
    }
     if(fechaFinal == null || fechaFinal.length == 0 || /^\s+$/.test(fechaFinal)){
      swal("Información!", "Debe llenar todos los campos..");
      return false;
    }

        var tmp=$('#tablaReportes').DataTable();
        tmp.destroy();
        $("#tablaReportes > tbody").empty();  

         diaFechaInicio=fechaInicio.slice(0,2);
         mesFechaInicio=fechaInicio.slice(3,5);
         añoFechaInicio=fechaInicio.slice(6,10);

         diaFechaFinal=fechaFinal.slice(0,2);
         mesFechaFinal=fechaFinal.slice(3,5);
         añoFechaFinal=fechaFinal.slice(6,10);

         auxFechaInicio=añoFechaInicio+"-"+mesFechaInicio+"-"+diaFechaInicio;
         auxFechaFinal=añoFechaFinal+"-"+mesFechaFinal+"-"+diaFechaFinal;

     
    
      listaEquipos=resultadosReportesRangoFecha(columna,auxFechaInicio,auxFechaFinal);


       for(i=0;i<listaEquipos.length;i++){

       dis= listaEquipos[i];
 
        
         dia= dis["fecha"].slice(8,10);
         mes= dis["fecha"].slice(5,7);
         año= dis["fecha"].slice(0,4);

         dia2= dis["obsolescencia"].slice(8,10);
         mes2= dis["obsolescencia"].slice(5,7);
         año2= dis["obsolescencia"].slice(0,4);

                  // lineas para obtener la fecha de garantia
         caluculandoFechaGarantia = new Date(mes+"/"+dia+"/"+año);
       
         caluculandoFechaGarantia.setMonth(parseInt(caluculandoFechaGarantia.getMonth())+parseInt(dis["garantia"]));

         dia3=caluculandoFechaGarantia.getDate();
         mes3=caluculandoFechaGarantia.getMonth()+1;
         año3=caluculandoFechaGarantia.getFullYear();
            
       if(mes3<10 && dia3<10){
            mes3="0"+mes3;
            dia3="0"+dia3;
            }
       else{
          if(mes3<10 || dia3<10){
           if(mes3<10){
            mes3="0"+mes3;
            }

            if(dia3<10){
            dia3="0"+dia3;
            }

         }
       }
         
          fechaGarantia=año3+"-"+mes3+"-"+dia3;
       

       if(dis["estado"]=="True"){
          
           $("#tablaReportes").append("<tr><td>"+dis['tipoEquipo']+"</td><td>"+dis['activo']+"</td><td>"
            +dis['serie']+"</td><td>"+dis['marca']+"</td><td>"+dis['modelo']+"</td><td style = 'text-align: left'>"
            +dis['oficina']+"</td><td>"+dis['dependencia']+"</td><td>"+dis['contrato']+"</td><td>"
            +dis['numeroProcedimiento']+"</td><td>"+dis['proveedor']+"</td><td>"+dis['fecha']+"</td><td>"+fechaGarantia+"</td><td id='casillaObsolescencia"+i+"'>"
            +dis['obsolescencia']+"</td><td style='color:green'><b>"+dis['estado']+"</b></td></tr>");
       }
        else{
           
            $("#tablaReportes").append("<tr><td>"+dis['tipoEquipo']+"</td><td>"+dis['activo']+"</td><td>"
            +dis['serie']+"</td><td>"+dis['marca']+"</td><td>"+dis['modelo']+"</td><td style = 'text-align:left'>"
            +dis['oficina']+"</td><td>"+dis['dependencia']+"</td><td>"+dis['contrato']+"</td><td>"
            +dis['numeroProcedimiento']+"</td><td>"+dis['proveedor']+"</td><td>"+dis['fecha']+"</td><td>"+fechaGarantia+"</td><td id='casillaObsolescencia"+i+"'>"
            +dis['obsolescencia']+"</td><td style='color:gray'>"+dis['estado']+"</td></tr>");
        }

          fechaActu=moment().subtract(1460, 'days').calendar();
          mesAux= fechaActu.slice(0,2);
          diaAux= fechaActu.slice(3,5);
          añoAux= fechaActu.slice(6,10);

          fechaActualMenosCuatroAños=new Date(añoAux,mesAux-1,diaAux);
          fechaIngresoAux=new Date(año,mes-1,dia);
          fechaObsolescenciaAux=new Date(año2,mes2-1,dia2);

          if(fechaActualMenosCuatroAños >= fechaIngresoAux){
          document.getElementById('casillaObsolescencia'+i).setAttribute('style','color:#FBBA00;font-weight:bold');
            }

           if(new Date() >= fechaObsolescenciaAux){
          document.getElementById('casillaObsolescencia'+i).setAttribute('style','color:red;font-weight:bold');
          }  
     }
   
      $('#tablaReportes').DataTable({dom: 'Bfrtip',buttons: [ 'pdf', 'print'],"language":lenguaje_espanolReportes});
    

}

function actualizarListadoDeOficinas(){

   TABLA_OFICINAS=$('#tablaOficinas').DataTable({

      dom: 'Bfrtip',

      buttons: [  'pdf', 'print'],
      ajax:{
        "method":"POST",
        "url":"php/consultarOficinas.php" },
        "columns":[
        {"data":"nombreOficina"},
        {"data":"codigoOficina"},
       ],

      "bAutoWidth": false,

        "language":lenguaje_espanol
      });

}

function actualizarListadoDeTraspasosConfirmados(){

   TABLA_TRASPASOS_CONFIRMADOS=$('#tablaTraspasosConfirmados').DataTable({

      dom: 'Bfrtip',

      buttons: [  'pdf', 'print'],
      ajax:{
        "method":"POST",
        "url":"php/consultarTraspasosConfirmados.php" },
        "columns":[
        {"data":"usuario"},
        {"data":"traspaso"},
        {"data":"fecha"},
        {"data":"dep_origen"},
        {"data":"dep_destino"},
        {"data":"activo"},
        {"data":"observaciones"},
       ],

      "bAutoWidth": false,

        "language":lenguaje_espanol
      });

}




function actualizarListadoDeProveedores(){

   TABLA_PROVEEDORES=$('#tablaProveedores').DataTable({

      dom: 'Bfrtip',

      buttons: [  'pdf', 'print'],
      ajax:{
        "method":"POST",
        "url":"php/consultarProveedores.php" },
        "columns":[
        {"data":"nombreProveedor"},
        {"data":"telefono"},
        {"data":"email"},
       ],

      "bAutoWidth": false,

        "language":lenguaje_espanol 
      });
}

function actualizarListadoDeHistorial(){

/*fechaActual=moment().format('YYYY-MM-DD');

fechaInicioEspañol=moment().subtract(5, 'years').calendar();

            mes=fechaInicioEspañol.slice(0,2);
            dia=fechaInicioEspañol.slice(3,5);
            año=fechaInicioEspañol.slice(6,10);

 fechaInicioIngles=año+"-"+mes+"-"+dia;

*/
  TABLA_HISTORIAL=$('#tablaHistorial').DataTable({

      dom: 'Bfrtip',

      buttons: [  'pdf', 'print'],

      ajax:{
        "method":"POST",
        "url":"php/consultarHistorial.php",
        },
        "columns":[

        {"data":"autor"},
        {"data":"descripcion"},
        {"data":"idObjetoGestionado"},
       {"data":"fecha"},
        {"data":"hora"}

       ],

      "bAutoWidth": false,

        "language":lenguaje_espanol
      });
TABLA_HISTORIAL.column( '3:visible' ) .order( 'desc' );
}


function actualizarListadoDeUsuarios(){

  TABLA_USUARIOS=$('#tablaUsuarios').DataTable({

      dom: 'Bfrtip',

      buttons: [  'pdf', 'print'],
      ajax:{
        "method":"POST",
        "url":"php/consultarUsuarios.php" },
        "columns":[
        {"data":"idUsuario"},
        {"data":"nombreUsuario"},
        {"data":"tipoUsuario"},
        {"data":"estado"}
       ],

      "bAutoWidth": false,

        "language":lenguaje_espanol
      });
}

function actualizarListadoDeFacturas(){

  TABLA_FACTURAS=$('#tablaFacturas').DataTable({

      dom: 'Bfrtip',

      buttons: [  'pdf', 'print'],
      ajax:{
        "method":"POST",
        "url":"php/consultarFacturas.php" },

        "columns":[
        {"data":"contrato"},
        {"data":"numeroProcedimiento"},
        {"data":"proveedor"},
        {"data":"fecha"},
        {"data":"obsolescencia"}
       ],

      "bAutoWidth": false,

        "language":lenguaje_espanol
      });
}

function actualizarListadoDeEquipos(){

  TABLA_EQUIPOS=$('#tablaEquipos').DataTable({

      dom: 'Bfrtip',

      buttons: [  'pdf', 'print'],
      ajax:{
        "method":"POST",
        "url":"php/consultarEquipos.php" },

        "columns":[
        {"data":"tipoEquipo"},
        {"data":"activo"},
        {"data":"serie"},
        {"data":"marca"},
        {"data":"modelo"},
        {"data":"oficina"},
        {"data":"dependencia"},
        {"data":"garantia"},
        {"data":"contrato"},
        {"data":"numeroProcedimiento"},
        {"data":"proveedor"},
        {"data":"fecha"},
        {"data":"obsolescencia"},
        {"data":"estado"}
       ],

      "bAutoWidth": false,

        "language":lenguaje_espanol
      });
}



              //       LIMPIAR DE FORMULARIOS   //
function limpiarFormularioNuevoTipo(){
  document.getElementById("formularioNuevoTipo").reset();
       $("#grupoNuevoTipo").attr({
      class: 'form-group',
      title: ''
     });
       return;
}

function limpiarFormularioNuevaDependencia(){
  document.getElementById("formularioNuevaDependencia").reset();
       $("#grupoNuevaDependencia").attr({
      class: 'form-group',
      title: ''
     });
       return;
}

function limpiarFormularioEquipo(e){

  document.getElementById("formularioEquipo").reset();
         $("#grupoTipoEquipo").attr({
        class: 'form-group',
        title: ''
        });

       $("#grupoActivo").attr({
			class: 'form-group',
			title: ''
		 });

       $("#grupoUbicacion").attr({
			class: 'form-group',
			title: ''
		 });



     $("#grupoFactura").attr({
			class: 'form-group',
			title: ''
		 });



     $("#grupoMarca").attr({
			class: 'form-group',
			title: ''
		  });

     $("#grupoModelo").attr({
			class: 'form-group',
			title: ''
		  });
      $("#grupoSerie").attr({
			class: 'form-group',
			title: ''
		  });


     $("#grupoGarantia").attr({
			class: 'form-group',
			title: ''
		  });

        document.getElementById("tituloVentanaEquipo").innerHTML="";
		   $("#tituloVentanaEquipo").append("Ingresar Equipo <span class='glyphicon glyphicon-save'></span>");
        $("#tituloVentanaEquipo").css('color', '#286090');

		 $("#activo").removeAttr('disabled');
		 $("#serie").removeAttr('disabled');
    $("#garantia").removeAttr('disabled');

    document.getElementById("otrasSenas").setAttribute('disabled','disabled');
    document.getElementById("agregarDependencia").setAttribute('disabled','disabled');

	    document.getElementById("btnLimpiarFormularioEquipo").style.display = 'inline-block';
		 document.getElementById("btnGuardarEquipo").innerHTML="";
		 document.getElementById("btnGuardarEquipo").innerHTML="<span class='glyphicon glyphicon-floppy-save'></span> Guardar";

    if(e.innerHTML=="×"){
      modo=NEUTRO;
    }
}


function limpiarFormularioFactura(e){

     document.getElementById("formularioFactura").reset();

      $("#etiquetaBtnNoUso").attr("class","btn btn-success active");
     $("#etiquetaBtnSiUso").attr("class","btn btn-default");

     $("#grupoNumeroFactura").attr({
			class: 'form-group',
			title: ''
		  });


     $("#grupoProveedor").attr({
			class: 'form-group',
			title: ''
		  });



     $("#grupoOrden").attr({
			class: 'form-group',
			title: ''
		  });

     $("#grupoGarantia").attr({
			class: 'form-group',
			title: ''
		  });



     $("#grupoFecha").attr({
			class: 'form-group',
			title: ''
		  });
        document.getElementById("tituloVentanaFactura").innerHTML="";
		  $("#tituloVentanaFactura").append("Ingresar Compra <span class='icon-document2'></span>");
		  $("#tituloVentanaFactura").css('color', '#286090');

		  $("#numeroFactura").removeAttr('disabled');
		  $("#proveedor").removeAttr('disabled');
		  $("#orden").removeAttr('disabled');
		  
		  $("#fecha").removeAttr('disabled');


		  $("#btnGuardarFactura").removeAttr('disabled');

	    document.getElementById("btnLimpiarFormularioFactura").style.display = 'inline-block';
		  document.getElementById("btnGuardarFactura").innerHTML="";
		  document.getElementById("btnGuardarFactura").innerHTML="<span class='glyphicon glyphicon-floppy-save'></span> Guardar";


       if(e.id!="btnLimpiarFormularioFactura"){
         modo=NEUTRO;
       }

}



function limpiarFormularioProveedor(e){
     document.getElementById("formularioProveedor").reset();
     $("#grupoNombreProveedor").attr({
			class: 'form-group',
			title: ''
	      	});


       $("#grupoTelefono").attr({
		   	class: 'form-group',
			    title: ''
	 	    });



       $("#grupoEmail").attr({
			  class: 'form-group',
			  title: ''
		   });

        document.getElementById("tituloVentanaProveedor").innerHTML="";
		   $("#tituloVentanaProveedor").append("Ingresar Proveedor <span class='icon-users'></span>");
		   $("#tituloVentanaProveedor").css('color', '#286090');

	      document.getElementById("btnLimpiarFormularioProveedor").style.display = 'inline-block';
		    document.getElementById("btnGuardarProveedor").innerHTML="";
		    document.getElementById("btnGuardarProveedor").innerHTML="<span  class='glyphicon glyphicon-floppy-save'></span> Guardar";

         if(e.id!="btnLimpiarFormularioProveedor"){
         modo=NEUTRO;
       }
}

function limpiarFormularioOficina(e){
     document.getElementById("formularioOficina").reset();
      $("#grupoNombreOficina").attr({
			class: 'form-group',
			title: ''
		  });


      $("#grupoCodigo").attr({
			class: 'form-group',
			title: ''
		  });
         document.getElementById("tituloVentanaOficina").innerHTML="";
		 $("#tituloVentanaOficina").append("Ingresar Oficina <span class='icon-office'>");
		  $("#tituloVentanaOficina").css('color', '#286090');

	     document.getElementById("btnLimpiarFormularioOficina").style.display = 'inline-block';
	    	document.getElementById("btnGuardarOficina").innerHTML="";
		   document.getElementById("btnGuardarOficina").innerHTML="<span class='glyphicon glyphicon-floppy-save'></span> Guardar";
         if(e.id!="btnLimpiarFormularioOficina"){
         modo=NEUTRO;
       }
        }

function limpiarFormularioUsuario(e){
  
   document.getElementById("formularioUsuario").reset();

   $("#grupoId").attr({
			class: 'form-group',
			title: ''
		});


    $("#grupoNombreUsuario").attr({
			class: 'form-group',
			title: ''
		});


    document.getElementById("tituloVentanaUsuario").innerHTML="";
		$("#tituloVentanaUsuario").append("Ingresar Usuario <span class='icon-user-plus'></span>");
		$("#tituloVentanaUsuario").css('color', '#286090');

		$("#idUsuario").removeAttr('disabled');
    $("#nombreUsuario").removeAttr('disabled');
    $("#tipoUsuario").removeAttr('disabled');
    $("#etiquetaBtnInhabilitarUsuario").removeAttr('disabled');
    $("#btnInhabilitarUsuario").removeAttr('disabled');
    $("#btnGuardarUsuario").removeAttr('disabled');


	  document.getElementById("btnLimpiarFormularioUsuario").style.display = 'inline-block';
		document.getElementById("btnGuardarUsuario").innerHTML="";
		document.getElementById("btnGuardarUsuario").innerHTML="<span class='glyphicon glyphicon-floppy-save'></span> Guardar";

    document.getElementById("etiquetaBtnInhabilitarUsuario").style.display = 'none';
    document.getElementById("grupoInhabilitarUsuario").style.display = 'none'
      if(e.id!="btnLimpiarFormularioUsuario"){
         modo=NEUTRO;
       }
}



function limpiarFormularioContrasena(e){
   document.getElementById("formularioContrasena").reset();

   $("#grupoContrasena").attr({
      class: 'form-group',
      title: ''
    });


    $("#grupoNuevaContrasena").attr({
      class: 'form-group',
      title: ''
    });

    $("#grupoRepetirContrasena").attr({
      class: 'form-group',
      title: ''
    });

}

function limpiarFormularioReportes(){
  document.getElementById("formularioReportes").reset();
  $("#tablaReportes > tbody").empty();
}


function limpiarFormularioHistorial(){
    /*document.getElementById("formularioHistorial").reset();*/
}

                  //  AGREGAR-s //
function ingresar_O_editar_Equipo(){
	hayCambios=false;

  switch(modo){
  case AGREGAR:{
     
      tip=document.getElementById("tipoEquipo").value;
      act=document.getElementById("activo").value.trim();
      seri=document.getElementById("serie").value.trim();

      ubi=document.getElementById("ubicacion").value.trim();
      sennas=document.getElementById("otrasSenas").value.trim();

      mar=document.getElementById("marca").value.trim();
     
       model=document.getElementById("modelo").value.trim();
        gar=document.getElementById("garantia").value.trim();

        contrato=document.getElementById("factura").value.trim();
/*      ip=document.getElementById("IP").value.trim();
      tras=document.getElementById("traspaso").value.trim();*/

/*      arreglo=jsonConDatosDeFacturaEspecifica2(fac,prov);
      estado=arreglo["estado"];*/
  

      $.ajax({
       type:'POST',
       url:'php/ingresarEquipo.php',
       data:('tipoEquipo='+tip+'&activo='+act+'&serie='+seri+'&ubicacion='+ubi+'&sennas='+sennas+'&contrato='+contrato+'&marca='+mar+'&modelo='+model+'&gar='+gar+'&estado=True'),
       success:function(respuesta){

         if(respuesta==1){
         limpiarFormularioEquipo(document.getElementById("btnGuardarEquipo"));
         swal("Excelente!", "Equipo ingresado correctamente!", "success");
         guardarAccionEnHistorial("Ingreso de Equipo","Activo:"+act+"  "+"Serie:"+seri);
         }
           else{
           swal("Atención!", "El equipo no se ingresó!", "error");
           }

       }
     })

   modo=AGREGAR;
    
	break;
	} // cierre CASE AGREGAR
	 
   case EDITAR:{
             arreglo="";

            if(document.getElementById("activo").disabled==true){
             arreglo=jsonConDatosDeEquipoEspecificoPorActivo();
            }

           if(document.getElementById("serie").disabled==true){
            arreglo=jsonConDatosDeEquipoEspecificoPorSerie();
            }
             
            auxTipo=arreglo["tipoEquipo"];
            auxActivo=arreglo["activo"];
            auxSerie=arreglo["serie"];  
            
            auxOficina=arreglo["oficina"];
            auxDependencia=arreglo["dependencia"];


            auxFactura=arreglo["contrato"];  
           
            auxMarca=arreglo["marca"];  
            auxModelo=arreglo["modelo"];
             auxGarantia=arreglo["garantia"];     
          


            tmpTipo=document.getElementById("tipoEquipo").value;
            if(auxTipo!=tmpTipo){

                guardarAccionEnHistorial("Cambio del tipo de equipo de: "+auxTipo+" a "
              +tmpTipo, "Activo:"+auxActivo+"  "+"Serie:"+auxSerie);
          
                hayCambios=true;
            }


             tmpActivo=document.getElementById("activo").value.trim();
            if(auxActivo!=tmpActivo){

       guardarAccionEnHistorial("Cambio del activo del equipo de: "+auxActivo+" a "
            +tmpActivo, "Activo:"+tmpActivo+"  "+"Serie:"+auxSerie);
          
             hayCambios=true;
       }


            tmpSerie=document.getElementById("serie").value.trim();
           if(auxSerie!=tmpSerie){
                   

guardarAccionEnHistorial("Cambio de la serie del equipo de: "+auxSerie+" a "+tmpSerie, "Activo:"+auxActivo+"  "+"Serie:"+tmpSerie);
              hayCambios=true;
           }

         
          tmpUbicacion=document.getElementById("ubicacion").value.trim();
          
         if(auxOficina!=tmpUbicacion){

guardarAccionEnHistorial("Cambio de la oficina de ubicacion del equipo de: "+auxOficina+" a "+tmpUbicacion, "Activo:"+auxActivo+"  "+"Serie:"+auxSerie);

             hayCambios=true;

            }
  
             
           
            fac=document.getElementById("factura").value;

  
           if(auxFactura!=fac){

guardarAccionEnHistorial("Cambio del contrato del equipo de: "+auxFactura+" a "+fac, "Activo:"+auxActivo+"  "+"Serie:"+auxSerie);

hayCambios=true;
           
           }
           


            tmpMarca= document.getElementById("marca").value.trim();
  
          if(auxMarca!=tmpMarca){
         
guardarAccionEnHistorial("Cambio de la marca del equipo de: "+auxMarca+" a "+tmpMarca, "Activo:"+auxActivo+"  "+"Serie:"+auxSerie);


            hayCambios=true;
          } 
  

          tmpModelo=document.getElementById("modelo").value.trim();
          if(auxModelo!=tmpModelo){
           
guardarAccionEnHistorial("Cambio del modelo del equipo de: "+auxModelo+" a "+tmpModelo, "Activo:"+auxActivo+"  "+"Serie:"+auxSerie);

           hayCambios=true;
          }
  



           tmpGarantia= document.getElementById("garantia").value.trim();
         if(auxGarantia!=tmpGarantia){

guardarAccionEnHistorial("Cambio de la garantia del equipo de: "+auxGarantia+" meses a "+tmpGarantia+' meses', "Activo:"+auxActivo+"  "+"Serie:"+auxSerie);
              hayCambios=true;
         
            }


           tmpDependencia=document.getElementById("otrasSenas").value;
          if(auxDependencia!=tmpDependencia){

guardarAccionEnHistorial("Cambio de la dependencia del equipo: "+auxDependencia+" a "+tmpDependencia, "Activo:"+auxActivo+"  "+"Serie:"+auxSerie);

          
              hayCambios=true;
           }
     
     
          if(hayCambios){

            if(document.getElementById("activo").disabled==true && document.getElementById("serie").disabled==false){

                $.ajax({
                type:'POST',
                url:'php/modificarEquipoPorActivo.php',
                data:('activo='+tmpActivo+"&tipo="+tmpTipo+'&serie='+tmpSerie+'&oficina='+tmpUbicacion+'&contrato='+fac+
                  '&garantia='+tmpGarantia+'&marca='+tmpMarca+'&modelo='+tmpModelo+'&dependencia='+tmpDependencia),
                success:function(respuesta){
                if(respuesta==1){
                swal("Excelente!", "Equipo modificado correctamente!", "success");
                }
                 else{
                 swal("Atención!", "El equipo no se logró modificar!", "error");
                 }
               }
                })

            }

            if(document.getElementById("serie").disabled==true && document.getElementById("activo").disabled==false){
                $.ajax({
                type:'POST',
                url:'php/modificarEquipoPorSerie.php',
                data:('activo='+tmpActivo+"&tipo="+tmpTipo+'&serie='+tmpSerie+'&oficina='+tmpUbicacion+'&contrato='+fac+
                  '&garantia='+tmpGarantia+'&marca='+tmpMarca+'&modelo='+tmpModelo+'&dependencia='+tmpDependencia),
                success:function(respuesta){
                if(respuesta==1){
                swal("Excelente!", "Equipo modificado correctamente!", "success");
                }
                 else{
                 swal("Atención!", "El equipo no se logró modificar!", "error");
                 }
               }
                })
            }

                 if(document.getElementById("activo").disabled==true && document.getElementById("serie").disabled==true){
                $.ajax({
                type:'POST',
                url:'php/modificarEquipoPorActivo.php',
                data:('activo='+tmpActivo+"&tipo="+tmpTipo+'&serie='+tmpSerie+'&oficina='+tmpUbicacion+'&contrato='+fac+
                  '&garantia='+tmpGarantia+'&marca='+tmpMarca+'&modelo='+tmpModelo+'&dependencia='+tmpDependencia),
                success:function(respuesta){
                if(respuesta==1){
                swal("Excelente!", "Equipo modificado correctamente!", "success");
                }
                 else{
                 swal("Atención!", "El equipo no se logró modificar!", "error");
                 }
               }
                })
            }

            }
            else{
             swal("Bien!", "Se mantienen los datos!", "success");
           }

        limpiarFormularioEquipo(document.getElementById("btnGuardarEquipo"));
        modo=NEUTRO;
        $("#ventanaIngresarEquipo").modal("hide");
         break;
  }  // cierre del CASE EDITAR

  }// ciere del switch

}//cierre del metodo agregar o editar equipo


function ingresar_O_editar_Factura(){
	hayCambios=false;
  switch(modo){
	case AGREGAR:{
    numFac=document.getElementById("numeroFactura").value.trim();
    prov=document.getElementById("proveedor").value.trim();
	  ord=document.getElementById("orden").value.trim();


    fe=document.getElementById("fecha").value.trim();
            diaFec=fe.slice(0,2);
            mesFec=fe.slice(3,5);
            añoFec=fe.slice(6,10);
            fec=añoFec+"-"+mesFec+"-"+diaFec;

    av=document.getElementById("preaviso").value.trim();
            diaAvi=av.slice(0,2);
            mesAvi=av.slice(3,5);
            añoAvi=av.slice(6,10);
            avi=añoAvi+"-"+mesAvi+"-"+diaAvi;

	  ob=document.getElementById("obsolescencia").value.trim();
            diaOb=ob.slice(0,2);
            mesOb=ob.slice(3,5);
            añoOb=ob.slice(6,10);
            obs=añoOb+"-"+mesOb+"-"+diaOb;


   

    $.ajax({
    type:'POST',
    url:'php/ingresarFactura.php',
    data:('numeroFactura='+numFac+'&proveedor='+prov+'&orden='+ord+'&fecha='+fec+'&preaviso='+avi+'&obsolescencia='+obs),
    success:function(respuesta){

      if(respuesta==1){
      limpiarFormularioFactura(document.getElementById("btnGuardarFactura"));
      swal("Excelente!", "Compra ingresada correctamente!", "success");
      guardarAccionEnHistorial("Ingreso de Compra",numFac+"-"+prov);
      }
        else{
        swal("Atención!", "La Compra no se ingresó!", "error");
        }

    }
  })

  $("#ventanaIngresarFactura").modal("hide");
  break;
	}
	case EDITAR:{

            arreglo=jsonConDatosDeFacturaEspecifica();
            auxNumFactura=arreglo["numeroProcedimiento"];
            auxProveedor=arreglo["proveedor"];
            auxOrden=arreglo["contrato"];
            auxFech=arreglo["fecha"];
            auxPreaviso=arreglo["preaviso"];
            auxObsolescencia=arreglo["obsolescencia"];

            añoFechaRecibida=auxFech.slice(0,4);
            mesFechaRecibida=auxFech.slice(5,7);
            diaFechaRecibida=auxFech.slice(8,12);

           auxFecha=añoFechaRecibida+"-"+mesFechaRecibida+"-"+diaFechaRecibida;


            
          tmpNumeroProcedimiento=document.getElementById("numeroFactura").value.trim();
         if(auxNumFactura!=tmpNumeroProcedimiento){

guardarAccionEnHistorial("Cambio del numero de procedimiento de la compra de: "+auxNumFactura+" a "+tmpNumeroProcedimiento,auxNumFactura+"-"+auxProveedor);

          hayCambios=true;
         }

          tmpProveedor=document.getElementById("proveedor").value.trim();
         if(auxProveedor!=tmpProveedor){

guardarAccionEnHistorial("Cambio del proveedor de la compra de: "+auxProveedor+" a "+tmpProveedor,auxNumFactura+"-"+auxProveedor);

          hayCambios=true;
         }



          tmpOrden=document.getElementById("orden").value.trim();
         if(auxOrden!=tmpOrden){

guardarAccionEnHistorial("Cambio del contrato de la compra y los equipos ligados a la misma de: "+auxOrden+" a "+tmpOrden,auxNumFactura+"-"+auxProveedor);

          hayCambios=true;
         }

            tmpFech=document.getElementById("fecha").value.trim();
            diaFechaNueva=tmpFech.slice(0,2);
            mesFechaNueva=tmpFech.slice(3,5);
            añoFechaNueva=tmpFech.slice(6,10);

           tmpFecha=añoFechaNueva+"-"+mesFechaNueva+"-"+diaFechaNueva;


            tmpPreavis=document.getElementById("preaviso").value.trim();
            diaFechaPreavisoNueva=tmpPreavis.slice(0,2);
            mesFechaPreavisoNueva=tmpPreavis.slice(3,5);
            añoFechaPreavisoNueva=tmpPreavis.slice(6,10);

           tmpPreaviso=añoFechaPreavisoNueva+"-"+mesFechaPreavisoNueva+"-"+diaFechaPreavisoNueva;

            tmpObsolescenci=document.getElementById("obsolescencia").value.trim();
            diaFechaObsolescenciaNueva=tmpObsolescenci.slice(0,2);
            mesFechaObsolescenciaNueva=tmpObsolescenci.slice(3,5);
            añoFechaObsolescenciaNueva=tmpObsolescenci.slice(6,10);

           tmpObsolescencia=añoFechaObsolescenciaNueva+"-"+mesFechaObsolescenciaNueva+"-"+diaFechaObsolescenciaNueva;


         if(auxFecha!=tmpFecha){
guardarAccionEnHistorial("Cambio de la fecha de ingreso de la factura de: "+auxFecha+" a: "+tmpFecha+", tambien se modifican las fechas de preaviso y obsolescencia",auxNumFactura+"-"+auxProveedor);
guardarAccionEnHistorial("Cambio de la fecha de preaviso de la factura de: "+auxPreaviso+" a: "+tmpPreaviso,auxNumFactura+"-"+auxProveedor);
guardarAccionEnHistorial("Cambio de la fecha de obsolescencia de la factura de: "+auxObsolescencia+" a "+tmpObsolescencia,auxNumFactura+"-"+auxProveedor);


          hayCambios=true;
         }
  

     if(hayCambios){

      $.ajax({
      type:'POST',
      url:'php/modificarFactura.php',
      data:('numeroFactura='+auxNumFactura+"&proveedor="+auxProveedor+'&orden='+tmpOrden+"&contratoViejo="+auxOrden+'&fecha='+tmpFecha+'&preaviso='+tmpPreaviso+'&obsolescencia='+tmpObsolescencia+"&nuevoNumeroProcedimiento="+tmpNumeroProcedimiento+"&nuevoProveedor="+tmpProveedor),
      success:function(respuesta){
      if(respuesta==1){
     swal("Excelente!", "Compra modificada correctamente!", "success");
      }
        else{
        swal("Atención!", "La Compra no se logró modificar!", "error");
        }
     }
      })
      
     }

     else if(!hayCambios){
      swal("Bien!", "Se mantienen los datos!", "success");
     }
         CONTRATO_MODIFICANDO_ACTUALMENTE="";
         NUMERO_PROCEDIMIENTO_MODIFICANDO_ACTUALMENTE="";
         PROVEEDOR_DE_COMPRA_MODIFICANDO_ACTUALMENTE="";
         limpiarFormularioFactura(document.getElementById("btnGuardarFactura"));
        $("#ventanaIngresarFactura").modal("hide");
        break;
	}

   }

}

function ingresar_O_editar_Proveedor(){

	hayCambios=false;
  switch(modo){
	case AGREGAR:{
	//pvrs= retrieveListaDeProveedores("Proveedores");
	nom=document.getElementById("nombreProveedor").value.trim();
	tel=document.getElementById("telefono").value.trim();
	em=document.getElementById("email").value.trim();

  $.ajax({
    type:'POST',
    url:'php/ingresarProveedor.php',
    data:('nombreProveedor='+nom+'&telefono='+tel+'&email='+em),
    success:function(respuesta){
      if(respuesta==1){
      limpiarFormularioProveedor(document.getElementById("btnGuardarProveedor"));
      swal("Excelente!", "Proveedor ingresado correctamente!", "success");
      guardarAccionEnHistorial("Ingreso de Proveedor", nom);

      }
        else{
        swal("Atención!", "El Proveedor no se ingresó correctamente!", "error");
        }

    }
  })



	 $("#ventanaIngresarProveedor").modal("hide");
   break;
	}

		case EDITAR:{

		        arreglo=jsonConDatosDeProveedorEspecifico();
            auxNombre=arreglo["nombreProveedor"];
            auxTelefono=arreglo["telefono"];
            auxEmail=arreglo["email"];

            tmpNombre=document.getElementById("nombreProveedor").value.trim();

             if(auxNombre!=tmpNombre){
guardarAccionEnHistorial("Cambio del nombre del Proveedor de: "+auxNombre+" a "+tmpNombre, tmpNombre);

                hayCambios=true;

             }
            tmpTelefono=document.getElementById("telefono").value.trim();
              if(auxTelefono!=tmpTelefono){
guardarAccionEnHistorial("Cambio del numero de telefono del Proveedor de: "+auxTelefono+" a "+tmpTelefono, tmpNombre);

                hayCambios=true;

             }


            tmpEmail=document.getElementById("email").value.trim();

              if(auxEmail!=tmpEmail){
guardarAccionEnHistorial("Cambio del Email del Proveedor de: "+auxEmail+" a "+tmpEmail, tmpNombre);

                hayCambios=true;

             }




		 if(hayCambios){

      $.ajax({
      type:'POST',
      url:'php/modificarProveedor.php',
      data:('nombreAnterior='+auxNombre+'&nombreProveedor='+tmpNombre+'&telefono='+tmpTelefono+'&email='+tmpEmail),
      success:function(respuesta){
      if(respuesta==1){
     swal("Excelente!", "Proveedor modificado correctamente!", "success");
      }
        else{
        swal("Atención!", "El Proveedor no se logró modificar!", "error");
        }
     }
    })

     }

     else if(!hayCambios){
      swal("Bien!", "Se mantienen los datos!", "success");
     }

       PROVEEDOR_MODIFICANDO_ACTUALMENTE="";
         limpiarFormularioProveedor(document.getElementById("btnGuardarProveedor"));
        $("#ventanaIngresarProveedor").modal("hide");

	}
  }
}



function ingresar_O_editar_Usuario(){
	hayCambios=false;
    switch(modo){
	case AGREGAR:{
 id=document.getElementById("idUsuario").value.trim();
  nomb=document.getElementById("nombreUsuario").value.trim();
	ti=document.getElementById("tipoUsuario").value.trim();

  $.ajax({
    type:'POST',
    url:'php/ingresarUsuario.php',
    data:('idUsuario='+id+'&nombreUsuario='+nomb+'&tipoUsuario='+ti+'&contrasena='+id+'&estado=Habilitado'),
    success:function(respuesta){
      if(respuesta==1){
      limpiarFormularioUsuario(document.getElementById("btnGuardarUsuario"));
      swal("Excelente!", "Usuario ingresado correctamente!", "success");
      guardarAccionEnHistorial("Ingreso de Usuario", id);
     }
        else{
        swal("Atención!", "El Usuario no se ingresó!", "error");
        }

    }
  })



	 $("#ventanaIngresarUsuario").modal("hide");

   break;
	}
	case EDITAR:{


              arreglo=jsonConDatosDeUsuarioEspecifico();

            auxId=arreglo["idUsuario"];
            auxNombre=arreglo["nombreUsuario"];
            auxTipo=arreglo["tipoUsuario"];
            

         tmpNombre=document.getElementById("nombreUsuario").value.trim();
         if(auxNombre!=tmpNombre){
           guardarAccionEnHistorial("Cambio del nombre del usuario de: "+auxNombre+"a "+tmpNombre, auxId);
           hayCambios=true;
           }


          tmpTipo=document.getElementById("tipoUsuario").value.trim();
         if(auxTipo!=tmpTipo){
         guardarAccionEnHistorial("Cambio del tipo de usuario de: "+auxTipo+" a "+tmpTipo, auxId);
         hayCambios=true;
         }


     if(hayCambios){

      $.ajax({
      type:'POST',
      url:'php/modificarUsuario.php',
      data:('idUsuario='+auxId+'&nombreUsuario='+tmpNombre+'&tipoUsuario='+tmpTipo),
      success:function(respuesta){
      if(respuesta==1){
     swal("Excelente!", "Usuario modificado correctamente!", "success");
      }
        else{
        swal("Atención!", "El Usuario no se logró modificar!", "error");
        }
     }
    })

     }

     else if(!hayCambios){
      swal("Bien!", "Se mantienen los datos!", "success");
     }
         $("#ventanaIngresarUsuario").modal("hide");
         limpiarFormularioUsuario(document.getElementById("btnGuardarUsuario"));

        break;
	}
}

}

function ingresar_O_editar_Oficina(){
	 hayCambios=false;
    switch(modo){
   case AGREGAR:{

   nomb=document.getElementById("nombreOficina").value.trim();
   cod=document.getElementById("codigoOficina").value.trim();

       $.ajax({
      type:'POST',
    url:'php/ingresarOficina.php',
    data:('nombreOficina='+nomb+'&codigoOficina='+cod),
    success:function(respuesta){
      if(respuesta==1){
      swal("Excelente!", "Oficina ingresada correctamente!", "success");
       $("#ventanaIngresarOficina").modal("hide");
      limpiarFormularioOficina(document.getElementById("btnGuardarOficina"));
      guardarAccionEnHistorial("Ingreso de Oficina", nomb);
      }
     }
    })
 
      break;
     }

    case EDITAR:{

           arreglo=jsonConDatosDeOficinaEspecifica();

            auxNombre=arreglo["nombreOficina"];
            auxCodigo=arreglo["codigoOficina"];

         tmpNombre=document.getElementById("nombreOficina").value.trim();
         if(auxNombre!=tmpNombre){

           guardarAccionEnHistorial("Cambio del nombre de la oficina de: "+auxNombre+" a "+tmpNombre, tmpNombre);
            
             hayCambios=true;
           }


          tmpCodigo=document.getElementById("codigoOficina").value.trim();
         if(auxCodigo!=tmpCodigo){

           guardarAccionEnHistorial("Cambio del codigo de la oficina de: "+auxCodigo+" a "+tmpCodigo, tmpNombre);

          hayCambios=true;
         }


     if(hayCambios){

      $.ajax({
      type:'POST',
      url:'php/modificarOficina.php',
      data:('nombreAnterior='+auxNombre+'&nombreOficina='+tmpNombre+'&codigoOficina='+tmpCodigo),
      success:function(respuesta){
      if(respuesta==1){
     swal("Excelente!", "Oficina modificada correctamente!", "success");
      }
        else{
        swal("Atención!", "La oficina no se logró modificar!", "error");
        }
     }
    })


     }

     else if(!hayCambios){
      swal("Bien!", "Se mantienen los datos!", "success");
     }

       OFICINA_MODIFICANDO_ACTUALMENTE="";
         limpiarFormularioOficina(document.getElementById("btnGuardarOficina"));
        $("#ventanaIngresarOficina").modal("hide");



        break;
  }

 }
}




sumaFecha = function(d, fecha){
 var Fecha = new Date();
 var sFecha = fecha || (Fecha.getDate() + "/" + (Fecha.getMonth() +1) + "/" + Fecha.getFullYear());
 var sep = sFecha.indexOf('/') != -1 ? '/' : '-';
 var aFecha = sFecha.split(sep);
 var fecha = aFecha[2]+'/'+aFecha[1]+'/'+aFecha[0];
 fecha= new Date(fecha);
 fecha.setDate(fecha.getDate()+parseInt(d));
 var anno=fecha.getFullYear();
 var mes= fecha.getMonth()+1;
 var dia= fecha.getDate();
 mes = (mes < 10) ? ("0" + mes) : mes;
 dia = (dia < 10) ? ("0" + dia) : dia;
 var fechaFinal = dia+sep+mes+sep+anno;
 return (fechaFinal);

}




function halarEquipo(element){

 modo=EDITAR;

 act=element.activo;
 seri=element.serie;

 if(act=="" && seri!= ""){document.getElementById("serie").setAttribute('disabled','disabled');}
 if(act!="" && seri== ""){document.getElementById("activo").setAttribute('disabled','disabled');}
 if(act!="" && seri!= ""){document.getElementById("activo").setAttribute('disabled','disabled');document.getElementById("serie").setAttribute('disabled','disabled');}
 


  document.getElementById("tituloVentanaEquipo").innerHTML="";
 $("#tituloVentanaEquipo").append("Modificando Equipo... <span class='glyphicon glyphicon-save'></span>");



//para hacer select de tipo equipo

     for(j = 0;  j < document.getElementById("tipoEquipo").length;  j++) {
          if(document.getElementById("tipoEquipo")[j].value == element.tipoEquipo){
            document.getElementById("tipoEquipo").selectedIndex = j;
            break;
          }
      }


       if(document.getElementById("tipoEquipo").selectedIndex==0 && document.getElementById('tipoEquipo').value != element.tipoEquipo){
          
          agregarOpcionEnSelect('tipoEquipo',element.tipoEquipo,element.tipoEquipo);

            for(m = 0;  m < document.getElementById("tipoEquipo").length;  m++) {
            if(document.getElementById("tipoEquipo")[m].value == element.tipoEquipo){
              document.getElementById("tipoEquipo").selectedIndex = m;
              break;
            }
           } 
          }




     document.getElementById("activo").value=element.activo;
     document.getElementById("serie").value=element.serie;

oficina=element.oficina;
dependencia=element.dependencia;



   for(m = 0;  m < document.getElementById("ubicacion").length;  m++) {
            if(document.getElementById("ubicacion")[m].value == oficina){
              document.getElementById("ubicacion").selectedIndex = m;
              break;
            }
           }


       if(document.getElementById("ubicacion").selectedIndex==0 && document.getElementById('ubicacion').value != oficina){
          
          agregarOpcionEnSelect('ubicacion',oficina,oficina);

            for(m = 0;  m < document.getElementById("ubicacion").length;  m++) {
            if(document.getElementById("ubicacion")[m].value == oficina){
              document.getElementById("ubicacion").selectedIndex = m;
              break;
            }
           } 
          }

//para hacer select de dependencia
          $.ajax({
            url: 'php/obtenerDependencias.php',
             data:("nombreOficina="+oficina),

            error: function () {

                swal("Error", "Se genero un error", "error");
            },
            success: function (data) {
              var datos = $.parseJSON(data);
              document.getElementById('otrasSenas').innerHTML="";
                  var HTMLoption = "<option value=''>-- Sin Seleccionar --</option>";
                    for(var i = 0; i < datos.length; i++){
                        HTMLoption += '<option value="' +  datos[i].nombreDependencia + '">' + datos[i].nombreDependencia + '</option>'
                    }
                   
                    $("#otrasSenas").append(HTMLoption);

            $("#otrasSenas").removeAttr('disabled');
           $("#agregarDependencia").removeAttr('disabled');

            for(m = 0;  m < document.getElementById("otrasSenas").length;  m++) {
            if(document.getElementById("otrasSenas")[m].value == dependencia){
              document.getElementById("otrasSenas").selectedIndex = m;
              break;
            }
           }


       if(document.getElementById("otrasSenas").selectedIndex==0 && document.getElementById('otrasSenas').value != dependencia){
          
          agregarOpcionEnSelect('otrasSenas',dependencia,dependencia);

            for(m = 0;  m < document.getElementById("otrasSenas").length;  m++) {
            if(document.getElementById("otrasSenas")[m].value == dependencia){
              document.getElementById("otrasSenas").selectedIndex = m;
              break;
            }
           } 
          } 
            

            },
            type: 'POST'
        });





//para hacer select de 

            for(m = 0;  m < document.getElementById("factura").length;  m++) {
            if(document.getElementById("factura")[m].value == element.contrato){
              document.getElementById("factura").selectedIndex = m;
              break;
            }
           }


       if(document.getElementById("factura").selectedIndex==0 && document.getElementById('factura').value != element.contrato){
          
          agregarOpcionEnSelect('factura',element.contrato,element.contrato);

            for(m = 0;  m < document.getElementById("factura").length;  m++) {
            if(document.getElementById("factura")[m].value == element.contrato){
              document.getElementById("factura").selectedIndex = m;
              break;
            }
           } 
          }



      document.getElementById("marca").value=element.marca;
      document.getElementById("modelo").value=element.modelo;
      document.getElementById("garantia").value=element.garantia;

      
 /*     document.getElementById("IP").value=element.ip;
      document.getElementById("traspaso").value=element.traspaso;*/


      document.getElementById("btnLimpiarFormularioEquipo").style.display = 'none';
      document.getElementById("btnGuardarEquipo").innerHTML="";
      document.getElementById("btnGuardarEquipo").innerHTML="<span class='glyphicon glyphicon-floppy-save'></span> Guardar cambios...";

       $("#tituloVentanaEquipo").css('color', '#31b0d5');
       $("#ventanaIngresarEquipo").modal("show");
}


function agregarOpcionEnSelect(idSelect,texto, valor){ 
  var s=document.getElementById(idSelect);
  var option=document.createElement("option");
  option.value=valor;
  option.text=texto; 
  s.appendChild(option);
  s.value = valor;
} 


function halarFactura(element){
        
        modo=EDITAR;

        

		     document.getElementById("tituloVentanaFactura").innerHTML="";
		     $("#tituloVentanaFactura").append("Modificando Compra... <span class='icon-document2'></span>");
		     /*document.getElementById("numeroFactura").setAttribute('disabled','disabled');*/
		     document.getElementById("numeroFactura").value=element.numeroProcedimiento;
         NUMERO_PROCEDIMIENTO_MODIFICANDO_ACTUALMENTE=element.numeroProcedimiento;

         /*document.getElementById("proveedor").setAttribute('disabled','disabled');*/
         /*document.getElementById("orden").setAttribute('disabled','disabled');*/
    
          PROVEEDOR_DE_COMPRA_MODIFICANDO_ACTUALMENTE=element.proveedor;

		      for(m = 0;  m < document.getElementById("proveedor").length;  m++) {
            if(document.getElementById("proveedor")[m].value == element.proveedor){
              document.getElementById("proveedor").selectedIndex = m;
              break;
            }
          }
          
          if(document.getElementById("proveedor").selectedIndex==0 && document.getElementById('proveedor').value != element.proveedor){
          
          agregarOpcionEnSelect('proveedor',element.proveedor,element.proveedor);

            for(m = 0;  m < document.getElementById("proveedor").length;  m++) {
            if(document.getElementById("proveedor")[m].value == element.proveedor){
              document.getElementById("proveedor").selectedIndex = m;
              break;
            }
           } 
          }


		     document.getElementById("orden").value=element.contrato;
         CONTRATO_MODIFICANDO_ACTUALMENTE=element.contrato;
		

// tratado de fecha de ingreso

         año= element.fecha.slice(0,4);
         mes= element.fecha.slice(5,7);
         dia= element.fecha.slice(8,12);

         fechaEspañol=dia+"/"+mes+"/"+año;


         $('.fechaEspecial').datepicker({
          format: "dd/mm/yyyy",
          language: "es",
          daysOfWeekDisabled: "0,6",
          autoclose: true,
          todayHighlight: true
          }).datepicker("setDate", new Date(mes+"/"+dia+"/"+año));
           document.getElementById("fecha").value=fechaEspañol;



// tratado de fecha de preaviso
         año= element.preaviso.slice(0,4);
         mes= element.preaviso.slice(5,7);
         dia= element.preaviso.slice(8,12);

         fechaEspañol=dia+"/"+mes+"/"+año;

		     document.getElementById("preaviso").value=fechaEspañol;

 // tratado de fecha de obsolescencia
         año= element.obsolescencia.slice(0,4);
         mes= element.obsolescencia.slice(5,7);
         dia= element.obsolescencia.slice(8,12);

         fechaEspañol=dia+"/"+mes+"/"+año;

		     document.getElementById("obsolescencia").value=fechaEspañol;

        
		     document.getElementById("btnLimpiarFormularioFactura").style.display = 'none';
		     document.getElementById("btnGuardarFactura").innerHTML="";
		     document.getElementById("btnGuardarFactura").innerHTML="<span class='glyphicon glyphicon-floppy-save'></span> Guardar cambios...";


        $("#tituloVentanaFactura").css('color', '#31b0d5');
        $("#ventanaIngresarFactura").modal("show");

}

function halarProveedor(element){

	modo=EDITAR;


		document.getElementById("tituloVentanaProveedor").innerHTML="";
		$("#tituloVentanaProveedor").append("Modificando Proveedor... <span class='icon-users'></span>");

		document.getElementById("nombreProveedor").value=element.nombreProveedor;
		PROVEEDOR_MODIFICANDO_ACTUALMENTE=element.nombreProveedor;
	  document.getElementById("telefono").value=element.telefono;
		document.getElementById("email").value=element.email;


		document.getElementById("btnLimpiarFormularioProveedor").style.display = 'none';
		document.getElementById("btnGuardarProveedor").innerHTML="";
		document.getElementById("btnGuardarProveedor").innerHTML="<span class='glyphicon glyphicon-floppy-save'></span> Guardar cambios...";

      $("#tituloVentanaProveedor").css('color', '#31b0d5');
     $("#ventanaIngresarProveedor").modal("show");

}

function halarUsuario(element){

	  if(element.estado=="Inhabilitado"){
           swal("Usuario Inhabilitado!", "Éste usuario no se puede editar.", "error");
            return;
         }

		    else{

          if(element.tipoUsuario=="USUARIO"){
            swal("ATENCIÓN!", "El usuario de consultas no se puede editar.", "error");
            return;
         }
         else{

       modo=EDITAR;
       document.getElementById("tituloVentanaUsuario").innerHTML="";

        $("#tituloVentanaUsuario").append("Modificando Usuario... <span class='icon-user-plus'></span>");

        document.getElementById("idUsuario").setAttribute('disabled','disabled');
        document.getElementById("idUsuario").value=element.idUsuario;
        document.getElementById("nombreUsuario").value=element.nombreUsuario;



          for(j = 0;  j < document.getElementById("tipoUsuario").length;  j++) {
            if(document.getElementById("tipoUsuario")[j].value == element.tipoUsuario){
              document.getElementById("tipoUsuario").selectedIndex = j;
              break;
            }
        }



      document.getElementById("btnLimpiarFormularioUsuario").style.display = 'none';
      document.getElementById("btnGuardarUsuario").innerHTML="";
      document.getElementById("btnGuardarUsuario").innerHTML="<span class='glyphicon glyphicon-floppy-save'></span> Guardar cambios...";

      document.getElementById("etiquetaBtnInhabilitarUsuario").style.display = 'inline-block';
      document.getElementById("grupoInhabilitarUsuario").style.display = 'inline-block';
      $("#tituloVentanaUsuario").css('color', '#31b0d5');
      $("#ventanaIngresarUsuario").modal("show");
      }
      }
}



function halarOficina(element){

	modo=EDITAR;


		document.getElementById("tituloVentanaOficina").innerHTML="";
		$("#tituloVentanaOficina").append("Modificando Oficina... <span class='icon-office'></span>");

    OFICINA_MODIFICANDO_ACTUALMENTE=element.nombreOficina;
    document.getElementById("nombreOficina").value=element.nombreOficina;
    document.getElementById("codigoOficina").value=element.codigoOficina;

    document.getElementById("btnLimpiarFormularioOficina").style.display = 'none';
		document.getElementById("btnGuardarOficina").innerHTML="";
		document.getElementById("btnGuardarOficina").innerHTML="<span class='glyphicon glyphicon-floppy-save'></span> Guardar cambios...";

     $("#tituloVentanaOficina").css('color', '#31b0d5');
     $("#ventanaIngresarOficina").modal("show");


}




function inhabilitarUsuario(){
        if(modo!=USUARIO_INHABILITADO){
        swal({
        title: "Está seguro de inhabilitar éste usuario?",
        text: "El usuario no podrá entrar al sistema ni se le podrá modificar!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Sí, Inhabilitar!",
        closeOnConfirm: false
        },
        function(){
       
       arreglo=jsonConDatosDeUsuarioEspecifico();

        if(arreglo!=null){
          
         auxEstado=arreglo["estado"];
       if(auxEstado=="Inhabilitado"){
       swal("Error!", "El usuario ya estaba inhabilitado anteriormente.", "error");
       return;
       }
       else{
                $.ajax({
                type: "post",
                url: "php/inhabilitarUsuario.php",
                data:("idUsuario="+document.getElementById('idUsuario').value.trim()),
                dataType: 'json',
                async:false,
                success: function(data)
                {
                    if(data==1){
                       guardarAccionEnHistorial("Se inhabilito el usuario",document.getElementById('idUsuario').value.trim());
                    swal("Inhabilitado!", "El usuario se inhabilitó correctamente.", "success");
                    }
                    else{
                      swal("Error!", "El usuario no se pudo inhabilitar.", "error");
                    }
                }
            })

        document.getElementById("nombreUsuario").setAttribute('disabled','disabled');
        document.getElementById("tipoUsuario").setAttribute('disabled','disabled');
        document.getElementById("etiquetaBtnInhabilitarUsuario").setAttribute('disabled','disabled');
        document.getElementById("btnInhabilitarUsuario").setAttribute('disabled','disabled');


        document.getElementById("btnGuardarUsuario").setAttribute('disabled','disabled');

        document.getElementById("tituloVentanaUsuario").innerHTML="";
        $("#tituloVentanaUsuario").css('color', 'red');
        $("#tituloVentanaUsuario").append("<span class='glyphicon glyphicon-remove'></span> USUARIO INHABILITADO <span class='glyphicon glyphicon-remove'></span>");

        modo=USUARIO_INHABILITADO;
       }
       }
        });
       }
}




function mostrarHistorial(){
  TABLA_HISTORIAL.ajax.reload(null,false);
  $("#ventanaHistorial").modal("show");
}


function mostrarVentanaReportes(){
  $("#ventanaReportes").modal("show");
}


function buscarHistorial(){

}




function alertasDeObsolescencia(){
    
   lista=jsonConDatosDeTodasLasFacturas();

   for(i=0;i<lista.length;i++){
    fa=lista[i];
   if(fa["preaviso"]==moment().format('YYYY-MM-DD')){
     swal("ATENCIÓN!", "Los equipos ligados a la Factura: "+fa["numeroFactura"]+" - Proveedor: "+fa["proveedor"]+", están a 1 año de quedar obsoletos!!");
    }
    }

    for(i=0;i<lista.length;i++){
    fa=lista[i];
    if(fa["obsolescencia"]==moment().format('YYYY-MM-DD')){

     swal("OBSOLETOS!", "Los equipos ligados a la Factura: "+fa['numeroFactura']+" - Proveedor: "+fa["proveedor"]+", están OBSOLETOS!!");
    }
   }
}
 

function obtenerProveedores(){
$.ajax({
            url: 'php/consultarProveedor.php',

            error: function () {

                swal("Error", "Se genero un error", "error");
            },
            success: function (data) {
              var proveedores = $.parseJSON(data);
                  var HTMLoption ="<option value=''>--- Sin Seleccionar  ---</option>";
                    for(var i = 0; i < proveedores.length; i++){
                        HTMLoption += '<option value="' + proveedores[i].nombreProveedor + '">' 
                        + proveedores[i].nombreProveedor + '</option>'
                    }
                    document.getElementById('proveedor').innerHTML="";
                    $("#proveedor").append(HTMLoption);

            },
            type: 'POST'
        });
}

function obtenerUbicacion() {
 
$.ajax({
            url: 'php/obtenerUbicacion.php',


            error: function () {

                swal("Error", "Se genero un error", "error");
            },
            success: function (data) {
              var ubicaciones = $.parseJSON(data);

                  var HTMLoption = "<option value=''>--- Sin Seleccionar ---</option>";
                    for(var i = 0; i < ubicaciones.length; i++){
                        HTMLoption += '<option value="' + ubicaciones[i].nombreOficina + '">' + ubicaciones[i].nombreOficina + '</option>'
                    }
                    document.getElementById('ubicacion').innerHTML="";
                    $("#ubicacion").append(HTMLoption);


            },
            type: 'POST'
        });
}

function obtenerNumFacturayProveedor() {
  
$.ajax({
            url: 'php/obtenerNumFacturayProveedor.php',


            error: function () {

                swal("Error", "Se genero un error", "error");
            },
            success: function (data) {
              var datos = $.parseJSON(data);
                  var HTMLoption = "<option value=''>-- Sin Seleccionar --</option>";
                    for(var i = 0; i < datos.length; i++){
                        HTMLoption += '<option value="' +  datos[i].contrato + '">' + datos[i].contrato + '</option>'
                    }
                    document.getElementById('factura').innerHTML="";
                    $("#factura").append(HTMLoption);


            },
            type: 'POST'
        });
}

function obtenerDependencias(nombreOfi) {
  
$.ajax({
            url: 'php/obtenerDependencias.php',
             data:("nombreOficina="+nombreOfi),

            error: function () {

                swal("Error", "Se genero un error", "error");
            },
            success: function (data) {
              var datos = $.parseJSON(data);
              document.getElementById('otrasSenas').innerHTML="";
                  var HTMLoption = "<option value=''>-- Sin Seleccionar --</option>";
                    for(var i = 0; i < datos.length; i++){
                        HTMLoption += '<option value="' +  datos[i].nombreDependencia + '">' + datos[i].nombreDependencia + '</option>'
                    }
                   
                  /*  $("#otrasSenas").append(HTMLoption);*/

                    
               document.getElementById("otrasSenas").innerHTML=HTMLoption;

            },
            type: 'POST'
        });
}





function jsonConDatosDeOficinaEspecifica(){

            return JSON.parse($.ajax({
                type: "post",
                url: "php/traerOficina.php",
                data:("nombreOficina="+OFICINA_MODIFICANDO_ACTUALMENTE),
                dataType: 'json',
                async:false,
                success: function(data)
                {
                    return data;
                }
            }).responseText);

}





function jsonConDatosDeProveedorEspecifico(){

            return JSON.parse($.ajax({
                type: "post",
                url: "php/traerProveedor.php",
                data:("nombreProveedor="+PROVEEDOR_MODIFICANDO_ACTUALMENTE),
                dataType: 'json',
                async:false,
                success: function(data)
                {
                    return data;
                }
            }).responseText);

}


function jsonConDatosDeUsuarioEspecifico(){

            return JSON.parse($.ajax({
                type: "post",
                url: "php/traerUsuario.php",
                data:("idUsuario="+document.getElementById('idUsuario').value.trim()),
                dataType: 'json',
                async:false,
                success: function(data)
                {
                    return data;
                }
            }).responseText);

}

function jsonConDatosDeFacturaEspecifica(){

            return JSON.parse($.ajax({
                type: "post",
                url: "php/traerFactura.php",
                data:("numeroFactura="+NUMERO_PROCEDIMIENTO_MODIFICANDO_ACTUALMENTE+
                  "&proveedor="+PROVEEDOR_DE_COMPRA_MODIFICANDO_ACTUALMENTE),
                dataType: 'json',
                async:false,
                success: function(data)
                {
                    return data;
                }
            }).responseText);
}


function jsonConDatosDeFacturaEspecifica2(factura,proveedor){

            return JSON.parse($.ajax({
                type: "post",
                url: "php/traerFactura.php",
                data:("numeroFactura="+factura+
                  "&proveedor="+proveedor),
                dataType: 'json',
                async:false,
                success: function(data)
                {
                    return data;
                }
            }).responseText);
}




function jsonConDatosDeEquipoEspecificoPorActivo(){

            return JSON.parse($.ajax({
                type: "post",
                url: "php/traerEquipoPorActivo.php",
                data:("activo="+document.getElementById('activo').value.trim()),
                dataType: 'json',
                async:false,
                success: function(data)
                {
                    return data;
                }
            }).responseText);

}

function jsonConDatosDeEquipoEspecificoPorSerie(){

            return JSON.parse($.ajax({
                type: "post",
                url: "php/traerEquipoPorSerie.php",
                data:("serie="+document.getElementById('serie').value.trim()),
                dataType: 'json',
                async:false,
                success: function(data)
                {
                    return data;
                }
            }).responseText);

}



function guardarAccionEnHistorial(accion,idObjeto){

   $.ajax({
      type:'POST',
      url:'php/ingresarAccion.php',     
      data:('descripcion='+accion+'&idObjetoGestionado='+idObjeto+
        '&fecha='+moment().format('YYYY-MM-DD')+'&hora='+moment().format('HH:mm:ss'))
    })
}


function guardarNuevoTipo(){
  nuevoTipo=document.getElementById("nuevoTipo").value.trim();

  $.ajax({
      type:'POST',
    url:'php/ingresarNuevoTipo.php',
    data:('nombreTipoEquipo='+nuevoTipo),
    success:function(respuesta){
      if(respuesta==1){
        agregarOpcionEnSelect('tipoEquipo',nuevoTipo,nuevoTipo);
        swal("Excelente!", "Tipo ingresado correctamente!", "success");

      }
        else{
        swal("Atención!", "El Tipo no se ingresó correctamente, probablemente ya exista!", "error");
        }
     }
    })

  $("#ventanaNuevoTipo").modal("hide");
  limpiarFormularioNuevoTipo();
}

function obtenerTipoEquipo(){


  $.ajax({
            url: 'php/obtenerTipoEquipo.php',


            error: function () {

                swal("Error", "Se genero un error", "error");
            },
            success: function (data) {
              var tipos = $.parseJSON(data);
                  var HTMLoption = "<option value=''>--- Sin Seleccionar  ---</option>";                
                    for(var i = 0; i < tipos.length; i++){
                        HTMLoption += '<option value="' + tipos[i].nombreTipoEquipo + '">'
                         + tipos[i].nombreTipoEquipo + '</option>'
                    }
                    document.getElementById('tipoEquipo').innerHTML="";
                    $("#tipoEquipo").append(HTMLoption);


            },
            type: 'POST'
        });
}


function guardarNuevaDependencia(){
  nuevaDependencia=document.getElementById("nuevaDependencia").value.trim();
  nombreOficina=document.getElementById("ubicacion").value.trim()

  $.ajax({
      type:'POST',
    url:'php/ingresarNuevaDependencia.php',
    data:('nombreDependencia='+nuevaDependencia+'&nombreOficina='+nombreOficina),
    success:function(respuesta){
      if(respuesta==1){
        /*agregarOpcionEnSelect('tipoEquipo',nuevoTipo,nuevoTipo);*/
        if(modo!=EDITAR){obtenerDependencias(nombreOficina);}
        if(modo==EDITAR){agregarOpcionEnSelect('otrasSenas',nuevaDependencia,nuevaDependencia);}
        swal("Excelente!", "Dependencia ingresada correctamente!", "success");
         guardarAccionEnHistorial("Ingreso de Dependencia","Oficina:"+nombreOficina);
      }
        else{
        swal("Atención!", "La Dependencia no se ingresó correctamente, probablemente ya exista!", "error");
        }
     }
    })

  $("#ventanaNuevaDependencia").modal("hide");
  limpiarFormularioNuevaDependencia();
}



function cambiarContrasena(){
   $.ajax({
      type:'POST',
      url:'php/cambiarContrasena.php',
      data:('contrasena='+document.getElementById('contrasena').value.trim()+
      '&nuevaContrasena='+document.getElementById('nuevaContrasena').value.trim()),
      success:function(respuesta){
      if(respuesta==1){
     swal("Excelente!", "Contraseña modificada correctamente! (La proxima vez que inicie sesión deberá usar su nueva contraseña)", "success");

      }
        else{
        swal("Atención!", "La contraseña no se logró modificar!", "error");
        }
     }
    })
$('#ventanaCambiarContrasena').modal("hide");
limpiarFormularioContrasena();
}


    function resultadosReportesRangoFecha(columna,inicio,final){

            return JSON.parse($.ajax({
                type: "post",
                url: "php/consultarEquiposPorRangoDeFecha.php",
                data:("columna="+columna+"&fechaInicio="+inicio+"&fechaFinal="+final),
                dataType: 'json',
                async:false,
                success: function(data)
                {
                    return data;
                }
            }).responseText);

}


function jsonConDatosDeTodasLasFacturas(){

            return JSON.parse($.ajax({
                type: "post",
                url: "php/consultarTablaFacturas.php",
                dataType: 'json',
                async:false,
                success: function(data)
                {
                    return data;
                }
            }).responseText);

}


var lenguaje_espanol={
    "sProcessing":     "Procesando...",
    "sLengthMenu":     "Mostrar _MENU_ registros",
    "sZeroRecords":    "No se encontraron resultados",
    "sEmptyTable":     "Ningún dato disponible en esta tabla",
    "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
    "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
    "sInfoPostFix":    "",
    "sSearch":         "Buscar:",
    "sUrl":            "",
    "sInfoThousands":  ",",
    "sLoadingRecords": "Cargando...",
    "oPaginate": {
        "sFirst":    "Primero",
        "sLast":     "Último",
        "sNext":     "Siguiente",
        "sPrevious": "Anterior"
    },
    "oAria": {
        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    }
}

var lenguaje_espanolReportes={
    "sProcessing":     "Procesando...",
    "sLengthMenu":     "Mostrar _MENU_ registros",
    "sZeroRecords":    "No se encontraron resultados",
    "sEmptyTable":     "ATENCIÓN!! ----> No hay ningún resultado que mostrar ...",
    "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
    "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
    "sInfoPostFix":    "",
    "sSearch":         "Buscar:",
    "sUrl":            "",
    "sInfoThousands":  ",",
    "sLoadingRecords": "Cargando...",
    "oPaginate": {
        "sFirst":    "Primero",
        "sLast":     "Último",
        "sNext":     "Siguiente",
        "sPrevious": "Anterior"
    },
    "oAria": {
        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    }
}


function sleep(milliseconds) { var start = new Date().getTime(); for (var i = 0; i < 1e7; i++) { if ((new Date().getTime() - start) > milliseconds){ break; } } } 