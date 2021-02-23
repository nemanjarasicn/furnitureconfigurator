<?php
namespace NiemmanMoebelplaner\Model;

use NiemmanMoebelplaner\Help\Basic;
use NiemmanMoebelplaner\Help\Email;
use NiemmanMoebelplaner\Help\DB;

class Account extends DB{
    private $dbConn;
    private $tbName = '`user_account`';

    private $passwordSK = '2$W??:-%1|/aXzi(Yze{a^yDFaI`Co';

    private function connectDB(){
        $this->dbConn = DB::getInstance();
    }

    private function checkIfEmailExists($email){
        $this->connectDB();

        $sql = "SELECT COUNT(`id`) AS `number` FROM " . $this->tbName . " WHERE `email_address` = ?";
        $params = [$email];

        if((int)$this->dbConn->query(0, $sql, 0, $params) > 0) return true;

        return false;
        
    }

    function login($data){        
        $this->connectDB();
        
        $sql = "SELECT * FROM " . $this->tbName . " WHERE `email_address` = ? AND `password` = ? AND `email_address_validate` = ?";
        $params = [$data->email, hash('sha256', $data->password), 1];
        
        $res = $this->dbConn->query(0, $sql, 1, $params);

        if($res !== false){
            try {
                
                    //set jwt cookie
                    $payload = [
                        "uid" 	=> Basic::lightEncrypt($res["id"]),
                        "cts" 	=> Basic::lightEncrypt(_checkTokenString)
                    ];
                    $jwt = Basic::genJWTToken($payload);
                    
                    Basic::setSecureCookie($jwt);
        
                    Basic::responseJSON([true]);
                
        
                
            }catch(Exception $e){
                Basic::responseJSON([false, 'A-l-500']);   
            }
        }

        Basic::responseJSON([false, 'Falsche Anmeldeinformationen!']);

    }

    function register($data){
        if($data->password !== $data->password2) Basic::responseJSON([false, 'Passwörter müssen übereinstimmen']);    

        if($this->checkIfEmailExists($data->email)) Basic::responseJSON([false, 'Benutzer existiert bereits!']);
        
        $this->connectDB();
            
        $rnd = substr(md5(openssl_random_pseudo_bytes(20)),-20);
        
        //insert
        try{
            $sql = "INSERT INTO" . $this->tbName . " (`first_name`, `last_name`, `salutation`, `title`, `email_address`, `phone_number`, `address`, `password`, `verify_code`) VALUES (?,?,?,?,?,?,?,?,?)";
            $params = [
                $data->first_name,
                $data->last_name,
                $data->salutation,
                $data->title,
                $data->email_address,
                $data->phone_number,
                $data->address,
                hash('sha256', $data->password),
                $rnd
            ];
            $this->dbConn->query(1, $sql, 0, $params);
        }catch(Exception $e){
            Basic::responseJSON([false, 'A-r-i-500']);   
        }

        //send email
        try{
            $html_msg = '<!DOCTYPE html><html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"></head><body><h3>E-Mail-Verifizierung</h3><br /><br /><p>Bitte gehen Sie zum Link: </p><a target="_blank" href="https://niemann-moebelplaner.de/email_verification.php?u=' .  DB::$lastInsertedID . '">KONTO ÜBERPRÜFEN</a><br><p>und Code eingeben: <b>' . $rnd . '</b><br>Vielen Dank.</p></body></html>';
            $alt_msg = "E-Mail-Verifizierung, Bitte gehen Sie zum Link: https://niemann-moebelplaner.de/email_verification.php?u=" .  DB::$lastInsertedID . " und Code eingeben: " . $rnd;

            Email::send(
                $data->email, //to
                'E-Mail-Verifizierung', //subject
                $html_msg, //msg
                $alt_msg //alt msg
            );
        }catch(Exception $e){
            Basic::responseJSON([false, 'A-r-se-500']);   
        }
        

        Basic::responseJSON([true]);   
            
        
    }

    function verify($data){
        $this->connectDB();

        $sql = "SELECT COUNT(`id`) FROM " . $this->tbName . " WHERE `id` = ? AND `verify_code` = ?";
        $param = [$data->id, $data->code];

        if($this->dbConn->query(0, $sql, 0, $param) > 0){
            try {
                $sql = "UPDATE " . $this->tbName . " SET `email_address_validate` = ? WHERE `id` = ?";
                $param = [1, $data->id];
                $this->dbConn->query(2, $sql, 0, $param);
                
                Basic::responseJSON([true, 'Ihr Konto wurde überprüft, gehen Sie zur Anmeldeseite.']);   
            } catch (Exception $e) {
                Basic::responseJSON([false, 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später']);
            }
        }else Basic::responseJSON([false, 'Der Code ist ungültig']);   

        
    }

    function getUser($notBasic = false){
        $jwt = false;
        $userID = null;

        if(!isset($_COOKIE[_secureCookieNameToken])) Basic::responseJSON(false);   
        else{
            $jwt = Basic::readJWTToken($_COOKIE[_secureCookieNameToken]);

            if($jwt !== false && Basic::lightDecrypt($jwt['cts']) === _checkTokenString && !empty( Basic::lightDecrypt($jwt['uid']) ) ){
                $this->connectDB();

                $sql = "SELECT `first_name`, `last_name`, `title`, `salutation`, `email_address`, `address`, `phone_number` FROM " . $this->tbName . " WHERE `id` = ?";
                $params = [Basic::lightDecrypt($jwt['uid'])];

                if($notBasic === true) return $this->dbConn->query(0, $sql, 1, $params);
                else Basic::responseJSON($this->dbConn->query(0, $sql, 1, $params));
            }
            Basic::responseJSON(false);
        }
    }

    function logout(){
        if (isset($_COOKIE[_secureCookieNameToken])) {
            //set jwt cookie
            $payload = [
                "uid" 	=> Basic::lightEncrypt(null),
                "cts" 	=> Basic::lightEncrypt(_checkTokenString)
            ];
            $jwt = Basic::genJWTToken($payload);
            
            Basic::setSecureCookie($jwt, time() + 60);
        }
        Basic::responseJSON(true);
    }

    function sendOrder($data){       
        //send email
        try{
            $html_msg = 'order';
            $alt_msg = "order";

            Email::send(
                $data->email, //to
                'Auftrag', //subject
                $html_msg, //msg
                $alt_msg //alt msg
            );
        }catch(Exception $e){
            Basic::responseJSON([false, 'A-so-500']);   
        }
        
        Basic::responseJSON([true]);          
    }
}