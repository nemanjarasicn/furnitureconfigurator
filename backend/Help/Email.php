<?php
namespace NiemmanMoebelplaner\Help;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class Email
{
    
    static function send($to, $subject, $text, $alt_text)
    {   
        try {
            $mail = new PHPMailer(true);

            $from = 'niemannmoebel@niemann-moebelplaner.de';
        
            //Server settings
            //$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      // Enable verbose debug output
            $mail->isSMTP();                                            // Send using SMTP
            $mail->Host       = 'mail.niemann-moebelplaner.de';                    // Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
            $mail->Username   = '_mainaccount@niemann-moebelplaner.de';                     // SMTP username
            $mail->Password   = 'Phenomenon1313#';                               // SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_STARTTLS` encouraged
            $mail->Port       = 465;                                    // TCP port to connect to, use 587 for `PHPMailer::ENCRYPTION_STARTTLS` above

            $mail->SMTPOptions = array(
                'ssl' => array(
                    'verify_peer' => false,
                    'verify_peer_name' => false,
                    'allow_self_signed' => true
                )
            );
        
            //Recipients
            $mail->setFrom($from);
            $mail->addAddress($to);     // Add a recipient
            
            //$mail->addReplyTo('info@example.com', 'Information');
            //$mail->addCC('cc@example.com');
            //$mail->addBCC('bcc@example.com');
        
            // Attachments
            //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
            //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

            // Content
            $mail->isHTML(true);        // Set email format to HTML
            $mail->Subject = $subject;
            $mail->Body = $text;
            $mail->AltBody = $alt_text;

            $mail->send();
        } catch (Exception $e) {
            //throw new Exception("Message could not be sent. Mailer Error: {$mail->ErrorInfo} | " .  $e->getMessage());
        }
    }
}