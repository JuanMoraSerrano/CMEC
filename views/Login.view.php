
<!DOCTYPE html>
<html lang="en">

    <head>

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Iniciar sesión-CEMEC</title>

        <!-- CSS -->
        <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Roboto:400,100,300,500">
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/font-awesome.min.css">
		<link rel="stylesheet" href="css/form-elements.css">
        <link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" type="text/css" href="sweetalert-master/sweetalert.css">

        <script src="sweetalert-master/sweetalert.min.js"></script>
        <script type="text/javascript" src="js/js-propios/LogicaLogin.js"></script>


        <!-- Favicon and touch icons -->
        <link rel="shortcut icon" href="">
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href="Login/ico/apple-touch-icon-144-precomposed.png">
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="Login/ico/apple-touch-icon-114-precomposed.png">
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="Login/ico/apple-touch-icon-72-precomposed.png">
        <link rel="apple-touch-icon-precomposed" href="Login/ico/apple-touch-icon-57-precomposed.png">

    </head>

    <body>
   <div id="particles-js"></div>
        <!-- Top content -->
        <div class="top-content">
        	
            <div class="inner-bg">
                <div class="container">
                    <div class="row">
                 
                    </div>
              
                    <div class="row">
                        <div class="col-sm-6 col-sm-offset-3 form-box">
                        	<div class="form-top">
                        		<div class="form-top-left">
                        			<h3>Inicie sesión en nuestro sitio</h3>
                            		<p>Introduzca su identificación de usuario y contraseña para iniciar sesión:</p>
                        		</div>
                        		<div class="form-top-right">
                        			<i class="fa fa-key"></i>
                        		</div>
                            </div>
                            <div class="form-bottom">
			                    <form role="form" class="login-form">
			                    	<div class="form-group">
			                    		<label class="sr-only" for="form-username">ID</label>
			                        	<input type="text" name="form-username" placeholder="ID..." class="form-username form-control" id="form-username">
			                        </div>
			                        <div class="form-group">
			                        	<label class="sr-only" for="form-password">Contraseña</label>
			                        	<input type="password" name="form-password" placeholder="Contraseña..." class="form-password form-control" id="form-password">
			                        </div>


			                        
			                 </form>

                            
                          <center>
                          <button  class="btn btn-primary" style="width: 200px" onclick="login()">Entrar!</button></center> 
		                    </div>
                        </div>
                    </div>
        
          
                </div>
            </div>
            
        </div>


        <!-- Javascript -->
        <script src="js/jquery-1.11.1.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/jquery.backstretch.min.js"></script>
        <script src="js/scripts.js"></script> 
         <script src="js/particles.min.js"></script> 

        

    </body>

   
</html>

