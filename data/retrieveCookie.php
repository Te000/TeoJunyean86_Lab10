<?php
  header('Accept: application/json');
  header('Content-type: application/json');

  $cookieName = $_POST["cookieName"];

  if (isset($_COOKIE[$cookieName])) {
    echo json_encode($_COOKIE[$cookieName]);
  } else {
    die("Cookie for $cookieName is not set");
  }
?>
