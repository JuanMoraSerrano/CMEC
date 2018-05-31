   <?php
    require_once 'coneccion_mysql.php';

$caracter=$_POST['q'];
$resul=$conexion2->query("SELECT nombreOficina FROM oficina WHERE nombreOficina LIKE '%$caracter%'");

$datos=array();
while($row=$resul->fetch_assoc()){
	$datos[]=$row['nombreOficina'];
}
echo json_encode($datos);

?>