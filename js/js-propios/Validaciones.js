var abecedario="abcdefghyjklmnñopqrstuvwxyz";
var tildes="ñáéíóú´";
var numeros="0123456789";
var todosLosSimbolos="=°|#$&/><()?¿!¡*+´%~^[]{}_-.:`@,;?'¬\"\\";
var simbolosSinGuionMedioYSlash="=°|#$&><()?¿!¡*+´%~^[]{}_.:`@,;'¬\"\\"; // PARA EL MODELO Y SERIE
var simbolosSinPunto="=°|#$&/><()?¿!¡*+´%~^[]{}_-:`@,;'¬\"\\";    // PARA LA IP
var simbolosDeNoCorreo="=°|#$&/><()?¿!¡*+´%~^[]{}:`,;'¬\"\\";    // PARA EL EMAIL
var todosLosSimbolosMenosSlash="=°|#$&><()?¿!¡*+´%~^[]{}_-.:`@,;'¬\"\\";
var expresionRegularFecha=/^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|3579][26])00))))$/;
var expresionRegularCorreo=/^([a-z1-9._-]+[a-z1-9._-]*)@{1}([a-z1-9\.]{2,})\.([a-z]{2,3})$/;
var expresionRegularIP=/^([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){2}(\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))$/;

   


   function validarFormularioNuevoTipo(){
   	 algoMal=false;
   	 validarNuevoTipo();
   	 if(algoMal){
		return false;
	 }
	 else{
     guardarNuevoTipo();
	 }
   }                            //            VALIDAR  FORMULARIO DE EQUIPO           ////

 function validarFormularioNuevaDependencia(){
   	 algoMal=false;
   	 validarNuevaDependencia();
   	 if(algoMal){
		return false;
	 }
	 else{
     guardarNuevaDependencia();
	 }
   }  

function validarNuevoTipo(){
	tipoRepetido=false;

	valor=document.getElementById("nuevoTipo").value.trim();
      if( valor == null || valor.length == 0 || /^\s+$/.test(valor) ) {
		
		$("#grupoNuevoTipo").attr({
			class: 'form-group has-error',
			title: 'Error,debe digitar un nuevo tipo de equipo'
		});
		algoMal=true;
      }
     else{

         if(tiene_simbolos2(valor) || tiene_tildes(valor)){
          	$("#grupoNuevoTipo").attr({
			class: 'form-group has-error',
			title: 'Error, solo se permiten números, letras(sin tildes y ñ) y - , /'
		});
		algoMal=true;
         }
		else{
			$("#grupoNuevoTipo").attr({
			class: 'form-group',
			title: ''
		});

               arreglo=resultadoValidarTipoEquipo(valor);
              if(arreglo["resultado"]==1){

                        sweetAlert("Error!", "El tipo de equipo ya existe!", "error");
						$("#grupoNuevoTipo").attr({
						class: 'form-group has-error',
						 title: 'Error; Tipo de equipo repetido'
						});
						tipoRepetido=true;
						algoMal=true;
              }
              else{
              		$("#grupoNuevoTipo").attr({
					  class: 'form-group',
					  title: ''
				       });
              }

               if(!tipoRepetido){
               $("#grupoNuevoTipo").attr({
			  class: 'form-group',
			  title: ''
		       });
	           }

		}
       }	
}


function validarNuevaDependencia(){
	dependenciaRepetida=false;

	valor=document.getElementById("nuevaDependencia").value.trim();
      if( valor == null || valor.length == 0 || /^\s+$/.test(valor) ) {
		
		$("#grupoNuevaDependencia").attr({
			class: 'form-group has-error',
			title: 'Error,debe digitar una dependencia'
		});
		algoMal=true;
      }
     else{

         if(tiene_simbolos2(valor) || tiene_tildes(valor)){
          	$("#grupoNuevaDependencia").attr({
			class: 'form-group has-error',
			title: 'Error, solo se permiten números, letras(sin tildes y ñ) y - , /'
		});
		algoMal=true;
         }
		else{
			$("#grupoNuevaDependencia").attr({
			class: 'form-group',
			title: ''
		});

               arreglo=resultadoValidarDependencia(valor,document.getElementById("ubicacion").value);
              if(arreglo["resultado"]==1){

                        sweetAlert("Error!", "La dependencia ya existe!", "error");
						$("#grupoNuevaDependencia").attr({
						class: 'form-group has-error',
						 title: 'Error; Dependencia repetida'
						});
						dependenciaRepetida=true;
						algoMal=true;
              }
              else{
              		$("#grupoNuevaDependencia").attr({
					  class: 'form-group',
					  title: ''
				       });
              }

               if(!dependenciaRepetida){
               $("#grupoNuevaDependencia").attr({
			  class: 'form-group',
			  title: ''
		       });
	           }

		}
       }	
}

function validarFormularioEquipo(){
      
     algoMal=false;
     if(modo==AGREGAR){
       validarActivo();
       validarSerie();
     }
     if(document.getElementById("activo").disabled==false && document.getElementById("serie").disabled==true){
     validarActivo();
     }
     if(document.getElementById("activo").disabled==true && document.getElementById("serie").disabled==false){
      validarSerie();
     }
      validarTipoEquipo(),
      validarFactura();
      validarMarca();
      validarModelo();
      validarGarantia();
/*      validarIP();
      validarTraspaso();*/
     
	 if(algoMal){
		return false;
	 }
	 else{

     ingresar_O_editar_Equipo();
	 }
}



       ///     CAMBIOS DE FORMULARIO EQUIPO   ///


                  function validarGarantia(){
	 valor=document.getElementById("garantia").value;
      if( valor == null || valor.length == 0 || /^\s+$/.test(valor) ) {
		
		$("#grupoGarantia").attr({
			class: 'form-group has-error',
			title: 'Error,debe digitar una garantia'
		});
		algoMal=true;
        }
        else{

         if(tiene_simbolos(valor) || tiene_letras(valor)){
          	$("#grupoGarantia").attr({
			class: 'form-group has-error',
			title: 'Error, solo se permiten números'
		});
		algoMal=true;
         }
		else{
			if(valor > 60){
            $("#grupoGarantia").attr({
			class: 'form-group has-error',
			title: 'Error, no existe garantia mayor a 5 años'
		    });
		    algoMal=true;
		      }
		  else{
			$("#grupoGarantia").attr({
			class: 'form-group',
			title: ''
		});
		}
        }
     }
}



       function validarTipoEquipo(){
       	valor=document.getElementById("tipoEquipo").value;

         if( valor == null || valor.length == 0 || /^\s+$/.test(valor)){
		
		$("#grupoTipoEquipo").attr({
			class: 'form-group has-error',
			title: 'Error,debe seleccionar un Tipo'
		});
		algoMal=true;
        }
       else{
          	
             $("#grupoTipoEquipo").attr({
				class: 'form-group',
				title: ''
		 		});
       }
    }
 function validarActivo(){

 	     activoRepetido=false;

        	valor=document.getElementById("activo").value;

            if(valor == null || valor.length == 0 || /^\s+$/.test(valor)){

             $("#grupoActivo").attr({
			  class: 'form-group',
			  title: ''
		       });
            }
		    else{ 
			if(document.getElementById("grupoSerie").title =="Error, se necesita un número de activo o bien, un número de serie"){
			  $("#grupoSerie").attr({
			  class: 'form-group',
			  title: ''
		       });
		    }

              if(valor.length > 6){
              $("#grupoActivo").attr({
                class: 'form-group has-error',
          		title: 'Error, No se permiten más de 6 digitos'
				});
		   		algoMal=true;
              } 
              else{

              	$("#grupoActivo").attr({
				class: 'form-group',
				title: ''
		 		});

              	if(tiene_simbolos(valor) || tiene_letras(valor)){
          	     
          		$("#grupoActivo").attr({
                class: 'form-group has-error',
          		title: 'Error, No se permiten simbolos ni letras'
				});
		   		algoMal=true;
               }
         	 else{
                   
         		$("#grupoActivo").attr({
				class: 'form-group',
				title: ''
		 		});
         	

        		arreglo=resultadoValidarActivo(valor);
              if(arreglo["resultado"]==1){

                        sweetAlert("Error!", "El Activo ya existe!", "error");
						$("#grupoActivo").attr({
						class: 'form-group has-error',
						 title: 'Error; Activo repetido'
						});
						activoRepetido=true;
						algoMal=true;
              }
              else{
              		$("#grupoActivo").attr({
					  class: 'form-group',
					  title: ''
				       });
              }
			
		        

	           if(!activoRepetido){
               $("#grupoActivo").attr({
			  class: 'form-group',
			  title: ''
		       });
	           }
	     }
              }
          	  
		}
}
         
 function validarSerie(){
 	     serieRepetida=false;

 	     acti=document.getElementById("activo").value;
       	 valor=document.getElementById("serie").value;

         if((valor == null || valor.length == 0 || /^\s+$/.test(valor)) && (acti == null || acti.length == 0 || /^\s+$/.test(acti))){
		
		 sweetAlert("Error!", "Debe digitar un activo o bien, un número serie!", "error");

		 $("#grupoActivo").attr({
			class: 'form-group has-error',
			title: 'Error, se necesita un número de activo o bien, un número de serie'
		   });

		 $("#grupoSerie").attr({
			class: 'form-group has-error',
			title: 'Error, se necesita un número de activo o bien, un número de serie'
		   });
		   algoMal=true;
           }

	
          else{
          if(valor.length > 0){

          	if(document.getElementById("grupoActivo").title=="Error, se necesita un número de activo o bien, un número de serie"){
          		$("#grupoActivo").attr({
				class: 'form-group',
				title: ''
		 		});
          	}
          	  
          	if(tiene_simbolos2(valor) || tiene_tildes(valor)){
          	$("#grupoSerie").attr({
			class: 'form-group has-error',
			title: 'Error, solo se permiten números, letras y - , /'
		   });
		   algoMal=true;
           }

           else{
		      $("#grupoSerie").attr({
				class: 'form-group',
				title: ''
		 		});
         	

                 arreglo=resultadoValidarSerie(valor);
              if(arreglo["resultado"]==1){

                        sweetAlert("Error!", "La serie ya existe!", "error");
						$("#grupoSerie").attr({
						class: 'form-group has-error',
						 title: 'Error; Serie repetida'
						});
						 serieRepetida=true;
						algoMal=true;
              }
              else{
              		$("#grupoSerie").attr({
					  class: 'form-group',
					  title: ''
				       });
              }
        		

	           if(!serieRepetida){
               $("#grupoSerie").attr({
			  class: 'form-group',
			  title: ''
		       });
	           }
		     }
             }
          
		    else{
			$("#grupoSerie").attr({
			class: 'form-group',
			title: ''
		  });
		  }
         }
}


