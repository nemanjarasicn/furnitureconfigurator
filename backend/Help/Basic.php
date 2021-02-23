<?php
namespace NiemmanMoebelplaner\Help;

use \Firebase\JWT\JWT;

class Basic
{  
    const jwtTokenSK = "?X[P,ijXJ9iFCq@^i~mnM}TkZq/pz2AO@}D+[9ZR'%d+/bHi,fu%b=fu'*h2+FxMZ5v;spy)ym|-MTmW~E1/l`ynyTP8/,RMM;:0C\"Be=9-xo6`:3|f\"SquUpOEk2k";
	//AES Authenticated Encryption in GCM mode
	const lightSC 		 = "7S;3ZA^#>oz29ZaMfq-*";
	const lightCiphering = "aes-128-gcm";

  static function responseJSON($data)
  {
    echo json_encode($data);
    exit();
  }

  static function getRequestData()
  {
    if(isset($_SERVER['CONTENT_TYPE'])){
      return strpos((string) $_SERVER['CONTENT_TYPE'], 'multipart/form-data') !==
        false
        ? json_decode(json_encode($_POST))
        : json_decode(file_get_contents('php://input'));
    }
  }

  static function lightEncrypt($data){
		$ivlen = openssl_cipher_iv_length(self::lightCiphering);
		$iv = openssl_random_pseudo_bytes($ivlen);		
		return [openssl_encrypt($data, self::lightCiphering, self::lightSC, $options=0, $iv, $tag), base64_encode($tag), base64_encode($iv)];
	}

	static function lightDecrypt($data){
		$ivlen = openssl_cipher_iv_length(self::lightCiphering);
		$iv = openssl_random_pseudo_bytes($ivlen);
		return openssl_decrypt($data[0], self::lightCiphering, self::lightSC, $options=0, base64_decode($data[2]), base64_decode($data[1]));
  }


	static function genJWTToken($payload){//$payload must be array
		return JWT::encode($payload, self::jwtTokenSK);
	}
	
	static function readJWTToken($jwt){
		JWT::$leeway = 60;
		return (array) JWT::decode($jwt, self::jwtTokenSK, array('HS256'));		
	}
	
	static function setSecureCookie($data, $time = null)
	{
		if($time === null) $time = time()+60*60*24*3; //60sec 60min 24h 3d
		
		$domain = 'niemann-moebelplaner.de';
		
		setcookie(_secureCookieNameToken, $data, $time, '/', $domain, true, true);
	}

	static function get10RndStr() { 
		$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; 
		$randomString = ''; 
	  
		for ($i = 0; $i < 10; $i++) { 
			$index = rand(0, strlen($characters) - 1); 
			$randomString .= $characters[$index]; 
		} 
	  
		return $randomString; 
	} 
}