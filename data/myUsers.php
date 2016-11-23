<?php
	header('Accept: application/json');
	header('Content-type: application/json');

	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "myUsers";
//Connecting to the server.Need to create new class.
	$conn = new mysqli($servername, $username, $password, $dbname);
//to check if there are errors
	if ($conn->connect_error)
	{
//to show what kind of error is happening. Automatically in jSon format
		header("HTTP/1.1 500 Bad Connection to Database");
		die("The server is down, we couldn't establish the DB connection");
	}

	else
	{	//use POST to send information back and forth. 
		
header("HTTP/1.1 200 Perfect");
		$sql = "SELECT username, comments, email FROM CommentTable";

		$result = $conn->query($sql);

		$resultArray = array();
		if ($result->num_rows > 0) {
			while ($row = $result->fetch_assoc()) {
				array_push($resultArray,array("username"=>$row["username"], "email"=>$row["email"], "comments"=>$row["comments"]));
        }
		echo json_encode($resultArray);
	};
}
?>

 
 