function validarUbicacion(){
   valor=document.getElementById("ubicacion").value;

   if( valor == null || valor.length == 0 || /^\s+$/.test(valor)){
		
		 $("#grupoUbicacion").attr({
			class: 'form-group has-error',
			title: 'Error,debe digitar una ubicacion'
		 });

         algoMal=true;
          document.getElementById('otrasSenas').innerHTML="";
         var HTMLoption = "<option value=''>-- Sin Seleccionar --</option>";
         $("#otrasSenas").append(HTMLoption);
         document.getElementById("otrasSenas").setAttribute('disabled','disabled');
         document.getElementById("agregarDependencia").setAttribute('disabled','disabled');
          }
 
       else{

         $("#grupoUbicacion").attr({
		class: 'form-group',
		title: ''
		 });

		 obtenerDependencias(valor);
		 $("#otrasSenas").removeAttr('disabled');
		 $("#agregarDependencia").removeAttr('disabled');

        }
		
      
      
}

function validarUbicacionSeñas(){
   valor=document.getElementById("otrasSenas").value;


     if(tiene_simbolos(valor) ||  tiene_tildes(valor)){
          	$("#grupoSeñas").attr({
			class: 'form-group has-error',
			title: 'Error, se permiten solamente letras sin tildes y ñ'
		    });
		algoMal=true;
      }
     
       else{

         $("#grupoSeñas").attr({
		class: 'form-group',
		title: ''
		 });
        }   
}


function validarFactura(){
	     existeFactura=false;

       	 valor=document.getElementById("factura").value;
	

 
        if( valor == null || valor.length == 0 || /^\s+$/.test(valor)){
		
		 $("#grupoFactura").attr({
			class: 'form-group has-error',
			title: 'Error,debe digitar un número de contrato.'
		 });
		 algoMal=true;
         }
         else{
          if(tiene_simbolos(valor)){
          	$("#grupoFactura").attr({
			class: 'form-group has-error',
			title: 'Error, Formato invalido.'
		    });
		 algoMal=true;
         }

         else{

         $("#grupoFactura").attr({
		  class: 'form-group',
		 title: ''
		 });
         	
	     }
		
         }
}

/*function validarFactura(){
	     existeFactura=false;

       	 valorTem=document.getElementById("factura").value;
	
       	 separador = "-"; 
       	 vector = valorTem.split(separador);
				
         valor=vector[0];
         prov=vector[1];

 
        if( valor == null || valor.length == 0 || /^\s+$/.test(valor) || prov == null || prov.length == 0 || /^\s+$/.test(prov) ){
		
		 $("#grupoFactura").attr({
			class: 'form-group has-error',
			title: 'Error,debe digitar un lote de factura.'
		 });
		 algoMal=true;
         }
         else{
          if(tiene_simbolos(valor) || tiene_letras(valor) || tiene_simbolos(prov)){
          	$("#grupoFactura").attr({
			class: 'form-group has-error',
			title: 'Error, Formato de lote incorrecto.'
		    });
		 algoMal=true;
         }

         else{

         $("#grupoFactura").attr({
		  class: 'form-group',
		 title: ''
		 });
         	
	     }
		
         }
}*/

