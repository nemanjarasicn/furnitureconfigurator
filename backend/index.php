<?php
namespace NiemmanMoebelplaner;

use NiemmanMoebelplaner\Help\Basic;
use NiemmanMoebelplaner\Help\Email;

// error_reporting(E_ALL);
// ini_set("display_errors","On");

define('DS', DIRECTORY_SEPARATOR);

require 'config' . DS . 'config.php';

require 'Help' . DS . 'Basic.php';

$url = isset($_SERVER['REQUEST_URI'])
  ? explode('/', ltrim($_SERVER['REQUEST_URI'], '/'))
  : [];

  
if (
  $_SERVER['REQUEST_METHOD'] != 'POST' ||
  $url === []
) {
  Basic::responseJSON(100);
}

//Basic::responseJSON($url);
$data = Basic::getRequestData();

// Load Composer's autoloader
require 'lib' . DS . 'vendor' . DS . 'autoload.php';

//Help
require 'Help' . DS . 'DB.php';
require 'Help' . DS . 'Email.php';

//Model
require 'Model' . DS . 'Account.php';
require 'Model' . DS . 'Kontakt.php';

$mName = ucwords($url[1]);
if (
  file_exists('Model' . DS . $mName . '.php') &&
  class_exists('NiemmanMoebelplaner\\Model\\' . $mName)
) {
  $mName = 'NiemmanMoebelplaner\\Model\\' . $mName;
  $model = new $mName();
  
  $action = $url[2] ? $url[2] : 'index';
  if (method_exists($model, $action)) {
      call_user_func_array([$model, $action], [$data]);
  } else {
    Basic::responseJSON(102);
  }
} else {
  Basic::responseJSON(101);
}