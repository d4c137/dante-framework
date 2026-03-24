<?php
namespace Dante;

use PDO;
use PDOException;

class Database {
    private static $instancia = null;

    public static function conectar() {
        if (self::$instancia === null) {
            try {
                // Ele busca os dados direto do seu arquivo .env
                $host = $_ENV['DB_HOST'] ?? 'localhost';
                $db   = $_ENV['DB_NAME'] ?? 'dante';
                $user = $_ENV['DB_USER'] ?? 'root';
                $pass = $_ENV['DB_PASS'] ?? '';

                self::$instancia = new PDO(
                    "mysql:host=$host;dbname=$db;charset=utf8mb4",
                    $user,
                    $pass,
                    [
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                        PDO::ATTR_EMULATE_PREPARES => false,
                    ]
                );
            } catch (PDOException $e) {
                // Se der erro, ele avisa que o erro foi no Framework
                die("Erro no Framework DANTE (Banco de Dados): " . $e->getMessage());
            }
        }
        return self::$instancia;
    }
}