<?php

	function connectionToDataBase(){
		$servername = "localhost";
		$username = "root";
		$password = "";
		$dbname = "myUsers";

		$conn = new mysqli($servername, $username, $password, $dbname);
		
		if ($conn->connect_error){
			return null;
		}
		else{
			return $conn;
		}
	}

	function loginMainDB($username){

		$conn = connectionToDataBase();

		if ($conn != null){
			$sql = "SELECT username, passwrd FROM Users WHERE username='$username'";
		
			$result = $conn->query($sql);

			if ($result->num_rows > 0)
			{
				while ($row = $result->fetch_assoc()) {

				$conn -> close();

				return array("status" => "SUCCESS", "username" => $row["username"], "passwrd" => $row["passwrd"]);
			}
			}
			else{
				$conn -> close();
				return array("status" => "USERNAME NOT FOUND");
			}
		}else{
			$conn -> close();
			return array("status" => "CONNECTION WITH DB WENT WRONG");
		}
	}

	function loginDB($username){

		$conn = connectionToDataBase();
		if ($conn != null){
			$sql = "SELECT username, passwrd FROM Users WHERE username = '$username'";
    		$result = $conn->query($sql);

    	 if ($result->num_rows == 0)
    {
        $conn -> close();
		return array("status" => "Bad credentials.");
    }
    	else{
    	while ($row = $result->fetch_assoc()) {
            	$response = array("username" => $row["username"], "passwrd" => $row["passwrd"]);
        		}

				$conn -> close();

		return array("status" => "SUCCESS");
    	}
    }
		
		else{
			$conn -> close();
			return array("status" => "CONNECTION WITH DB WENT WRONG");
		}

		}

		function postCommentDB($comment, $username, $email){
			$conn = connectionToDataBase();
		if ($conn != null){
			$sql = "INSERT INTO CommentTable (comments,username,email) VALUES ('$comment','$username','$email')";

    	 $result = $conn->query($sql);

      if ($result == TRUE) {
        $conn->close();
        return array("status" => "SUCCESS");
      } else {
        $conn->close();
        return array("status" => "COULDN`T POST NEW COMMENT");
      }
    } else {
      $conn->close();
      return array("status" => "CONNECTION WITH DB WENT WRONG");
    }

		}

		function retrieveCommentsDB(){

			$conn = connectionToDataBase();

			if ($conn != null){
			$sql = "SELECT username, comments, email FROM CommentTable";

			$result = $conn->query($sql);

			$resultArray = array();
		if ($result->num_rows > 0) {
			while ($row = $result->fetch_assoc()) {
				array_push($resultArray,array("username"=>$row["username"], "comments"=>$row["comments"], "email"=>$row["email"]));
        }
        $conn->close();
		return array("status" => "SUCCESS", "resultArray" => $resultArray);
	}

         else {
        $conn->close();
        return array("status" => "COULDN'T LOAD COMMENTS");
      }
    } else {
      $conn->close();
      return array("status" => "CONNECTION WITH DB WENT WRONG");
    }
		

		}

		function registerDB($user, $encryptedPasswrd, $email){
			$conn = connectionToDataBase();

			if ($conn != null){
			$sql = "SELECT * FROM Users WHERE email = '$email'";		
			$result = $conn->query($sql);

			if ($result->num_rows > 0)
			{
				$conn -> close();
				return array("status" => "ALREADY IN USE");
			}
			else{
				$sql = "INSERT INTO Users(username, passwrd, email) VALUES ('$user', '$encryptedPasswrd', '$email')";

				 if (mysqli_query($conn, $sql))
            {
                $conn -> close();
				return array("status" => "SUCCESS");
            }else{
				$conn -> close();
				return array("status" => "FAILURE IN INSERTION");
            }
				
			}
		}else{
			$conn -> close();
			return array("status" => "CONNECTION WITH DB WENT WRONG");
		}

		}

		function postOrderDB($username,$order){
			$conn = connectionToDataBase();
		if ($conn != null){
			$sql = "INSERT INTO OrderTable (user, order1) VALUES ('$username','$order')";

    	 $result = $conn->query($sql);

      if ($result == TRUE) {
        $conn->close();
        return array("status" => "SUCCESS");
      } else {
        $conn->close();
        return array("status" => "COULDN`T POST NEW ORDER");
      }
    } else {
      $conn->close();
      return array("status" => "CONNECTION WITH DB WENT WRONG");
    }
}

function retrieveOrdersDB(){

			$conn = connectionToDataBase();

			if ($conn != null){
			session_start();
    		$username = $_SESSION["username"];
			$sql = "SELECT order1 FROM OrderTable where user = '$username'";

			$result = $conn->query($sql);

			$orders = array();
		if ($result->num_rows > 0) { //Apparently selecting a non-object here.
			while ($row = $result->fetch_assoc()) {

				array_push($orders, array("orders" => $row["order1"]));
        }
        $conn->close();
		return array("status" => "SUCCESS", "orders" => $orders);
	}

         else {
        $conn->close();
        return array("status" => "COULDN'T LOAD ORDERS");
      }
    } else {
      $conn->close();
      return array("status" => "CONNECTION WITH DB WENT WRONG");
    }
		

		}

   
    


?>