<?php
if(isset($_REQUEST['submit'])) 
{
// EDIT THE 2 LINES BELOW AS REQUIRED
$email_to = "himanshu.lifelinkr@gmail.com, engmates.tilaknagar@gmail.com, rk.abhishekbakshi@gmail.com, 4exult@gmail.com, dm.shrutisharma@gmail.com";
$email_subject = "Query from Eng Institute New LP (Top Form)";

$name =$_POST['name']; // required
$email_from = $_POST['email']; // optional
$phone=$_POST['phone']; //required
$city=$_POST['city'];//required
$course=$_POST['course'];
// $message=$_POST['message'];//required
$ipFormInput=$_POST['ipFormInput'];
function clean_string($string) 
{
$bad = array("content-type","bcc:","to:","cc:","href");
return str_replace($bad,"",$string);
}

$ip = $_SERVER['REMOTE_ADDR'];
@$email_message .= "Name: ".clean_string($name)."\n";
@$email_message .= "Email: ".clean_string($email_from)."\n";
@$email_message .= "Phone: ".clean_string($phone)."\n";
@$email_message .= "Location: ".clean_string($city)."\n";
@$email_message .= "Course: ".clean_string($course)."\n";
// @$email_message .= "Message: ".clean_string($message)."\n";
@$email_message .= "IP: ".clean_string($ip)."\n";
// create email headers
$headers = "From: leads@engmates.com \r\n";
//'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();
@mail($email_to, $email_subject, $email_message, $headers); 
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