function validarMarca(){

	    valor=document.getElementById("marca").value;
       if( valor == null || valor.length == 0 || /^\s+$/.test(valor) ) {
		
		$("#grupoMarca").attr({
			class: 'form-group has-error',
			title: 'Error,debe digitar una marca'
		});
		algoMal=true;
       }
       else{
          if(tiene_simbolos(valor) || tiene_numeros(valor) || tiene_tildes(valor)){
          	$("#grupoMarca").attr({
			class: 'form-group has-error',
			title: 'Error,solo se permiten letras sin tildes y ñ'
		});
		algoMal=true;
         }
		else{
			$("#grupoMarca").attr({
			class: 'form-group',
			title: ''
		});
		}
      }
}



 function validarModelo(){
       	valor=document.getElementById("modelo").value;
      if( valor == null || valor.length == 0 || /^\s+$/.test(valor) ) {
		
		$("#grupoModelo").attr({
			class: 'form-group has-error',
			title: 'Error,debe digitar un modelo'
		});
		algoMal=true;
      }
     else{

         if(tiene_simbolos2(valor) || tiene_tildes(valor)){
          	$("#grupoModelo").attr({
			class: 'form-group has-error',
			title: 'Error, solo se permiten números, letras(sin tildes y ñ) y - , /'
		});
		algoMal=true;
         }
		else{
			$("#grupoModelo").attr({
			class: 'form-group',
			title: ''
		});
		}
       }
}



   function validarIP(){
 	      ipRepetida=false;

 	      valor=document.getElementById("IP").value;

          if(valor.length > 0 ){
		  if(tiene_simbolos6(valor) || tiene_letras(valor)){
          	$("#grupoIP").attr({
          	title: 'Error, solo se permiten números y puntos',
			class: 'form-group has-error'
			
		    });
		   algoMal=true;
         }
         else{
         	
         	    
         	    if(!expresionRegularIP.test(valor)){
         	    	$("#grupoIP").attr({
          	      title: 'Error, formato IP incorrecto',
			     class: 'form-group has-error'
                  });
		         algoMal=true;
                 }
                  
                else{

	    		if(modo==AGREGAR){

	            arreglo=resultadoValidarIP(valor);
              if(arreglo["resultado"]==1){

                        sweetAlert("Error!", "La dirección IP ya ha sido registrada!", "error");
						$("#grupoIP").attr({
						class: 'form-group has-error',
						title: 'Error; Dirección IP ya registrada'
						});
						ipRepetida=true;
						algoMal=true;
              }
              else{
              		$("#grupoIP").attr({
					  class: 'form-group',
					  title: ''
				       });
              }
	    		}

	    		if(document.getElementById("activo").disabled==true){

                arreglo=resultadoValidarIPPorActivo(valor,document.getElementById("activo").value.trim());
              if(arreglo["resultado"]==1){

                        sweetAlert("Error!", "La dirección IP ya ha sido registrada!", "error");
						$("#grupoIP").attr({
						class: 'form-group has-error',
						title: 'Error; Dirección IP ya registrada'
						});
						ipRepetida=true;
						algoMal=true;
              }
              else{
              		$("#grupoIP").attr({
					  class: 'form-group',
					  title: ''
				       });
              }

	    		}

	    		if(document.getElementById("serie").disabled==true){

                arreglo=resultadoValidarIPPorSerie(valor,document.getElementById("serie").value.trim());
              if(arreglo["resultado"]==1){

                        sweetAlert("Error!", "La dirección IP ya ha sido registrada!", "error");
						$("#grupoIP").attr({
						class: 'form-group has-error',
						title: 'Error; Dirección IP ya registrada'
						});
						ipRepetida=true;
						algoMal=true;
              }
              else{
              		$("#grupoIP").attr({
					  class: 'form-group',
					  title: ''
				       });
              }

	    		}
	           

	           if(!ipRepetida){
               $("#grupoIP").attr({
			  class: 'form-group',
			  title: ''
		       });
	           }
	       
             }
             }
	       }
          else{

         $("#grupoIP").attr({
		 class: 'form-group',
		 title: ''
		 });
	 }
 }


 function validarTraspaso(){
 	  traspasoRepetido=false;

      valor=document.getElementById("traspaso").value;

      if(valor.length > 0 ){
		  if(tiene_simbolos(valor) || tiene_letras(valor)){
          	$("#grupoTraspaso").attr({
          	title: 'Error, solo se permiten números',
			class: 'form-group has-error'
			
		    });
		   algoMal=true;
         }
         else{

         		$("#grupoTraspaso").attr({
				class: 'form-group',
				title: ''
		 		});
         	 
	    

	    		if(modo==AGREGAR){

                arreglo=resultadoValidarTraspaso(valor);
              if(arreglo["resultado"]==1){

                        sweetAlert("Error!", "El número de traspaso ya ha sido registrado!", "error");
						$("#grupoTraspaso").attr({
						class: 'form-group has-error',
						title: 'Error; Traspaso ya registrado'
						});
						traspasoRepetido=true;
						algoMal=true;
              }
              else{
              		$("#grupoTraspaso").attr({
					  class: 'form-group',
					  title: ''
				       });
              }

                }
	    		
                if(modo==EDITANDO_SIN_SERIE || modo==EDITANDO_CON_ACTIVO_Y_SERIE){

                arreglo=resultadoValidarTraspasoPorActivo(valor,document.getElementById("activo").value.trim());
              if(arreglo["resultado"]==1){

                        sweetAlert("Error!", "El número de traspaso ya ha sido registrado!", "error");
						$("#grupoTraspaso").attr({
						class: 'form-group has-error',
						title: 'Error; Traspaso ya registrado'
						});
						traspasoRepetido=true;
						algoMal=true;
              }
              else{
              		$("#grupoTraspaso").attr({
					  class: 'form-group',
					  title: ''
				       });
              }


                }

                if(modo==EDITANDO_SIN_ACTIVO){
 
                arreglo=resultadoValidarTraspasoPorSerie(valor,document.getElementById("serie").value.trim());
              if(arreglo["resultado"]==1){

                         sweetAlert("Error!", "El número de traspaso ya ha sido registrado!", "error");
						$("#grupoTraspaso").attr({
						class: 'form-group has-error',
					    title: 'Error; Traspaso ya registrado'
						});
						traspasoRepetido=true;
						algoMal=true;
              }
              else{
              		$("#grupoTraspaso").attr({
					  class: 'form-group',
					  title: ''
				       });
              }


                }

	    

	           if(!traspasoRepetido){
               $("#grupoTraspaso").attr({
			  class: 'form-group',
			  title: ''
		       });
	           }

         }
	   }
      else{

         $("#grupoTraspaso").attr({
		class: 'form-group',
		title: ''
		 });
	   }
 }
                       ////         VALIDAR  FORMULARIO   PROVEEDOR   !!!!!!!!!!!!!!!!!



function validarFormularioProveedor(){
      
    algoMal=false;
    proveedorRepetido=false;
    
     validarNombreProveedor();
     validarTelefono();
     validarEmail();
   
   if(algoMal){
		return false;
	}
	else{
     ingresar_O_editar_Proveedor();
	}
}


         

          //          CAMBIOS FORMULARIO PROVEEDOR         //




function validarNombreProveedor(){
      proveedorRepetido=false;

	 valor=document.getElementById("nombreProveedor").value;

         if( valor == null || valor.length == 0 || /^\s+$/.test(valor)){
		
		$("#grupoNombreProveedor").attr({
			class: 'form-group has-error',
			title: 'Error,debe digitar un Nombre'
		});
		algoMal=true;
        }
       else{
          	if(tiene_simbolos6(valor) || tiene_tildes(valor)){
          	      
          		$("#grupoNombreProveedor").attr({

          		title: 'Error,Solo se permiten letras(sin tildes y ñ), números  y   "  .  "  ',
				class: 'form-group has-error'
			
		   		 });
		   		algoMal=true;

         	}else{
                   
         		$("#grupoNombreProveedor").attr({
				class: 'form-group',
				title: ''
		 		});

		 		if(valor.toUpperCase() !=  PROVEEDOR_MODIFICANDO_ACTUALMENTE.toUpperCase() && valor.toLowerCase() !=  PROVEEDOR_MODIFICANDO_ACTUALMENTE.toLowerCase()){
         

                arreglo=resultadoValidarNombreProveedor(valor);
              if(arreglo["resultado"]==1){

                        sweetAlert("Error!", "El Proveedor ya existe!", "error");
						$("#grupoNombreProveedor").attr({
						class: 'form-group has-error',
						title: 'Error; Proveedor repetido'
						});
						proveedorRepetido=true;
						algoMal=true;
              }
              else{
              		$("#grupoNombreProveedor").attr({
					  class: 'form-group',
					  title: ''
				       });
              }

        		}

	           if(!proveedorRepetido){
               $("#grupoNombreProveedor").attr({
			  class: 'form-group',
			  title: ''
		       });
	           }
	    }
		
       }
}


function validarTelefono(){
	 valor=document.getElementById("telefono").value;

       if( valor == null || valor.length == 0 || /^\s+$/.test(valor) ) {
		
		$("#grupoTelefono").attr({
			class: 'form-group has-error',
			title: 'Error,debe digitar un telefono'
		});
		algoMal=true;
      }


        else{

    	if(tiene_simbolos(valor) || tiene_letras(valor)){
          	$("#grupoTelefono").attr({
			class: 'form-group has-error',
			title: 'Error, solo se permiten números'
		    });
		algoMal=true;
      }
     
     else{
    	if(valor.length < 8){
        $("#grupoTelefono").attr({
			class: 'form-group has-error',
			title: 'Error,los números de telefono tienen mínimo 8 digitos'
		    });
		algoMal=true;
    	}
    	else{

         $("#grupoTelefono").attr({
		class: 'form-group',
		title: ''
		 });
     }
     }
		
      }
     
}


