<?php
  $servername = "studentdb-maria.gl.umbc.edu";
  $username = "abodnya1";
  $password = "abodnya1";

  // Create connection
  $conn = new mysqli($servername, $username, $password);

  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
  echo "Connected successfully";

  $insert = "INSERT INTO `user_highscore`(`nameOfPlayer`, `points`) VALUES ([value-1],[value-2])";

  if($conn->query($insert) === TRUE) {
    echo "New record created successfully";
  }else{
    echo "Error: " . $insert . "<br>" . $conn->error;
  }

  $conn->close();
?>
