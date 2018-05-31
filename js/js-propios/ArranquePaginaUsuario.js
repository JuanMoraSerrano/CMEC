function iniciar(){

   
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


                            


                        <!-- ACTUALIZAR EQUIPOS -->


           actualizarListadoDeEquipos();


           setInterval(function (){TABLA_EQUIPOS.ajax.reload(null,false);}, 1000000);


            $("#tablaEquipos tbody").on('dblclick', 'tr', function () {
           var datosFila = TABLA_EQUIPOS.row( this ).data();

            halarEquipo(datosFila);
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



obtenerTipoEquipo();
obtenerUbicacion();
obtenerNumFacturayProveedor();


}