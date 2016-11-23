<?php
  header('Accept: application/json');
  header('Content-type: application/json');

  session_start();

  if (isset($_SESSION["username"]) && isset($_SESSION["passwrd"])) {

    echo json_encode(array("username" => $_SESSION["username"], "passwrd" => $_SESSION["passwrd"]));
  } else {
    die("Session is not set");
  }
?>
