<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); 
if (isset($_GET["page"])) {
    $page = $_GET['page'];
    $data =file_get_contents("{$page}.json");
}

echo $data;
