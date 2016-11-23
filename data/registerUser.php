<?php
	header('Accept: application/json');
	header('Content-type: application/json');

	$servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "myUsers";
    //When I change $password to "root", the database does not connect. Why?

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);

	// Check connection
	if ($conn->connect_error)
    {
        header('HTTP/1.1 500 Bad connection to Database');
        die("The server is down, we couldn't establish the DB connection");
    }
    else
    {
        $email = "";
        $email = $_POST['email'];

        $sql = "SELECT * FROM Users WHERE email = '$email'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0)
        {
            header('HTTP/1.1 409 Conflict, email conflict');
            die("Email already in use.");
        }
        else
        {
            $user = "";
            $user = $_POST['user'];
            $passwrd = "";
            $passwrd = $_POST['passwrd'];

            $sql = "INSERT INTO Users(username, passwrd, email) VALUES ('$user', '$passwrd', '$email')";

            if (mysqli_query($conn, $sql))
            {
                echo json_encode("New record created successfully");
            }
            else
            {
                header('HTTP/1.1 500 Bad connection, something went wrong while saving your data, please try again later');
                die("Error: " . $sql . "\n" . mysqli_error($conn));
            }
        }
    }

?>
