<?php
header('Accept: application/json');
header('Content-type: application/json');

$cookieName = $_POST["cookieName"];
$cookieValue = $_POST["cookieValue"];

    setcookie($cookieName, $cookieValue, time() + (86400 * 20), "/", "", 0); 

  if (isset($_COOKIE[$cookieName])) {
    echo json_encode("Cookie" + $cookieName + "created");
  } else {
    echo json_encode("Can't create cookie");
  }

?>
