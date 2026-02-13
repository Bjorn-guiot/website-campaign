<?php
// Foutmeldingen uit, zodat JSON geldig blijft
error_reporting(E_ALL & ~E_NOTICE);

// Alleen verwerken bij POST
if($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['user']) && isset($_POST['answer'])) {

    $user = strip_tags($_POST['user']);
    $answer = strip_tags($_POST['answer']);

    $correctAnswer = "ENIGMA"; // juiste antwoord

    if(strtoupper($answer) === $correctAnswer){
        // Combell mail instellingen
        $to = "riddle@knightsofenigma.be"; // jouw mailadres
        $subject = "Riddle solved!";
        $message = "User $user solved the riddle correctly.";
        $headers = "From: noreply@knightsofenigma.be\r\n";
        
        // mail versturen
        $mailSuccess = mail($to, $subject, $message, $headers);

        echo json_encode(["success"=>true, "mail"=>$mailSuccess]);
    } else {
        echo json_encode(["success"=>false, "mail"=>false]);
    }

} else {
    echo json_encode(["success"=>false, "error"=>"No POST data"]);
}
?>
