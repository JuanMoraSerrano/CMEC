<?php

   require_once 'coneccion_mysql.php';

	$query="SELECT * FROM Oficina";
	$resultado=mysqli_query($conexion2,$query);
if(!$resultado){
	die("ERROR");
}else{    
	$arreglo["data"] = []; 
	while($data=mysqli_fetch_assoc($resultado)){
		$arreglo["data"][]=array_map("utf8_decode", $data) ;
	}
	echo json_encode($arreglo);
}
mysqli_free_result($resultado);

/*    $server = "localhost";
	$user = "root";
	$password = "";
	$bd = "cmec_db";

 $conexion2 = mysqli_connect($server, $user, $password, $bd);
	if (!$conexion2){ 
		die('Error');	
	}	

	$query="SELECT * FROM Oficina";

	$resultado=mysqli_query($conexion2,$query);
    if(!$resultado){
	die("ERROR");
    }
    else{    

	     $cadena="<script language='javascript'>$('#tablaOficinas').append(";
	     while($row = mysqli_fetch_array($resultado)){
           $cadena.= '<tr>
                             <td>'.$row['nombreOficina'].'</td>
                             <td>'.$row['codigoOficina'].'</td>
                      </tr>';
                     }

           $cadena.=");$('#tablaOficinas').DataTable({dom: 'Bfrtip', buttons: [  'pdf', 'print' ] });</script>";

     echo $cadena;
}

mysqli_free_result($resultado);
mysqli_close($conexion2);*/

?>