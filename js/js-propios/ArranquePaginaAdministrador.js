function iniciar(){

  alertasDeObsolescencia();

   
   $('#tablaReportes').DataTable({dom: 'Bfrtip',buttons: [ 'pdf', 'print'],"language":lenguaje_espanol});

 

       $('.fechaEspecial').datepicker({
        format: "dd/mm/yyyy",
        language: "es",
        daysOfWeekDisabled: "0,6",
        autoclose: true,
        todayHighlight: true
    });

       $('.fechaInicio').datepicker({
        format: "dd/mm/yyyy",
        language: "es",
        daysOfWeekDisabled: "0,6",
        autoclose: true,
        todayHighlight: true
    });

        $('.fechaFinal').datepicker({
        format: "dd/mm/yyyy",
        language: "es",
        daysOfWeekDisabled: "0,6",
        autoclose: true,
        todayHighlight: true
    });


       modo=NEUTRO;






                        <!-- ACTUALIZAR TRASPASOS CONFIRMADOS -->

                actualizarListadoDeTraspasosConfirmados();

                setInterval(function (){TABLA_TRASPASOS_CONFIRMADOS.ajax.reload(null,false);}, 1000000);



                               
                                 <!-- ACTUALIZAR OFICINAS -->



      actualizarListadoDeOficinas();


      setInterval(function (){TABLA_OFICINAS.ajax.reload(null,false);}, 1000000);


       $("#tablaOficinas tbody").on('dblclick', 'tr', function () {
       var datosFila = TABLA_OFICINAS.row( this ).data();
       halarOficina(datosFila);
      });
       

               

                          <!-- ACTUALIZAR PROVEEDORES -->


        actualizarListadoDeProveedores();

        setInterval(function (){TABLA_PROVEEDORES.ajax.reload(null,false);}, 1000000);


       $("#tablaProveedores tbody").on('dblclick', 'tr', function () {
       var datosFila = TABLA_PROVEEDORES.row( this ).data();
       halarProveedor(datosFila);
      });



                        
                           <!-- ACTUALIZAR HISTORIAL -->


        actualizarListadoDeHistorial();

  





                         <!-- ACTUALIZAR USUARIOS -->


      actualizarListadoDeUsuarios();


      setInterval(function (){TABLA_USUARIOS.ajax.reload(null,false);}, 1000000);


       $("#tablaUsuarios tbody").on('dblclick', 'tr', function () {
       var datosFila = TABLA_USUARIOS.row( this ).data();
       halarUsuario(datosFila);
      });





                     <!-- ACTUALIZAR FACTURAS -->


      actualizarListadoDeFacturas();


      setInterval(function (){TABLA_FACTURAS.ajax.reload(null,false);}, 1000000);


       $("#tablaFacturas tbody").on('dblclick', 'tr', function (){
       var datosFila = TABLA_FACTURAS.row( this ).data();

       halarFactura(datosFila);
      
      });




                        <!-- ACTUALIZAR EQUIPOS -->


           actualizarListadoDeEquipos();


           setInterval(function (){TABLA_EQUIPOS.ajax.reload(null,false);}, 1000000);


            $("#tablaEquipos tbody").on('dblclick', 'tr', function () {
           var datosFila = TABLA_EQUIPOS.row( this ).data();

            halarEquipo(datosFila);
           });






            $("#cuerpoTablaEquipos").on('click', 'td', function (){

              auxActivo=this.parentNode.childNodes[1].innerHTML;
              auxSerie=this.parentNode.childNodes[2].innerHTML;

              
             if(this.innerHTML=="True" && $(this).index()==13){
                 
         swal({
         title: "Inhabilitar equipo?",
        text: "El equipo quedará en un estado de: 'No en uso'",
       type: "warning",
       showCancelButton: true,
       confirmButtonColor: "#DD6B55",
       confirmButtonText: "Sí, Inhabilitar!",
       closeOnConfirm: false
        },
      function(){
      if(auxActivo!=""){

                 $.ajax({
                type: "post",
                url: "php/inhabilitarEquipoPorActivo.php",
                data:("activo="+auxActivo),
                dataType: 'json',
                async:false,
                success: function(data)
                {
                    if(data==1){
                    swal("Inhabilitado!", "El equipo se inhabilitó correctamente.", "success");
          guardarAccionEnHistorial("Cambio del estado 'En uso' del equipo de: 'True' a 'False'","Activo:"+auxActivo+"  "+"Serie:"+auxSerie);

                    }
                    else{
                      swal("Error!", "El equipo no se pudo inhabilitar.", "error");
                    }
                }
            })

     }
     else{
                  $.ajax({
                type: "post",
                url: "php/inhabilitarEquipoPorSerie.php",
                data:("serie="+auxSerie),
                dataType: 'json',
                async:false,
                success: function(data)
                {
                    if(data==1){
                    swal("Inhabilitado!", "El equipo se inhabilitó correctamente.", "success");
          guardarAccionEnHistorial("Cambio del estado 'En uso' del equipo de: 'True' a 'False'","Activo:"+auxActivo+"  "+"Serie:"+auxSerie);

                    }
                    else{
                      swal("Error!", "El equipo no se pudo inhabilitar.", "error");
                    }
                }
            })

     }
  
     });

       }


       if(this.innerHTML=="False" && $(this).index()==13){
       swal({
       title: "Habilitar equipo?",
       text: "El equipo quedará en un estado de: 'En uso'",
       type: "warning",
       showCancelButton: true,
       confirmButtonColor: "#DD6B55",
       confirmButtonText: "Sí, Habilitar!",
       closeOnConfirm: false
     },
     function(){

      if(auxActivo!=""){

                $.ajax({
                type: "post",
                url: "php/habilitarEquipoPorActivo.php",
                data:("activo="+auxActivo),
                dataType: 'json',
                async:false,
                success: function(data)
                {
                    if(data==1){
          swal("Habilitado!", "El equipo se habilitó correctamente.", "success");
          guardarAccionEnHistorial("Cambio del estado 'En uso' del equipo de: 'False' a 'True'","Activo:"+auxActivo+"  "+"Serie:"+auxSerie);
                    }
                    else{
                      swal("Error!", "El equipo no se pudo habilitar.", "error");
                    }
                }
            })

     }
     else{

                 $.ajax({
                type: "post",
                url: "php/habilitarEquipoPorSerie.php",
                data:("activo="+auxActivo),
                dataType: 'json',
                async:false,
                success: function(data)
                {
                    if(data==1){
                    swal("Habilitado!", "El equipo se habilitó correctamente.", "success");
          guardarAccionEnHistorial("Cambio del estado 'En uso' del equipo de: 'False' a 'True'","Activo:"+auxActivo+"  "+"Serie:"+auxSerie);

                    }
                    else{
                      swal("Error!", "El equipo no se pudo habilitar.", "error");
                    }
                }
            })
      
     }

     });
       }



 });





      $(".ir-arriba").click(function(){
        $("body,html").animate({
          scrollTop:"0px"
        },200);

      });

     $(window).scroll(function(){
      if($(this).scrollTop() > 400){
        $(".ir-arriba").slideDown(300);
      }
      else{
        $(".ir-arriba").slideUp(1);
      }
     });



    $("#tablaEquipos").find("tr").find("td").on('click', function (){alert();});



obtenerProveedores(); 

obtenerTipoEquipo();
obtenerUbicacion();
obtenerNumFacturayProveedor();



}