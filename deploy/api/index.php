<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

use Tuupola\Middleware\HttpBasicAuthentication;
use \Firebase\JWT\JWT;

require __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../bootstrap.php';
 
$app = AppFactory::create();

const JWT_SECRET = "makey1234567";



function addCorsHeaders (Response $response) : Response {

    $response =  $response
    ->withHeader("Access-Control-Allow-Origin", 'http://localhost')
    ->withHeader("Access-Control-Allow-Headers" ,'Content-Type, Authorization')
    ->withHeader("Access-Control-Allow-Methods", 'GET, POST, PUT, PATCH, DELETE,OPTIONS')
    ->withHeader ("Access-Control-Expose-Headers" , "Authorization");

    return $response;
}


// Middleware de validation du Jwt
$options = [
    "attribute" => "token",
    "header" => "Authorization",
    "regexp" => "/Bearer\s+(.*)$/i",
    "secure" => false,
    "algorithm" => ["HS256"],
    "secret" => JWT_SECRET,
    "path" => ["/api"],
    "ignore" => ["/hello","/api/hello","/api/login","/api/createUser"],
    "error" => function ($response, $arguments) {
        $data = array('ERREUR' => 'Connexion', 'ERREUR' => 'JWT Non valide');
        $response = $response->withStatus(401);
        return $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
    }
];

$app->post('/api/login', function (Request $request, Response $response, $args) {
    $issuedAt = time();
    $expirationTime = $issuedAt + 300;
    $payload = array(
        'userid' => "12345",
        'email' => "pritzya@gmail.com",
        'pseudo' => "apritzy",
        'iat' => $issuedAt,
        'exp' => $expirationTime
    );

    $token_jwt = JWT::encode($payload,JWT_SECRET, "HS256");
    $response = $response->withHeader("Authorization", "Bearer {$token_jwt}");
    return $response;
});


$app->get('/api/catalogue', function (Request $request, Response $response, $args) {
   
    $flux = '[
        {"ref":"A1","titre":"voiture","prix":10000},
        {"ref":"A2","titre":"smartphone","prix":500},
        {"ref":"A3","titre":"verre","prix":3},
        {"ref":"A4","titre":"essence","prix":100},
        {"ref":"A5","titre":"yaourt","prix":3},
        {"ref":"A6","titre":"alcool","prix":15},
        {"ref":"A7","titre":"guitare","prix":100},
        {"ref":"A8","titre":"livres","prix":20},
        {"ref":"A9","titre":"habits","prix":15},
        {"ref":"A10","titre":"bouteille de vin","prix":20}
    ]';

    $response = $response
    ->withHeader("Content-Type", "application/json;charset=utf-8");

    $response->getBody()->write($flux);
    return $response;
    
    // // global $entityManager;

    // // $catalogueRepository = $entityManager->getRepository('Catalogue');
    // // $catalogue = $catalogueRepository->findAll();

    // // $data = [];
    // // foreach ($catalogue as $e) {
    // //     $elem = [];
    // //     $elem ["ref"] = $e->getRef();
    // //     $elem ["titre"] = $e->getTitre ();
    // //     $elem ["prix"] = $e->getPrix ();
    // //     array_push ($data,$elem);
    // // }

    // $response->getBody()->write(json_encode($data));
    // return $response;
    

});


$app->get('/api/client/{id}', function (Request $request, Response $response, $args) {
    $array = [];
    $array ["nom"] = "pritzy";
    $array ["prenom"] = "antoine";
    
    $response->getBody()->write(json_encode ($array));
    return $response;
});

// $app->get('/hello/{name}', function (Request $request, Response $response, $args) {
//     $array = [];
//     $array ["nom"] = $args ['name'];
//     $response->getBody()->write(json_encode ($array));
//     return $response;
// });


$app->get('/api/hello/{name}', function (Request $request, Response $response, $args) {
    $array = [];
    $array ["nom"] = $args ['name'];
    $response->getBody()->write(json_encode ($array));
    return $response;
});


// Chargement du Middleware
$app->addErrorMiddleware(true, true, true);
$app->add(new Tuupola\Middleware\JwtAuthentication($options));
$app->run ();