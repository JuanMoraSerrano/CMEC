
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


var TABLA_EQUIPOS="";
var TABLA_REPORTES="";


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
            +dis['ubicacion']+"</td><td>"+dis['traspaso']+"</td><td>"+dis['ip']+"</td><td>"+dis['factura']+"</td><td>"
            +dis['proveedor']+"</td><td>"+dis['orden']+"</td><td>"+dis['fecha']+"</td><td>"
            +fechaGarantia+"</td><td id='casillaObsolescencia"+i+"'>"
            +dis['obsolescencia']+"</td><td style='color:green'><b>"+dis['estado']+"</b></td></tr>");
       }
        else{
           
            $("#tablaReportes").append("<tr><td>"+dis['tipoEquipo']+"</td><td>"+dis['activo']+"</td><td>"
            +dis['serie']+"</td><td>"+dis['marca']+"</td><td>"+dis['modelo']+"</td><td style = 'text-align:left'>"
            +dis['ubicacion']+"</td><td>"+dis['traspaso']+"</td><td>"+dis['ip']+"</td><td>"+dis['factura']+"</td><td>"
            +dis['proveedor']+"</td><td>"+dis['orden']+"</td><td>"
            +dis['fecha']+"</td><td>"+fechaGarantia+"</td><td id='casillaObsolescencia"+i+"'>"
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
        {"data":"ubicacion"},
        {"data":"traspaso"},
        {"data":"ip"},
        {"data":"factura"},
        {"data":"proveedor"},
        {"data":"orden"},
        {"data":"fecha"},
        {"data":"garantia"},
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

     $("#grupoIP").attr({
			class: 'form-group',
			title: ''
		  });

     $("#grupoTraspaso").attr({
			class: 'form-group',
			title: ''
		  });

        document.getElementById("tituloVentanaEquipo").innerHTML="";
		   $("#tituloVentanaEquipo").append("Ingresar Equipo <span class='glyphicon glyphicon-save'></span>");
        $("#tituloVentanaEquipo").css('color', '#286090');

		 $("#activo").removeAttr('disabled');
		 $("#serie").removeAttr('disabled');
     $("#etiquetaBtnEquipoNoUso").removeAttr('disabled');
     $("#btnEquipoNoUso").removeAttr('disabled');


	    document.getElementById("btnLimpiarFormularioEquipo").style.display = 'inline-block';
		 document.getElementById("btnGuardarEquipo").innerHTML="";
		 document.getElementById("btnGuardarEquipo").innerHTML="<span class='glyphicon glyphicon-floppy-save'></span> Guardar";

    if(e.innerHTML=="×"){
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



                  //  AGREGAR-s //
function ingresar_O_editar_Equipo(){
	hayCambios=false;

  switch(modo){
  case AGREGAR:{
     
      tip=document.getElementById("tipoEquipo").value;
      act=document.getElementById("activo").value.trim();
      seri=document.getElementById("serie").value.trim();

      ubi="";
      
      sennas=document.getElementById("otrasSenas").value.trim();
      if( sennas == null || sennas.length == 0 || /^\s+$/.test(sennas)){
        ubi=document.getElementById("ubicacion").value+"-"+sennas;
      }
      else{
        ubi=document.getElementById("ubicacion").value;
      }

      valorTem=document.getElementById("factura").value;
      separador = "-";//Guion
      vector = valorTem.split(separador);
      
      fac=vector[0];
      prov=vector[1];

      mar=document.getElementById("marca").value.trim();
      model=document.getElementById("modelo").value.trim();
      
      ip=document.getElementById("IP").value.trim();
      tras=document.getElementById("traspaso").value.trim();

      arreglo=jsonConDatosDeFacturaEspecifica2(fac,prov);
      estado=arreglo["estado"];
  

      $.ajax({
       type:'POST',
       url:'php/ingresarEquipo.php',
       data:('tipoEquipo='+tip+'&activo='+act+'&serie='+seri+'&ubicacion='+ubi+
       '&factura='+fac+'&proveedor='+prov+'&marca='+mar+'&modelo='+model+'&ip='+ip+'&traspaso='+tras+'&estado='+estado),
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
            
            auxUbicacion=arreglo["ubicacion"];
            separador = "-";//Guion
            vector = auxUbicacion.split(separador);
            auxOficina=vector[0];
            auxSeñas=vector[1];
            if(auxSeñas==null){auxSeñas='';}

            auxFactura=arreglo["factura"];  
            auxProveedor=arreglo["proveedor"];  
            auxMarca=arreglo["marca"];  
            auxModelo=arreglo["modelo"];  
            auxIp=arreglo["ip"];
            auxTraspaso=arreglo["traspaso"];      

            tmpTipo=document.getElementById("tipoEquipo").value;
            if(auxTipo!=tmpTipo){

                guardarAccionEnHistorial("Cambio del tipo del equipo de: "+auxTipo+" a "
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

         
          tmpOficina=document.getElementById("ubicacion").value.trim();
          
         if(auxOficina!=tmpOficina){

guardarAccionEnHistorial("Cambio de la oficina de ubicación del equipo de: "+auxOficina+" a "+tmpOficina, "Activo:"+auxActivo+"  "+"Serie:"+auxSerie);

             hayCambios=true;

            }
           
           tmpSeñas=document.getElementById("otrasSenas").value.trim();
          
         if(auxSeñas=='' && tmpSeñas!=''){

guardarAccionEnHistorial("Se incluyeron las siguientes especificaciones a la ubicación del equipo: "+tmpSeñas, "Activo:"+auxActivo+"  "+"Serie:"+auxSerie);
 

             hayCambios=true;

            }

            if(auxSeñas!='' && tmpSeñas==''){
guardarAccionEnHistorial("Se borraron las siguientes especificaciones de la ubicación del equipo: "+auxSeñas, "Activo:"+auxActivo+"  "+"Serie:"+auxSerie);


             hayCambios=true;
            }
             
           if(auxSeñas!='' && tmpSeñas!='' && auxSeñas!=tmpSeñas){
guardarAccionEnHistorial("Cambio de las especificaciones de la ubicación del equipo de: "+auxSeñas+" a "+tmpSeñas, "Activo:"+auxActivo+"  "+"Serie:"+auxSerie);

 hayCambios=true;
            }
           
             tmpUbicacion='';
             if(auxSeñas=='' && tmpSeñas==''){tmpUbicacion=tmpOficina;}
             if(auxSeñas=='' && tmpSeñas!=''){tmpUbicacion=tmpOficina+"-"+tmpSeñas;}
             if(auxSeñas!='' && tmpSeñas==''){tmpUbicacion=tmpOficina;}
             if(auxSeñas!='' && tmpSeñas!=''){tmpUbicacion=tmpOficina+"-"+tmpSeñas;}
             
           
            valorTem=document.getElementById("factura").value;
            separador = "-";//Guion
            vector = valorTem.split(separador);
            fac=vector[0];
            prov=vector[1];
  
           if(auxFactura!=fac){

guardarAccionEnHistorial("Cambio de la factura del equipo de: "+auxOficina+" a "+fac, "Activo:"+auxActivo+"  "+"Serie:"+auxSerie);


             hayCambios=true;
           }
           
           if(auxProveedor!=prov){

guardarAccionEnHistorial("Cambio del proveedor del equipo de: "+auxProveedor+" a "+prov, "Activo:"+auxActivo+"  "+"Serie:"+auxSerie);
  
             
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
  



           tmpIp= document.getElementById("IP").value.trim();
         if(auxIp!=tmpIp){

guardarAccionEnHistorial("Cambio de la IP del equipo de: "+auxIp+" a "+tmpIp, "Activo:"+auxActivo+"  "+"Serie:"+auxSerie);
             
              hayCambios=true;
            }


           tmpTraspaso= document.getElementById("traspaso").value.trim();
          if(auxTraspaso!=tmpTraspaso){

guardarAccionEnHistorial("Cambio del traspaso del equipo de: "+auxTraspaso+" a "+tmpTraspaso, "Activo:"+auxActivo+"  "+"Serie:"+auxSerie);

          
              hayCambios=true;
           }
     
     
          if(hayCambios){

            if(document.getElementById("activo").disabled==true && document.getElementById("serie").disabled==false){

                $.ajax({
                type:'POST',
                url:'php/modificarEquipoPorActivo.php',
                data:('activo='+tmpActivo+"&tipo="+tmpTipo+'&serie='+tmpSerie+'&ubicacion='+tmpUbicacion+'&factura='+fac+
                  '&proveedor='+prov+'&marca='+tmpMarca+'&modelo='+tmpModelo+"&ip="+tmpIp+"&traspaso="+tmpTraspaso),
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
                data:('serie='+tmpSerie+"&tipo="+tmpTipo+'&activo='+tmpActivo+'&ubicacion='+tmpUbicacion+'&factura='+fac+
                  '&proveedor='+prov+'&marca='+tmpMarca+'&modelo='+tmpModelo+"&ip="+tmpIp+"&traspaso="+tmpTraspaso),
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
                data:('activo='+tmpActivo+"&tipo="+tmpTipo+'&serie='+tmpSerie+'&ubicacion='+tmpUbicacion+'&factura='+fac+
                  '&proveedor='+prov+'&marca='+tmpMarca+'&modelo='+tmpModelo+"&ip="+tmpIp+"&traspaso="+tmpTraspaso),
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

 if(act=="" && seri!= ""){document.getElementById("serie").setAttribute('disabled','disabled');document.getElementById("serie").setAttribute('disabled','disabled');}
 if(act!="" && seri== ""){document.getElementById("activo").setAttribute('disabled','disabled');document.getElementById("serie").setAttribute('disabled','disabled');}
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



//para hacer select de ubicacion
      ubicacionCompleta=element.ubicacion;
      separador = "-";//Guion
      vector = ubicacionCompleta.split(separador);
      
      oficina=vector[0];
      señas=vector[1];

      if(señas==null){señas="";}


   for(m = 0;  m < document.getElementById("ubicacion").length;  m++) {
            if(document.getElementById("ubicacion")[m].value == oficina){
              document.getElementById("ubicacion").selectedIndex = m;
              break;
            }
           }


       if(document.getElementById("ubicacion").selectedIndex==0 && document.getElementById('ubicacion').value != element.ubicacion){
          
          agregarOpcionEnSelect('ubicacion',oficina,oficina);

            for(m = 0;  m < document.getElementById("ubicacion").length;  m++) {
            if(document.getElementById("ubicacion")[m].value == oficina){
              document.getElementById("ubicacion").selectedIndex = m;
              break;
            }
           } 
          }

           document.getElementById("ubicacion").setAttribute('disabled','disabled');

           document.getElementById("otrasSenas").value=señas; 
           document.getElementById("otrasSenas").setAttribute('disabled','disabled');


//para hacer select de factura

 loteDeFactura=element.factura+"-"+element.proveedor;

            for(m = 0;  m < document.getElementById("factura").length;  m++) {
            if(document.getElementById("factura")[m].value == loteDeFactura){
              document.getElementById("factura").selectedIndex = m;
              break;
            }
           }


       if(document.getElementById("factura").selectedIndex==0 && document.getElementById('factura').value != loteDeFactura){
          
          agregarOpcionEnSelect('factura',loteDeFactura,loteDeFactura);

            for(m = 0;  m < document.getElementById("factura").length;  m++) {
            if(document.getElementById("factura")[m].value == loteDeFactura){
              document.getElementById("factura").selectedIndex = m;
              break;
            }
           } 
          }
           document.getElementById("factura").setAttribute('disabled','disabled');

      
      document.getElementById("marca").value=element.marca;
      document.getElementById("marca").setAttribute('disabled','disabled');


      document.getElementById("modelo").value=element.modelo;
      document.getElementById("modelo").setAttribute('disabled','disabled');


      
      document.getElementById("IP").value=element.ip;
      document.getElementById("traspaso").value=element.traspaso;


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





function mostrarVentanaReportes(){
  $("#ventanaReportes").modal("show");
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
                  var HTMLoption = "<option value=''>--- Sin Seleccionar Oficina ---</option>"+
                  "<option value='BODEGA'>BODEGA</option>";
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
                        HTMLoption += '<option value="' +  datos[i].numeroFactura + '-' + datos[i].proveedor + '">' + datos[i].numeroFactura + '-' + datos[i].proveedor + '</option>'
                    }
                    document.getElementById('factura').innerHTML="";
                    $("#factura").append(HTMLoption);


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
                data:("numeroFactura="+document.getElementById('numeroFactura').value.trim()+
                  "&proveedor="+document.getElementById('proveedor').value.trim()),
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


