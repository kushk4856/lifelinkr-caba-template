<?php
if (isset($_POST['submit'])) {

    // Define recipient email
    // $email_to = "himanshu.lifelinkr@gmail.com, rakshitkapur.dm@gmail.com";
    $email_to = "himanshu.lifelinkr@gmail.com, dm.shrutisharma@gmail.com, 4exult@gmail.com";
    $email_subject = "Query from Best English Speaking Institute (Popup Form)";

    // Sanitize and assign POST data to variables
    $name = $_POST['name']; // required
    $company_email = $_POST['email']; // required
    $phone = $_POST['phone']; // required
    $clinic_name = $_POST['clinic_name']; // required
    $city = $_POST['city'];
    $using_software = $_POST['is_using_software'];
    $selected_date = $_POST['selected_date']; // required
    $selected_time = $_POST['selected_time']; // required
    $message = $_POST['message'];
    $guest_emails = $_POST['invities'];

    // Combine date and time
    $selected_date_time = $selected_date . ' ' . $selected_time;

    // Calculate Google Calendar event start and end time
    $start_date_time = date('Ymd\THis', strtotime($selected_date_time));
    $end_date_time = date('Ymd\THis', strtotime($selected_date_time . ' +1 hour'));

    // Retrieve the full URL of the referring page
    $full_url = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : 'N/A';

    // Extract UTM parameters from the URL
    $utm_source = $utm_medium = $utm_campaign = $utm_term = $utm_content = 'N/A';
    if ($full_url !== 'N/A') {
        $url_components = parse_url($full_url);
        if (isset($url_components['query'])) {
            parse_str($url_components['query'], $query_params);
            $utm_source = $query_params['utm_source'] ?? 'N/A';
            $utm_medium = $query_params['utm_medium'] ?? 'N/A';
            $utm_campaign = $query_params['utm_campaign'] ?? 'N/A';
            $utm_term = $query_params['utm_term'] ?? 'N/A';
            $utm_content = $query_params['utm_content'] ?? 'N/A';
        }
    }

    // Function to sanitize input data
    function clean_string($string) {
        $bad = ["content-type", "bcc:", "to:", "cc:", "href"];
        return str_replace($bad, "", $string);
    }

    // Get user IP address
    $ip = $_SERVER['REMOTE_ADDR'];

    // Prepare email message with HTML formatting
    $email_message = "
        <p><strong>Name:</strong> " . clean_string($name) . "</p>
        <p><strong>Email:</strong> " . clean_string($company_email) . "</p>
        <p><strong>Phone:</strong> " . clean_string($phone) . "</p>
        <p><strong>City:</strong> " . clean_string($city) . "</p>
        <p><strong>Message:</strong> " . clean_string($message) . "</p>
        <p><strong>Selected Date & Time:</strong> " . clean_string($selected_date_time) . "</p>
        <p><strong>IP Address:</strong> " . clean_string($ip) . "</p>
        <p><strong>Full URL:</strong> " . clean_string($full_url) . "</p>
        <p><strong>UTM Source:</strong> " . clean_string($utm_source) . "</p>
        <p><strong>UTM Medium:</strong> " . clean_string($utm_medium) . "</p>
        <p><strong>UTM Campaign:</strong> " . clean_string($utm_campaign) . "</p>
        <p><strong>UTM Term:</strong> " . clean_string($utm_term) . "</p>
        <p><strong>UTM Content:</strong> " . clean_string($utm_content) . "</p>
    ";

    // Add Google Calendar link as a button
    $calendar_url = "https://www.google.com/calendar/render?action=TEMPLATE&text=Meeting%20Schedule%20&dates=$start_date_time/$end_date_time&details=Details%20from%20your%20form&location=Clinic%20Location";
    $email_message .= "<br><br><a href='$calendar_url' style='
        display: inline-block;
        padding: 10px 20px;
        font-size: 16px;
        color: white;
        background-color: #4285F4;
        text-decoration: none;
        border-radius: 5px;
        margin-top: 10px;
    '>Add to Google Calendar</a>";

    // Email headers
    $headers = "From: leads@engmates.com\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Send email
    if (@mail($email_to, $email_subject, $email_message, $headers)) {
    } else {
        echo "Failed to send email.";
    }
}
?>

<html>

<style>
  *{
  box-sizing:border-box;
 /* outline:1px solid ;*/
}
body{
background: #ffffff;
background: linear-gradient(to bottom, #ffffff 0%,#e1e8ed 100%);
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#e1e8ed',GradientType=0 );
    height: 100%;
        margin: 0;
        background-repeat: no-repeat;
        background-attachment: fixed;
  
}

.wrapper-1{
  width:100%;
  height:100vh;
  display: flex;
flex-direction: column;
}
.wrapper-2{
  padding :30px;
  text-align:center;
}
h1{
    font-family: 'Kaushan Script', cursive;
  font-size:4em;
  letter-spacing:3px;
  color: #c77201 ;
  margin:0;
  margin-bottom:20px;
}
.wrapper-2 p{
  margin:0;
  font-size:1.3em;
  color:#aaa;
  font-family: 'Source Sans Pro', sans-serif;
  letter-spacing:1px;
}
.go-home{
  color:#fff;
  background: #c77201;
  border:none;
  padding:10px 50px;
  margin:30px 0;
  border-radius:30px;
  text-transform:capitalize;
  box-shadow: 0 10px 16px 1px rgba(174, 199, 251, 1);
}
.footer-like{
  margin-top: auto; 
  background:#D7E6FE;
  padding:6px;
  text-align:center;
}
.footer-like p{
  margin:0;
  padding:4px;
  color:#5892FF;
  font-family: 'Source Sans Pro', sans-serif;
  letter-spacing:1px;
}
.footer-like p a{
  text-decoration:none;
  color:#5892FF;
  font-weight:600;
}

@media (min-width:360px){
  h1{
    font-size:4.5em;
  }
  .go-home{
    margin-bottom:20px;
  }
}

@media (min-width:600px){
  .content{
  max-width:1000px;
  margin:0 auto;
}
  .wrapper-1{
  height: initial;
  max-width:620px;
  margin:0 auto;
  margin-top:50px;
  box-shadow: 4px 8px 40px 8px rgba(88, 146, 255, 0.2);
}
  
}
  </style>
<body>

<div class=content>
  <div class="wrapper-1">
    <div class="wrapper-2">
      <h1>Thank you !</h1>
      <p>We have received your query.  </p>
      <p>Our team member will contact you soon  </p>
      <button class="go-home"><a href="tel:+91 9319629093" style="color:white; text-decoration:none;">
      Call Now
      </button>
    </div>
</div>
</div>



<link href="https://fonts.googleapis.com/css?family=Kaushan+Script|Source+Sans+Pro" rel="stylesheet">

</body>


<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NXG83GG3');</script>
<!-- End Google Tag Manager -->

<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NXG83GG3"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->



<script>
			window.onload = function() {       
    setTimeout(function(){
    window.location.href='https://engmates.com/';
},3000); 
}
</script>

</html>
