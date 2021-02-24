<?php
namespace NiemmanMoebelplaner\Model;

use NiemmanMoebelplaner\Help\Basic;
use NiemmanMoebelplaner\Help\Email;

class Kontakt{
    function sendMail($data){
        $allOk = true;
        $err = '';

        //send email to info@emotion-24.de
        try{
            $html_msg = 'Kontakt test niemann-moebelplaner';
            $alt_msg = "Kontakt test niemann-moebelplaner";

            Email::send(
                'info@emotion-24.de', //to
                'Kontakt test niemann-moebelplaner', //subject
                $html_msg, //msg
                $alt_msg //alt msg
            );
        }catch(Exception $e){
            $allOk = false;
            $err = 'K-s-se1-500';
            
        }
        
        //send email to user email, $data->email
        if($allOk){
            try{
                $html_msg = 'Kontakt test niemann-moebelplaner to User';
                $alt_msg = "Kontakt test niemann-moebelplaner to User";
    
                Email::send(
                    $data->email, //to
                    'Kontakt test niemann-moebelplaner to User', //subject
                    $html_msg, //msg
                    $alt_msg //alt msg
                );
            }catch(Exception $e){
                $allOk = false;
                $err = 'K-s-se2-500';
            }
        }

        if($allOk) Basic::responseJSON([true]);   
        else Basic::responseJSON([false, $err]);   
    }
}