function validarEmail(){

   valor=document.getElementById("email").value;

    if(valor.length > 0 ){

    	if(tiene_simbolos4(valor) || tiene_tildes(valor)){
          	$("#grupoEmail").attr({
			class: 'form-group has-error',
			title: 'Error, se permiten solo letras(sin tildes y ñ) y los simbolos: @, . , -, _  '
		    });
		algoMal=true;
      }
     
       else{
       	 $("#grupoEmail").attr({
		class: 'form-group',
		title: ''
		 });
            if(!expresionRegularCorreo.test(valor)){
           $("#grupoEmail").attr({
			class: 'form-group has-error',
			title: 'Error, Formato de correo Invalido'
		    });
		algoMal=true;
            }
       else{
         $("#grupoEmail").attr({
		class: 'form-group',
		title: ''
		 });
     }
     }
		
      }
     else{
     	$("#grupoEmail").attr({
		class: 'form-group',
		title: ''
		 });
     }
}

                    

                 //                       VALIDAR FORMULARIO  FACTURA                      //





function validarFormularioFactura(){
 algoMal=false;
 if(modo==AGREGAR){
   validarNumeroFactura();
   validarProveedor();
    }
   validarOrdenCompra();
  
   validarFechaIngreso();
   
	if(algoMal){
		return false;
	}
	else{
     ingresar_O_editar_Factura();
     
	}
}


                             //                 CAMBIOS EN FORMULARIO FACTURA      ///



function validarNumeroFactura(){
 facturaRepetida=false;
  
   valor=document.getElementById("numeroFactura").value.trim();
   valor2=document.getElementById("proveedor").value.trim();

      if( valor == null || valor.length == 0 || /^\s+$/.test(valor)){
  
    $("#grupoNumeroFactura").attr({
   class: 'form-group has-error',
   title: 'Error,debe digitar un número de factura'
      });
       algoMal=true;
           }
          else{
           if(valor.length > 15){
             $("#grupoNumeroFactura").attr({
   class: 'form-group has-error',
   title: 'Error,no se permiten más de 15 digitos'
      });
       algoMal=true;
           }
           else{

               $("#grupoNumeroFactura").attr({
     class: 'form-group',
     title: ''
         });

             if(tiene_simbolos(valor) || tiene_letras(valor)){
                 
            $("#grupoNumeroFactura").attr({

            title: 'Error, No se permiten simbolos ni letras',
    class: 'form-group has-error'
   
        });
       algoMal=true;

          }
          else{


    if(modo==AGREGAR){
           arreglo=resultadoValidarLoteDeFactura(valor,valor2);
              if(arreglo["resultado"]==1){

                        sweetAlert("Error!", "Éste número de procedimiento ya está asociado a éste proveedor!", "error");
                        $("#grupoNumeroFactura").attr({
                        class: 'form-group has-error',
                        title: 'Error; Número de procedimiento repetido'
                        });
						facturaRepetida=true;
						algoMal=true;
              }
              else{
              		$("#grupoNumeroFactura").attr({
					  class: 'form-group',
					  title: ''
				       });
              }

            if(!facturaRepetida){
               $("#grupoNumeroFactura").attr({
              class: 'form-group',
              title: ''
                  });
            }
    }

    if(modo==EDITAR && valor!= NUMERO_PROCEDIMIENTO_MODIFICANDO_ACTUALMENTE && valor2!= PROVEEDOR_DE_COMPRA_MODIFICANDO_ACTUALMENTE){
    	                  arreglo=resultadoValidarLoteDeFactura(valor,valor2);
              if(arreglo["resultado"]==1){

                        sweetAlert("Error!", "Éste número de procedimiento ya está asociado a éste proveedor!", "error");
                        $("#grupoNumeroFactura").attr({
                        class: 'form-group has-error',
                        title: 'Error; Número de procedimiento repetido'
                        });
						facturaRepetida=true;
						algoMal=true;
              }
              else{
              		$("#grupoNumeroFactura").attr({
					  class: 'form-group',
					  title: ''
				       });
              }

            if(!facturaRepetida){
               $("#grupoNumeroFactura").attr({
              class: 'form-group',
              title: ''
                  });
            }

    }
       
      if(modo==EDITAR && valor== NUMERO_PROCEDIMIENTO_MODIFICANDO_ACTUALMENTE && valor2!=PROVEEDOR_DE_COMPRA_MODIFICANDO_ACTUALMENTE){
      	
                  arreglo=resultadoValidarLoteDeFactura(valor,valor2);
              if(arreglo["resultado"]==1){

                        sweetAlert("Error!", "Éste número de procedimiento ya está asociado a éste proveedor!", "error");
                        $("#grupoNumeroFactura").attr({
                        class: 'form-group has-error',
                        title: 'Error; Número de procedimiento repetido'
                        });
						facturaRepetida=true;
						algoMal=true;
              }
              else{
              		$("#grupoNumeroFactura").attr({
					  class: 'form-group',
					  title: ''
				       });
              }

            if(!facturaRepetida){
               $("#grupoNumeroFactura").attr({
              class: 'form-group',
              title: ''
                  });
            }
      }

               	if(modo==EDITAR && valor!=NUMERO_PROCEDIMIENTO_MODIFICANDO_ACTUALMENTE && valor2 == PROVEEDOR_DE_COMPRA_MODIFICANDO_ACTUALMENTE){
                arreglo=resultadoValidarLoteDeFactura(valor,valor2);
              if(arreglo["resultado"]==1){

                        sweetAlert("Error!", "Éste número de procedimiento ya está asociado a éste proveedor!", "error");
                        $("#grupoNumeroFactura").attr({
                        class: 'form-group has-error',
                        title: 'Error; Número de procedimiento repetido'
                        });
						facturaRepetida=true;
						algoMal=true;
              }
              else{
              		$("#grupoNumeroFactura").attr({
					  class: 'form-group',
					  title: ''
				       });
              }

            if(!facturaRepetida){
               $("#grupoNumeroFactura").attr({
              class: 'form-group',
              title: ''
                  });
            }
         	} 

     }
           }
  
       }
}


