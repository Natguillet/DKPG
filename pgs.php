<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
        <p>machin</p>
        <?php
        // put your code here
        $ch = curl_init();
 
        curl_setopt($ch, CURLOPT_URL, 'http://127.0.0.1:5984/_all_dbs');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                'Content-type: application/json',
                'Accept: */*'
        ));

        $response = curl_exec($ch);

        curl_close($ch);
        printf($response);
                ?>
    </body>
</html>
