<?php
  header('Accept: application/json');
  header("Content-type: application/json");
  require_once __DIR__ . "/dataLayer.php";

  $action = $_POST["action"];

    switch ($action) {
    case "LOGINMAIN":
      loginMain();
      break;
    case "LOGIN":
      login();
      break;
    case "LOGOUT";
    	logout();
    	break;
    case "POST_COMMENT":
      postComment();
      break;
    case "RETRIEVE_COOKIE":
      retrieveCookie();
      break;
    case "CREATE_COOKIE":
      createCookie();
      break;
    case "RETRIEVE_SESSION":
      retrieveSession();
      break;
    case "LOAD_COMMENTS":
      loadComments();
      break;
    case "REGISTER_USER":
      registerUser();
      break;
    case "STORE_ORDER":
      storeOrder();
      break;
    case "LOAD_ORDERS":
      loadOrders();
  }

  function loginMain(){
  	$username = $_POST["username"];

  	$result = loginMainDB($username);

    if ($result['status'] == 'SUCCESS'){
      $decryptedPasswrd = decryptPassword($result['passwrd']);
      $passwrd = $_POST["passwrd"];

      if ($decryptedPasswrd === $passwrd)
        { 
          startSession($username, $passwrd);
      
      echo json_encode(array("message" => "LoginMain Successful"));
      }
      else{
        header('HTTP/1.1 306 Wrong credentials');
        die("Wrong credentials");
      }


    }

  }

  function decryptPassword($passwrd){
    $key = pack('H*', "bcb04b7e103a05afe34763051cef08bc55abe029fdebae5e1d417e2ffb2a00a3");
      
      $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
      
      $ciphertext_dec = base64_decode($passwrd);
      $iv_dec = substr($ciphertext_dec, 0, $iv_size);
      $ciphertext_dec = substr($ciphertext_dec, $iv_size);

      $passwrd = mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $key, $ciphertext_dec, MCRYPT_MODE_CBC, $iv_dec);
      
      
      $count = 0;
      $length = strlen($passwrd);

      for ($i = $length - 1; $i >= 0; $i --)
      {
        if (ord($passwrd{$i}) === 0)
        {
          $count ++;
        }
      }

      $decryptedPasswrd = substr($passwrd, 0,  $length - $count); 

      return $decryptedPasswrd;
  }

  function startSession($username,$passwrd){
      session_start();
      $_SESSION["username"] = $username;
      $_SESSION["passwrd"] = $passwrd;
  }

  function login(){
  	$username = $_POST['username'];

    $result = loginDB($username);

    if ($result['status'] == 'SUCCESS'){
      $decryptedPasswrd = decryptPassword($result['passwrd']);
      $passwrd = $_POST["passwrd"];

      if ($decryptedPasswrd === $passwrd)
        { 
          startSession($username, $passwrd);
      
      echo json_encode(array("message" => "Login Successful", "username" => $_SESSION["username"]));
      }
      else{
        header('HTTP/1.1 306 Wrong credentials');
        die("Wrong credentials");
      }


    }
  }

  function logout(){
    session_start();
    unset($_SESSION["username"]);
    unset ($_SESSION["passwrd"]);
    session_destroy();

    echo json_encode(array("message"=> "success"));
  }

  function postComment(){
  	$comment = $_POST["comments"];
    $username = $_POST["username"];
    $email = $_POST["email"];

    $result = postCommentDB($comment, $username, $email);

    if ($result["status"] == "SUCCESS") {
      echo json_encode(array("message" => "New comment posted"));
    } else {
      header("HTTP/1.1 500 " . $result["status"]);
			die($result["status"]);
    }
  }

  function retrieveCookie(){
  	$cookieName = $_POST["cookieName"];
    session_start();

  	if (isset($_COOKIE[$cookieName])) {
    echo json_encode($_COOKIE[$cookieName]);
  } else {
    die("Cookie for $cookieName is not set");
  }
  }

  function createCookie(){
  $cookieName = $_POST["cookieName"];
	$cookieValue = $_POST["cookieValue"];

	setcookie($cookieName, $cookieValue, time() + (86400 * 20), "/", "", 0); 

  if (isset($_COOKIE[$cookieName])) {
    echo json_encode($cookieValue);
  } else {
    header("Can't create cookie");
  }
  }

  function retrieveSession(){
  	session_start();

  if (isset($_SESSION["username"])) {

    echo json_encode(array("username" => $_SESSION["username"]));
  } else {
    echo json_encode("Session not set");
    die("Session is not set");
  }
  }

  function loadComments(){
  	$result = retrieveCommentsDB();

  	if ($result["status"] == "SUCCESS") {
      echo json_encode($result["resultArray"]);
    } else {
      header("HTTP/1.1 500 " . $result["status"]);
			die($result["status"]);
    }
  }

  function registerUser(){
            $user = $_POST['user'];
            $passwrd = $_POST['passwrd'];
            $encryptedPasswrd = encryptPassword($passwrd);
            $email = $_POST['email'];

            $result = registerDB($user, $encryptedPasswrd, $email);

            if($result["status"] == "SUCCESS"){

            echo json_encode(array("message" => "Registration Successful"));
            } else{
            header("HTTP/1.1 500 " . $result["status"]);
            die($result["status"]);
            }


  }

 function encryptPassword($passwrd)
  {

      $key = pack('H*', "bcb04b7e103a05afe34763051cef08bc55abe029fdebae5e1d417e2ffb2a00a3");
      $key_size =  strlen($key);
      
      $plaintext = $passwrd;

      $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
      $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
      
      $ciphertext = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key, $plaintext, MCRYPT_MODE_CBC, $iv);
      $ciphertext = $iv . $ciphertext;
      
      $encryptedPasswrd = base64_encode($ciphertext);

      return $encryptedPasswrd;
  }

  function storeOrder()
  {
    session_start();
    $order = $_POST["order"];
    $username = $_SESSION["username"];

    $result = postOrderDB($username,$order);

    if ($result["status"] == "SUCCESS") {
      echo json_encode(array("message" => "New order posted"));
    } else {
      header("HTTP/1.1 500 " . $result["status"]);
      die($result["status"]);
    }
  }

  function loadOrders(){
    
    $result = retrieveOrdersDB();

    if ($result["status"] == "SUCCESS") {
      echo json_encode($result["orders"]);
    } else {
      header("HTTP/1.1 500 " . $result["status"]);
      die($result["status"]);
    }
  }

 ?>