function validarProveedor(){

	existeProveedor=false;
	facturaRepetida=false;

	valor=document.getElementById("proveedor").value;
	valor2=document.getElementById("numeroFactura").value;

    if( valor == null || valor.length == 0 || /^\s+$/.test(valor) ){
		
		$("#grupoProveedor").attr({
			class: 'form-group has-error',
			title: 'Error,debe digitar un proveedor'
		});
		algoMal=true;
      }
      else{
      	  $("#grupoProveedor").attr({
		class: 'form-group',
		title: ''
		 });
         	
       
          if(tiene_simbolos6(valor)  || tiene_tildes(valor)){
          	$("#grupoProveedor").attr({
			class: 'form-group has-error',
			title: 'Error, Solo se permiten letras(sin tildes), números y ñ) y  " . "'
		    });
		algoMal=true;
         }

         else{

	       
         if(modo==AGREGAR){
         $("#grupoProveedor").attr({
		class: 'form-group',
		title: ''
		 });
         	
       
                
               arreglo=resultadoValidarLoteDeFactura(valor2,valor);
              if(arreglo["resultado"]==1){

                        sweetAlert("Error!", "Éste número de procedimiento ya está asociado a éste proveedor!", "error");
                        $("#grupoNumeroFactura").attr({
                        class: 'form-group has-error',
                        title: 'Error; Número de factura repetido'
                        });
						facturaRepetida=true;
						algoMal=true;
              }
              else{
              		$("#grupoNumeroFactura").attr({
					  class: 'form-group',
					  title: ''
				       });
              }



	           if(!facturaRepetida){
               $("#grupoNumeroFactura").attr({
			  class: 'form-group',
			  title: ''
		       });
	           }

         }

          if(modo==EDITAR && valor!=PROVEEDOR_DE_COMPRA_MODIFICANDO_ACTUALMENTE && valor2!=NUMERO_PROCEDIMIENTO_MODIFICANDO_ACTUALMENTE){
          	         $("#grupoProveedor").attr({
		class: 'form-group',
		title: ''
		 });
         	
       
                
               arreglo=resultadoValidarLoteDeFactura(valor2,valor);
              if(arreglo["resultado"]==1){

                        sweetAlert("Error!", "Éste número de procedimiento ya está asociado a éste proveedor!", "error");
                        $("#grupoNumeroFactura").attr({
                        class: 'form-group has-error',
                        title: 'Error; Número de factura repetido'
                        });
						facturaRepetida=true;
						algoMal=true;
              }
              else{
              		$("#grupoNumeroFactura").attr({
					  class: 'form-group',
					  title: ''
				       });
              }



	           if(!facturaRepetida){
               $("#grupoNumeroFactura").attr({
			  class: 'form-group',
			  title: ''
		       });
	           }

          }


         	if(modo==EDITAR && valor==PROVEEDOR_DE_COMPRA_MODIFICANDO_ACTUALMENTE && valor2!=NUMERO_PROCEDIMIENTO_MODIFICANDO_ACTUALMENTE){
         $("#grupoProveedor").attr({
		class: 'form-group',
		title: ''
		 });
         	
       
                
               arreglo=resultadoValidarLoteDeFactura(valor2,valor);
              if(arreglo["resultado"]==1){

                        sweetAlert("Error!", "Éste número de procedimiento ya está asociado a éste proveedor!", "error");
                        $("#grupoNumeroFactura").attr({
                        class: 'form-group has-error',
                        title: 'Error; Número de factura repetido'
                        });
						facturaRepetida=true;
						algoMal=true;
              }
              else{
              		$("#grupoNumeroFactura").attr({
					  class: 'form-group',
					  title: ''
				       });
              }



	           if(!facturaRepetida){
               $("#grupoNumeroFactura").attr({
			  class: 'form-group',
			  title: ''
		       });
	           }

         	} 

         	if(modo==EDITAR && valor!=PROVEEDOR_DE_COMPRA_MODIFICANDO_ACTUALMENTE && valor2 == NUMERO_PROCEDIMIENTO_MODIFICANDO_ACTUALMENTE){
                      $("#grupoProveedor").attr({
		class: 'form-group',
		title: ''
		 });
         	
       
                
               arreglo=resultadoValidarLoteDeFactura(valor2,valor);
              if(arreglo["resultado"]==1){

                        sweetAlert("Error!", "Éste número de procedimiento ya está asociado a éste proveedor!", "error");
                        $("#grupoNumeroFactura").attr({
                        class: 'form-group has-error',
                        title: 'Error; Número de factura repetido'
                        });
						facturaRepetida=true;
						algoMal=true;
              }
              else{
              		$("#grupoNumeroFactura").attr({
					  class: 'form-group',
					  title: ''
				       });
              }



	           if(!facturaRepetida){
               $("#grupoNumeroFactura").attr({
			  class: 'form-group',
			  title: ''
		       });
	           }        
    
         	}    
	    }
		
       }
         }
         	




function validarOrdenCompra(){
	contratoRepetido=false;
	valor=document.getElementById("orden").value;
   if( valor == null || valor.length == 0 || /^\s+$/.test(valor) ) {
		
		$("#grupoOrden").attr({
			class: 'form-group has-error',
			title: 'Error,debe digitar un número de contrato'
		});
		algoMal=true;
      }
  else{
          if(tiene_simbolos(valor) || tiene_tildes(valor)){
          	$("#grupoOrden").attr({
			class: 'form-group has-error',
			title: 'Error, solo se permiten alfanúmericos'
		});
		algoMal=true;
         }
		else{
			$("#grupoOrden").attr({
			class: 'form-group',
			title: ''
		});


           if(modo==AGREGAR){

                           arreglo=resultadoValidarContrato(valor);
              if(arreglo["resultado"]==1){

                        sweetAlert("Error!", "El Número de contrato ya existe!", "error");
						$("#grupoOrden").attr({
						class: 'form-group has-error',
						title: 'Error; número de contrato repetido'
						});
						contratoRepetido=true;
						algoMal=true;
              }
              else{
              		$("#grupoOrden").attr({
					  class: 'form-group',
					  title: ''
				       });
              }
           }
            if(modo==EDITAR && valor!=CONTRATO_MODIFICANDO_ACTUALMENTE){
                           arreglo=resultadoValidarContrato(valor);
              if(arreglo["resultado"]==1){

                        sweetAlert("Error!", "El Número de contrato ya existe!", "error");
						$("#grupoOrden").attr({
						class: 'form-group has-error',
						title: 'Error; número de contrato repetido'
						});
						contratoRepetido=true;
						algoMal=true;
              }
              else{
              		$("#grupoOrden").attr({
					  class: 'form-group',
					  title: ''
				       });
              }
            }

              }
        	

	           if(!contratoRepetido){
               $("#grupoOrden").attr({
			  class: 'form-group',
			  title: ''
		       });
	           }
		}
       
}


/*function validarOrdenCompra(){
	contratoRepetido=false;
	valor=document.getElementById("orden").value;
   if( valor == null || valor.length == 0 || /^\s+$/.test(valor) ) {
		
		$("#grupoOrden").attr({
			class: 'form-group has-error',
			title: 'Error,debe digitar un número de contrato'
		});
		algoMal=true;
      }
  else{
          if(tiene_simbolos(valor) || tiene_tildes(valor)){
          	$("#grupoOrden").attr({
			class: 'form-group has-error',
			title: 'Error, solo se permiten alfanúmericos'
		});
		algoMal=true;
         }
		else{
			$("#grupoOrden").attr({
			class: 'form-group',
			title: ''
		});


         	    arreglo=resultadoValidarContrato(valor);
              if(arreglo["resultado"]==1){

                        sweetAlert("Error!", "El Número de contrato ya existe!", "error");
						$("#grupoOrden").attr({
						class: 'form-group has-error',
						title: 'Error; número de contrato repetido'
						});
						contratoRepetido=true;
						algoMal=true;
              }
              else{
              		$("#grupoOrden").attr({
					  class: 'form-group',
					  title: ''
				       });
              }

        	

	           if(!contratoRepetido){
               $("#grupoOrden").attr({
			  class: 'form-group',
			  title: ''
		       });
	           }
		}
       }
}*/




function validarFechaIngreso(){
	valor=document.getElementById("fecha").value;
   if( valor == null || valor.length == 0 || /^\s+$/.test(valor) ) {
		
		$("#grupoFecha").attr({
			class: 'form-group has-error',
			title: 'Error,debe digitar una fecha: dd/mm/aaaa'
		});
		document.getElementById("preaviso").value="";
        document.getElementById("obsolescencia").value="";
		algoMal=true;

      }
   else{ 

         if(tiene_simbolos5(valor) || tiene_letras(valor)){
          	$("#grupoFecha").attr({
			class: 'form-group has-error',
			title: 'Error, solo se permite el siguiente formato dd/mm/aaaa'
		});
        document.getElementById("preaviso").value="";
        document.getElementById("obsolescencia").value="";
		algoMal=true;
         }
		else{
			if(valor.length > 10){
             $("#grupoFecha").attr({
			class: 'form-group has-error',
			title: 'Error,debe digitar una fecha formato: dd/mm/aaaa '
			});
             document.getElementById("preaviso").value="";
             document.getElementById("obsolescencia").value="";
		     algoMal=true;
			}
			else{
			if(valor.length < 10){
             $("#grupoFecha").attr({
			class: 'form-group has-error',
			title: 'Error,debe digitar una fecha formato: dd/mm/aaaa '
			});
             document.getElementById("preaviso").value="";
             document.getElementById("obsolescencia").value="";
             algoMal=true;
			}
			else{

				if(!expresionRegularFecha.test(valor)){
                 $("#grupoFecha").attr({
				class: 'form-group has-error',
				title: 'Fecha incorrecta'
				});
                 document.getElementById("preaviso").value="";
                 document.getElementById("obsolescencia").value="";
                 algoMal=true;
				}
				else{
					$("#grupoFecha").attr({
			   		class: 'form-group',
			   		title: ''
		        });
                var fechaPreAviso = sumaFecha(1460,valor);
                var fechaObsolescencia = sumaFecha(1825,valor);
                document.getElementById("preaviso").value=fechaPreAviso;
                document.getElementById("obsolescencia").value=fechaObsolescencia;

                if(document.getElementById("preaviso").value=="" || document.getElementById("obsolescencia").value==""){
                    $("#grupoPreaviso").attr({
				class: 'form-group has-error',
				title: 'Error'
				});

                         $("#grupoObsolescencia").attr({
				class: 'form-group has-error',
				title: 'Error'
				});
                }
				}
			}
			}
		}
       }
}



                 //                    VALIDAR FORMULARIO  OFICINA                      //





