<?php
// echo "Hola, respuesta desde el servidor";
// var_dump($_FILES); //Crea toda la informacion dle archivo qque se sube



if(isset($_FILES["file"])){
    $name = $_FILES["file"]["name"]; //Guarda el nombre del archivo que se esta subiendo 
    $file = $_FILES["file"]["tmp_name"]; //Guara el nombre del archivo que se esta subiendo e
    $error = $_FILES["file"]["error"]; //Para guardar el error
    $destination  = "C:\laragon\www\Uploader\FILES" . $name;
 
    $upload = move_uploaded_file($file, $destination);
    
    if($upload){
        $res = array(
            "err"=>false,
            "status"=>http_response_code(200),
            "statusText"=>"Archivo subido con exito",
            "files"=> $_FILES["file"]
        );
    }else{
        $res = array(
            "err"=>true,
            "status"=>http_response_code(400),
            "statusText"=>"Error al subir el archivo",
            "files"=> $_FILES["file"]
        );
    }

}



