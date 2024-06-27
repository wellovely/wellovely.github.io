<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $text = $_POST["text"];

  
	$to = "support@" . $_SERVER['HTTP_HOST'];



    $subject = "New Contact Form Submission";


    $body = "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Tel:\n$text";


    $headers = "From: $to \r\n";

 
    mail($to, $subject, $body, $headers);

    // Redirect to thank you page
    header("Location: thank_page.html");
    exit();
}
?>