function validarFormularioOficina(){
   algoMal=false;

   validarNombreOficina();
   validarCodigoOficina();
 
   
	if(algoMal){
		return false;
	}
	else{
     ingresar_O_editar_Oficina();
     
	}
}


                             //                 CAMBIOS EN FORMULARIO OFICINA      ///


function validarNombreOficina(){
	oficinaRepetida=false;

     valor=document.getElementById("nombreOficina").value;

         if( valor == null || valor.length == 0 || /^\s+$/.test(valor)){
		
		$("#grupoNombreOficina").attr({
			class: 'form-group has-error',
			title: 'Error,debe digitar un Nombre'
		});
		algoMal=true;
        }
       else{
          	if(tiene_simbolos(valor) || tiene_numeros(valor) || tiene_tildes(valor)){
          	      
          		$("#grupoNombreOficina").attr({

          		title: 'Error, Solo se permiten letras(sin tildes y ñ)',
				class: 'form-group has-error'
			
		   		 });
		   		algoMal=true;

         	}else{
                   
         		$("#grupoNombreOficina").attr({
				class: 'form-group',
				title: ''
		 		});
         	


        	 if(valor.toUpperCase() != OFICINA_MODIFICANDO_ACTUALMENTE.toUpperCase() && valor.toLowerCase() != OFICINA_MODIFICANDO_ACTUALMENTE.toLowerCase()){

              arreglo=resultadoValidarNombreOficina(valor);
              if(arreglo["resultado"]==1){

                        sweetAlert("Error!", "La Oficina ya existe!", "error");
						$("#grupoNombreOficina").attr({
						class: 'form-group has-error',
						title: 'Error; Oficina repetida'
						});
						oficinaRepetida=true;
						algoMal=true;
              }
              else{
              		$("#grupoNombreOficina").attr({
					  class: 'form-group',
					  title: ''
				       });
              }

               }	
           
	    	
	           if(!oficinaRepetida){
               $("#grupoNombreOficina").attr({
			  class: 'form-group',
			  title: ''
		       });
	           }


	    }
		
       }
}


function validarCodigoOficina(){

	 valor=document.getElementById("codigoOficina").value;
     if( valor == null || valor.length == 0 || /^\s+$/.test(valor)){
		
		  $("#grupoCodigo").attr({
			class: 'form-group has-error',
			title: 'Error,debe digitar un codigo'
	    	});
	     	algoMal=true;
           }
      else{

     if(tiene_simbolos(valor) || tiene_tildes(valor)){
          	$("#grupoCodigo").attr({
			class: 'form-group has-error',
			title: 'Error, solo se permiten letras(sin tildes y ñ) y números'
		    });
		algoMal=true;
           }

           else{
      	$("#grupoCodigo").attr({
		class: 'form-group',
		title: ''
		 });
      }

       }
}



                               //            VALIDAR  FORMULARIO DE USUARIO           ////




function validarFormularioUsuario(){
      
      algoMal=false;
      if(modo==AGREGAR){
      	validarIdUsuario();
      }
      validarNombreUsuario();
     
      if(algoMal){
	  	return false;
	  }
	  else{
      ingresar_O_editar_Usuario();
     }
}



       ///     CAMBIOS DE FORMULARIO USUARIO   ///


function validarIdUsuario(){

         	usuarioRepetido=false;

        	valor=document.getElementById("idUsuario").value;

         if( valor == null || valor.length == 0 || /^\s+$/.test(valor)){
		
		 $("#grupoId").attr({
			class: 'form-group has-error',
			title: 'Error,debe digitar un ID'
		 });
		 algoMal=true;
          }
          else{
          	if(tiene_simbolos(valor) || tiene_tildes(valor)){
          	      
          		$("#grupoId").attr({

          		title: 'Error, No se permiten simbolos ni tildes y ñ)',
				class: 'form-group has-error'
			
		   		 });
		   		algoMal=true;

         	}else{

         		if(valor.length < 9){
         		$("#grupoId").attr({
                title: 'Error, mínimo 9 caracteres',
				class: 'form-group has-error'
			
		   		 });
		   		algoMal=true;

         		}
                   
         		else{
         		$("#grupoId").attr({
				class: 'form-group',
				title: ''
		 		});


         	    arreglo=resultadoValidarIdUsuario(valor);
              if(arreglo["resultado"]==1){

                        sweetAlert("Error!", "El Usuario ya existe!", "error");
						$("#grupoId").attr({
						class: 'form-group has-error',
						title: 'Error; Usuario repetido'
						});
						usuarioRepetido=true;
						algoMal=true;
              }
              else{
              		$("#grupoId").attr({
					  class: 'form-group',
					  title: ''
				       });
              }

        	

	           if(!usuarioRepetido){
               $("#grupoId").attr({
			  class: 'form-group',
			  title: ''
		       });
	           }
	     }
		}
         }
}



function validarNombreUsuario(){
    

	 valor=document.getElementById("nombreUsuario").value;

         if( valor == null || valor.length == 0 || /^\s+$/.test(valor)){
		
		$("#grupoNombreUsuario").attr({
			class: 'form-group has-error',
			title: 'Error,debe digitar un Nombre'
		});
		algoMal=true;
        }
       else{
          	if(tiene_simbolos(valor) || tiene_numeros(valor)  || tiene_tildes(valor)){
          	      
          		$("#grupoNombreUsuario").attr({

          		title: 'Error,Solo se permiten letras(sin tildes y ñ)',
				class: 'form-group has-error'
			
		   		 });
		   		algoMal=true;

         	}else{
                   
         		$("#grupoNombreUsuario").attr({
				class: 'form-group',
				title: ''
		 		});
         	
	    }
		
       }    	
  }

function validarFormularioContrasena(){
      
        algoMal=false;
        validarContrasenaActual()
      	validarContrasena();
        validarConfirmacionContrasena();

      if(algoMal){
	  	return false;
	  }
	  else{
      cambiarContrasena();
     }
}

