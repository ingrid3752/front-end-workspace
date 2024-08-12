function viewReservation() {
  fetch("reservation.php?action=view")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("content").innerHTML = data;
    });
}

function info() {
  // Add functionality here if needed
  alert("예약현환정보 기능을 추가하세요.");
}

function hotelinfo() {
  // Add functionality here if needed
  alert("호텔예약정보 기능을 추가하세요.");
}

function tiketinfo() {
  // Add functionality here if needed
  alert("경기예약정보 기능을 추가하세요.");
}

function memberinfo() {
  // Add functionality here if needed
  alert("회원정보수정 기능을 추가하세요.");
}

/*
5. PHP Script for Backend (reservation.php)
Create a PHP file (reservation.php) to handle database interactions.

<?php
$servername = "localhost";
$username = "root";  // Update with your DB username
$password = "";  // Update with your DB password
$dbname = "reservation_system";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_GET['action'] == 'view') {
    $sql = "SELECT * FROM reservations";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        echo "<table border='1'><tr><th>ID</th><th>Name</th><th>Date</th><th>Time</th><th>Status</th></tr>";
        while($row = $result->fetch_assoc()) {
            echo "<tr><td>" . $row["id"]. "</td><td>" . $row["name"]. "</td><td>" . $row["date"]. "</td><td>" . $row["time"]. "</td><td>" . $row["status"]. "</td></tr>";
        }
        echo "</table>";
    } else {
        echo "0 results";
    }
} 
    
$conn->close();
?>
*/
/*
6. Connecting Everything
Ensure your files are correctly linked:

Place styles.css in the same directory as your HTML file.
Place script.js in the same directory as your HTML file.
Make sure reservation.php is on your server where it can be accessed by your HTML file.
7. Running the Program
Make sure your web server (e.g., Apache, Nginx) is running.
Access the HTML file via your browser.
Click the "예약현황" button to see the reservations.
This basic setup should give you a functional reservation system. You can expand the functionality, improve the interface, and add features as needed.

*/
