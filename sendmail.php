<?php
    if(!empty($_POST))
    {
        $name = $_POST['name'];

        /* This is the email you get */
        $domain_url = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]";

        /* Must be HTTPS*/
        header("Content-type: application/json");
        header("Access-Control-Allow-Credentials: true");
        header("Access-Control-Allow-Origin: *.amprussia.com");
        header("AMP-Access-Control-Allow-Source-Origin: ".$domain_url);


        /*/ For send errors we use this specific undocumented code /*/
        if(!mail("dmatveev@google.com" , "Тестовая отправка" , "Email: $email <br/> Имя: $name" , "От: $name\n ")){
            header("HTTP/1.0 412 Precondition Failed", true, 412);

            echo json_encode(array('errmsg'=>'Произошла ошибка при отправке письма'));
            die();
        }
        else
        {
            /*/--Assuming all validations are good here--*/
            header("Access-Control-Expose-Headers: AMP-Access-Control-Allow-Source-Origin");   

                echo json_encode(array('successmsg'=>$_POST['name'].'Сообщение об успешной отправке.'));
            die();
        }
    }?>