function validarContrasenaActual(){
	 valor=document.getElementById("contrasena").value.trim();

         if( valor == null || valor.length == 0 || /^\s+$/.test(valor)){
		
		$("#grupoContrasena").attr({
			class: 'form-group has-error',
			title: 'Error,debe digitar su contraseña actual'
		});
		algoMal=true;
        }
        else{
        	$("#grupoContrasena").attr({
			class: 'form-group',
			title: ''
		});
        }	
}


		function validarContrasena(){


	 valor=document.getElementById("nuevaContrasena").value.trim();

         if( valor == null || valor.length == 0 || /^\s+$/.test(valor)){
		
		$("#grupoNuevaContrasena").attr({
			class: 'form-group has-error',
			title: 'Error,debe digitar una nueva contraseña'
		});
		algoMal=true;
        }
       else{
          	if(tiene_simbolos(valor)){
          	      
          		$("#grupoNuevaContrasena").attr({

          		title: 'Error,No se permiten simbolos',
				class: 'form-group has-error'
			
		   		 });
		   		algoMal=true;

         	}else{
                   
         		if(valor.length < 8){
         		$("#grupoNuevaContrasena").attr({
                title: 'Error, mínimo 8 caracteres',
				class: 'form-group has-error'
			
		   		 });
		   		algoMal=true;

         		}
         		else{
         		$("#grupoNuevaContrasena").attr({
				class: 'form-group',
				title: ''
		 		});
         		}
               
               if(document.getElementById("repetirContrasena").value ==valor){
               $("#grupoRepetirContraseña").attr({
				class: 'form-group',
				title: ''
		 		});
           }
           else{
           if(document.getElementById("repetirContrasena").value.length >0 && document.getElementById("repetirContrasena").value!=valor){
           		$("#grupoRepetirContrasena").attr({

          		title: 'Error,No coincide con la nueva contraseña',
				class: 'form-group has-error'
			
		   		 });
		   		algoMal=true;
           }
           }
	    }
		
   }    	

}

function validarConfirmacionContrasena(){
      
	 valor=document.getElementById("repetirContrasena").value.trim();

         if( valor == null || valor.length == 0 || /^\s+$/.test(valor)){
		
		$("#grupoRepetirContrasena").attr({
			class: 'form-group has-error',
			title: 'Error,debe confirmar la nueva contraseña'
		});
		algoMal=true;
        }
       else{
          	if(valor != document.getElementById("nuevaContrasena").value){
          	      
          		$("#grupoRepetirContrasena").attr({

          		title: 'Error,No coincide con la nueva contraseña',
				class: 'form-group has-error'
			
		   		 });
		   		algoMal=true;

         	}
         	else{
                $("#grupoRepetirContrasena").attr({
				class: 'form-group',
				title: ''
		 		});
         		}
         	
	    }
	
       }    	
/////////////////////////////////////////////////////// consulta de datos unicos a validar a la base de datos

function resultadoValidarTipoEquipo(actual){

            return JSON.parse($.ajax({
                type: "post",
                url: "php/validarTipoEquipo.php",
                data:("tipo="+actual),
                dataType: 'json',
                async:false,
                success: function(data)
                {
                    return data;
                }
            }).responseText);

}

function resultadoValidarDependencia(actual,oficina){

            return JSON.parse($.ajax({
                type: "post",
                url: "php/validarDependencia.php",
                data:("dependencia="+actual+"&oficina="+oficina),
                dataType: 'json',
                async:false,
                success: function(data)
                {
                    return data;
                }
            }).responseText);

}




function resultadoValidarNombreProveedor(actual){

            return JSON.parse($.ajax({
                type: "post",
                url: "php/validarProveedor.php",
                data:("nombreProveedor="+actual),
                dataType: 'json',
                async:false,
                success: function(data)
                {
                    return data;
                }
            }).responseText);

}

function resultadoValidarNombreOficina(actual){

            return JSON.parse($.ajax({
                type: "post",
                url: "php/validarOficina.php",
                data:("nombreOficina="+actual),
                dataType: 'json',
                async:false,
                success: function(data)
                {
                    return data;
                }
            }).responseText);

}

function resultadoValidarIdUsuario(actual){

            return JSON.parse($.ajax({
                type: "post",
                url: "php/validarUsuario.php",
                data:("idUsuario="+actual),
                dataType: 'json',
                async:false,
                success: function(data)
                {
                    return data;
                }
            }).responseText);

}

function resultadoValidarLoteDeFactura(numero,proveedor){

            return JSON.parse($.ajax({
                type: "post",
                url: "php/validarFactura.php",
                data:("numeroFactura="+numero+"&proveedor="+proveedor),
                dataType: 'json',
                async:false,
                success: function(data)
                {
                    return data;
                }
            }).responseText);

}

function resultadoValidarActivo(actual){

            return JSON.parse($.ajax({
                type: "post",
                url: "php/validarActivo.php",
                data:("activo="+actual),
                dataType: 'json',
                async:false,
                success: function(data)
                {
                    return data;
                }
            }).responseText);

}

function resultadoValidarContrato(actual){

            return JSON.parse($.ajax({
                type: "post",
                url: "php/validarContrato.php",
                data:("contrato="+actual),
                dataType: 'json',
                async:false,
                success: function(data)
                {
                    return data;
                }
            }).responseText);

}

function resultadoValidarSerie(actual){

            return JSON.parse($.ajax({
                type: "post",
                url: "php/validarSerie.php",
                data:("serie="+actual),
                dataType: 'json',
                async:false,
                success: function(data)
                {
                    return data;
                }
            }).responseText);

}

function resultadoValidarIP(actual){

            return JSON.parse($.ajax({
                type: "post",
                url: "php/validarIP.php",
                data:("IP="+actual),
                dataType: 'json',
                async:false,
                success: function(data)
                {
                    return data;
                }
            }).responseText);

}

function resultadoValidarIPPorActivo(ip,activo){

            return JSON.parse($.ajax({
                type: "post",
                url: "php/validarIPPorActivo.php",
                data:("IP="+ip+"&activo="+activo),
                dataType: 'json',
                async:false,
                success: function(data)
                {
                    return data;
                }
            }).responseText);

}

function resultadoValidarIPPorSerie(ip,serie){

            return JSON.parse($.ajax({
                type: "post",
                url: "php/validarIPPorSerie.php",
                data:("IP="+ip+"&serie="+serie),
                dataType: 'json',
                async:false,
                success: function(data)
                {
                    return data;
                }
            }).responseText);

}

function resultadoValidarTraspaso(actual){

            return JSON.parse($.ajax({
                type: "post",
                url: "php/validarTraspaso.php",
                data:("traspaso="+actual),
                dataType: 'json',
                async:false,
                success: function(data)
                {
                    return data;
                }
            }).responseText);

}
	
function resultadoValidarTraspasoPorActivo(traspaso,activo){

            return JSON.parse($.ajax({
                type: "post",
                url: "php/validarTraspasoPorActivo.php",
                data:("traspaso="+traspaso+"&activo="+activo),
                dataType: 'json',
                async:false,
                success: function(data)
                {
                    return data;
                }
            }).responseText);

}
function resultadoValidarTraspasoPorSerie(traspaso,serie){

            return JSON.parse($.ajax({
                type: "post",
                url: "php/validarTraspasoPorSerie.php",
                data:("traspaso="+traspaso+"&serie="+serie),
                dataType: 'json',
                async:false,
                success: function(data)
                {
                    return data;
                }
            }).responseText);

}

////////////////////////////////////////    OTROS  ////////////////////////////////////////////////////////






function tiene_letras(texto){
     texto = texto.toLowerCase();
     for(i=0; i<texto.length; i++){
     if (abecedario.indexOf(texto.charAt(i),0) != -1){
         return 1;
      }
     }
      return 0;
} 

function tiene_tildes(texto){
     texto = texto.toLowerCase();
     for(i=0; i<texto.length; i++){
     if (tildes.indexOf(texto.charAt(i),0) != -1){
         return 1;
      }
     }
      return 0;
} 

function tiene_numeros(texto){
   texto = texto.toLowerCase();
   for(i=0; i<texto.length; i++){
      if (numeros.indexOf(texto.charAt(i),0) != -1){
         return 1;
      }
   }
   return 0;
} 


function tiene_simbolos(texto){
   texto = texto.toLowerCase();
   for(i=0; i<texto.length; i++){
   	 if (todosLosSimbolos.indexOf(texto.charAt(i),0) != -1){
         return 1;
      }
   }
   return 0;
} 


