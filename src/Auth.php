<?php
namespace Dante;

use Dante\Database;

class Auth {
    
    // Inicia a sessão de forma segura se ainda não estiver aberta
    private static function initSession() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    }

    // Tenta logar um usuário
    public static function login($email, $senha, $tabela = 'usuarios') {
        self::initSession();
        $pdo = Database::conectar();

        $stmt = $pdo->prepare("SELECT * FROM $tabela WHERE email = ? LIMIT 1");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        // Verifica se o usuário existe e se a senha (hash) bate
        if ($user && password_verify($senha, $user['senha'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_nome'] = $user['nome'];
            return true;
        }
        return false;
    }

    // Verifica se alguém está logado (Proteção de páginas)
    public static function check() {
        self::initSession();
        if (!isset($_SESSION['user_id'])) {
            header("Location: login.php");
            exit;
        }
    }

    // Desloga o usuário
    public static function logout($urlDestino = 'login.php') {
        self::initSession();
        session_destroy();
        header("Location: $urlDestino");
        exit;
    }
}