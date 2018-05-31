function login(){


  ide=document.getElementById("form-username").value.trim();
  pas=document.getElementById("form-password").value.trim();

  if( ide == null || ide.length == 0 || /^\s+$/.test(ide)){
       swal("Error!", "Debe ingresar un ID!", "error");
       return;
        }

       else{
         if( pas == null || pas.length == 0 || /^\s+$/.test(pas)){
        swal("Error!", "Debe ingresar una contraseña!", "error")
        return;
        }
        else{
             
             var usu=jsonConDatosDeUsuarioEspecificoLogin(ide,pas);

             if(usu){
                tipo=usu["tipoUsuario"];
                estado=usu["estado"];

               if(tipo=="Administrador" && estado=="Habilitado"){location='Administrador.php';}

               if(tipo=="Tecnico" && estado=="Habilitado"){location='Tecnico.php';}

               if(tipo=="USUARIO" && estado=="Habilitado"){location='Usuario.php';}

             }
            
          else{
         swal("Error!", "Datos Incorrectos!", "error");
          }
        }
       }
}


function jsonConDatosDeUsuarioEspecificoLogin(id,pass){

            return JSON.parse($.ajax({
                type: "post",
                url: "php/traerUsuarioLogin.php",
                data:("idUsuario="+id+"&password="+pass),
                dataType: 'json',
                async:false,
                success: function(data)
                {
                    return data;
                }
            }).responseText);

}