function tiene_simbolos2(texto){
   texto = texto.toLowerCase();
   for(i=0; i<texto.length; i++){
      if (simbolosSinGuionMedioYSlash.indexOf(texto.charAt(i),0) != -1){
         return 1;
      }
   }
   return 0;
} 

function tiene_simbolos3(texto){
   texto = texto.toLowerCase();
   for(i=0; i<texto.length; i++){
      if (simbolosSinGuionMedioYSlash.indexOf(texto.charAt(i),0) != -1){
         return 1;
      }
   }
   return 0;
} 

function tiene_simbolos4(texto){
   texto = texto.toLowerCase();
   for(i=0; i<texto.length; i++){
      if (simbolosDeNoCorreo.indexOf(texto.charAt(i),0) != -1){
         return 1;
      }
   }
   return 0;
} 

function tiene_simbolos5(texto){
   texto = texto.toLowerCase();
   for(i=0; i<texto.length; i++){
      if (todosLosSimbolosMenosSlash.indexOf(texto.charAt(i),0) != -1){
         return 1;
      }
   }
   return 0;
} 

function tiene_simbolos6(texto){
   texto = texto.toLowerCase();
   for(i=0; i<texto.length; i++){
      if (simbolosSinPunto.indexOf(texto.charAt(i),0) != -1){
         return 1;
      }
   }
   return 0;
} 


  function soloLetras(e){
       key = e.keyCode || e.which;
       tecla = String.fromCharCode(key).toLowerCase();
       letras = 'abcdefghijklmnopqrstuvwxyz\u0020';
       especiales = "8-37-39-46";
       atras=37;
       adelante=39;
       espacio=255;
      

       tecla_especial = false

       if(atras==key){return true;}
       if(adelante==key){return true;}
       if(espacio==key){return true;}
   

       for(var i in especiales){
            if(key == especiales[i]){
                tecla_especial = true;
                break;
            }
        }

        if(letras.indexOf(tecla)==-1 && !tecla_especial){
        	
        	swal("Información!", "Ésta entrada solo permite letras");
        	
            return false;
        }
    }

   function soloNumeros(e){
       
       key = e.keyCode || e.which;
       tecla = String.fromCharCode(key).toLowerCase();
       especiales = "8-37-39-46";
       atras=37;
       arriba=38;
       adelante=39;
       abajo=40;
     

       tecla_especial = false

       if(atras==key){return true;}
       if(adelante==key){return true;}
       
       if(arriba==key){return true;}

       if(abajo==key){return true;}

       for(var i in especiales){
            if(key == especiales[i]){
                tecla_especial = true;
                break;
            }
        }

        if(numeros.indexOf(tecla)==-1 && !tecla_especial){
        	
        	swal("Información!", "Ésta entrada solo permite números");
        	
            return false;

        }
    }

    function soloNumerosYPuntos(e){
       key = e.keyCode || e.which;
       tecla = String.fromCharCode(key).toLowerCase();
       nums = "0123456789.";
       especiales = "8-37-39-46";
       atras=37;
       adelante=39;

       tecla_especial = false

       if(atras==key){return true;}
       if(adelante==key){return true;}

       for(var i in especiales){
            if(key == especiales[i]){
                tecla_especial = true;
                break;
            }
        }

        if(nums.indexOf(tecla)==-1 && !tecla_especial){
        	swal("Información!", "Ésta entrada solo permite números y  ' . '");
        	
            return false;
        }
    }

    function soloAlfanumericosGuionMedioYSlash(e){
       key = e.keyCode || e.which;
       tecla = String.fromCharCode(key).toLowerCase();
       letras = '0123456789abcdefghijklmnopqrstuvwxyz-/\u0020';
       especiales = "8-37-39-46";
       atras=37;
       adelante=39;

       tecla_especial = false

       if(atras==key){return true;}
       if(adelante==key){return true;}

       for(var i in especiales){
            if(key == especiales[i]){
                tecla_especial = true;
                break;
            }
        }

        if(letras.indexOf(tecla)==-1 && !tecla_especial){
        	swal("Información!", "Ésta entrada solo permite alfanúmericos, ' - '  y  ' / '");
        	
            return false;
        }
    }

    function soloParaEmails(e){
       key = e.keyCode || e.which;
       tecla = String.fromCharCode(key).toLowerCase();
       caractCorreo = '0123456789abcdefghijklmnopqrstuvwxyz-_.@';
       especiales = "8-37-39-46";
       atras=37;
       adelante=39;
       arriba=38;
       abajo=40;
       comillaSimple=222;

       tecla_especial = false

       if(atras==key){return true;}
       if(adelante==key){return true;}
       if(abajo==key){return true;}
       if(arriba==key){return true;}
        if(comillaSimple==key){return false;}

       for(var i in especiales){
            if(key == especiales[i]){
                tecla_especial = true;
                break;
            }
        }

        if(caractCorreo.indexOf(tecla)==-1 && !tecla_especial){
        	swal("Información!", "Ésta entrada solo permite alfanúmericos,  ' _ '     ' - '    ' . '   y   ' @ '");
        	
            return false;
        }
    }

    function soloParaFechas(e){
       key = e.keyCode || e.which;
       tecla = String.fromCharCode(key).toLowerCase();
       caracteres = '0123456789/';
       especiales = "8-37-39-46";
       atras=37;
       adelante=39;

       tecla_especial = false

       if(atras==key){return true;}
       if(adelante==key){return true;}

       for(var i in especiales){
            if(key == especiales[i]){
                tecla_especial = true;
                break;
            }
        }

        if(caracteres.indexOf(tecla)==-1 && !tecla_especial){
        	swal("Información!", "Ésta entrada solo permite números y  ' / '");
        	
            return false;
        }
    }

    function soloAlfanumericos(e){
       key = e.keyCode || e.which;
       tecla = String.fromCharCode(key).toLowerCase();
       letras = '0123456789abcdefghijklmnopqrstuvwxyz\u0020';
       especiales = "8-37-39-46";
       atras=37;
       adelante=39;

       tecla_especial = false

       if(atras==key){return true;}
       if(adelante==key){return true;}

       for(var i in especiales){
            if(key == especiales[i]){
                tecla_especial = true;
                break;
            }
        }

        if(letras.indexOf(tecla)==-1 && !tecla_especial){
        	swal("Información!", "Ésta entrada solo permite alfanúmericos");
        
            return false;
        }
    }

function soloAlfanumericosSinEspacio(e){
       key = e.keyCode || e.which;
       tecla = String.fromCharCode(key).toLowerCase();
       letras = '0123456789abcdefghijklmnopqrstuvwxyz';
       especiales = "8-37-39-46";
       atras=37;
       adelante=39;

       tecla_especial = false

       if(atras==key){return true;}
       if(adelante==key){return true;}

       for(var i in especiales){
            if(key == especiales[i]){
                tecla_especial = true;
                break;
            }
        }

        if(letras.indexOf(tecla)==-1 && !tecla_especial){
        	swal("Información!", "Ésta entrada solo permite alfanúmericos");
        
            return false;
        }
    }


function soloAlfanumericosYPuntos(e){
       key = e.keyCode || e.which;
       tecla = String.fromCharCode(key).toLowerCase();
       letras = '0123456789abcdefghijklmnopqrstuvwxyz.\u0020';
       especiales = "8-37-39-46";
       atras=37;
       adelante=39;

       tecla_especial = false

       if(atras==key){return true;}
       if(adelante==key){return true;}

       for(var i in especiales){
            if(key == especiales[i]){
                tecla_especial = true;
                break;
            }
        }

        if(letras.indexOf(tecla)==-1 && !tecla_especial){
        	swal("Información!", "Ésta entrada solo permite alfanúmericos");
        
            return false;
        }
    }



function isNumber(texto){

   for(i=0; i<texto.length; i++){
      if (numeros.indexOf(texto.charAt(i),0) != -1){
         return 1;
      }
   }
   return 0;
}

