<?php
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;
date_default_timezone_set('America/Lima');
require_once "vendor/autoload.php";
$isDevMode = true;
$config = Setup::createYAMLMetadataConfiguration(array(__DIR__ . "/api/config/yaml"), $isDevMode);
$conn = array(
'host' => 'ec2-52-50-171-4.eu-west-1.compute.amazonaws.com',
'driver' => 'pdo_pgsql',
'user' => 'anmrerowgtvlnr',
'password' => '15e0ffc4b52ed5398301c4f7a0247093a2f534b73467836558fea2b2ddbc718e',
'dbname' => 'dm66esn8jbbdu',
'port' => '5432'
);
$entityManager = EntityManager::create($conn, $config);