<?php
require_once 'vendor/autoload.php';

// Avisa que vai usar a ferramenta de banco do seu Framework
use Dante\Database;

// Conecta e busca dados com apenas uma linha
$pdo = Database::conectar();

$dados = $pdo->query("SELECT * FROM usuarios LIMIT 1")->fetch();

if ($dados) {
    echo "Conectado com sucesso pelo Framework DANTE! Usuário encontrado: " . $dados['nome'];
} else {
    echo "Conectado, mas a tabela está vazia.";
}