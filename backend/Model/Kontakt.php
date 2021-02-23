<?php
namespace NiemmanMoebelplaner\Model;

use NiemmanMoebelplaner\Help\Basic;
use NiemmanMoebelplaner\Help\Email;

class Kontakt{
    function sendMail(){
        //send email
        try{
            $html_msg = 'Kontakt test';
            $alt_msg = "Kontakt test";

            Email::send(
                'belicg22@gmail.com',//$data->email, //to
                'Kontakt', //subject
                $html_msg, //msg
                $alt_msg //alt msg
            );
        }catch(Exception $e){
            Basic::responseJSON([false, 'K-s-se-500']);   
        }        

        Basic::responseJSON(true);   
    }
}