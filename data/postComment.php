<?php
  header('Accept: application/json');
	header('Content-type: application/json');

	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "myUsers";

  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);

  // Check connection
  if ($conn->connect_error) {
    header("HTTP/1.1 500 Bad connection to Database");
		die("The server is down, we couldn't establish the DB connection");
  } else {

    $comments = $_POST["comments"];
    $username = $_POST["username"];
    $email = $_POST["email"];
    // Set sql query
		$sql = "INSERT INTO CommentTable (comments, username, email)
    VALUES ('$comments', '$username', '$email')";

    // Run query and store resulting data
    $result = $conn->query($sql);

    if ($result == TRUE) {
      echo json_encode("New comment posted successfully");
    } else {
      header("HTTP/1.1 406 Couldn't post new comment");
      die ("Couldn't post new comment");
    }
  }
?>
