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
if ($conn->connect_error)
{
    header('HTTP/1.1 500 Bad connection to Database');
    die("The server is down, we couldn't establish the DB connection");
}
else
{
    $username = $_POST['username'];
    $passwrd = $_POST['passwrd'];

    $sql = "SELECT * FROM Users WHERE username = '$username' AND passwrd = '$passwrd'";
    $result = $conn->query($sql);

    if ($result->num_rows == 0)
    {
        header('HTTP/1.1 409 Bad credentials');
        die("Bad credentials.");
    }
    else
    {
        header('Perfect');
        $row = $result->fetch_assoc();
        $email = $row['email'];
        
        session_start();
        $_SESSION["username"] = $username;
        $_SESSION["passwrd"] = $passwrd;

        echo json_encode("Session started");
        
    }
}

?>
