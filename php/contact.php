<?php

session_start();

header('Content-Type: application/json; charset=utf-8');

// Не показываем ошибки пользователю
ini_set('display_errors', 0);
error_reporting(E_ALL);

// Подключаем PHPMailer
require __DIR__ . '/PHPMailer/src/Exception.php';
require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Загружаем конфиг
$config = require __DIR__ . '/config.php';

// Только POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed'
    ]);
    exit;
}

// Honeypot (защита от ботов)
if (!empty($_POST['website'])) {
    echo json_encode(['success' => true]);
    exit;
}

// Ограничение: 1 заявка в 30 секунд
if (!empty($_SESSION['last_submit']) && time() - $_SESSION['last_submit'] < 30) {
    echo json_encode([
        'success' => false,
        'message' => 'Слишком частые отправки'
    ]);
    exit;
}

// Получаем данные
$name = trim(strip_tags($_POST['name'] ?? ''));
$phone = trim(strip_tags($_POST['phone'] ?? ''));
$email = trim(filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL));
$message = trim(strip_tags($_POST['message'] ?? ''));

// Валидация
if (mb_strlen($name) < 2) {
    echo json_encode([
        'success' => false,
        'message' => 'Введите имя'
    ]);
    exit;
}

if (strlen(preg_replace('/\\D/', '', $phone)) < 11) {
    echo json_encode([
        'success' => false,
        'message' => 'Введите корректный телефон'
    ]);
    exit;
}

if ($email && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        'success' => false,
        'message' => 'Некорректный email'
    ]);
    exit;
}

// Отправка письма
$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = $config['mail_host'];
    $mail->SMTPAuth = true;
    $mail->Username = $config['mail_username'];
    $mail->Password = $config['mail_password'];

    // Для Яндекса
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = $config['mail_port'];

    $mail->CharSet = 'UTF-8';

    // От кого
    $mail->setFrom($config['mail_from'], 'Автошкола Авторитет');

    // Кому
    $mail->addAddress($config['mail_to']);

    // Тема
    $mail->Subject = 'Новая заявка с сайта Автошколы Авторитет';

    // HTML письмо
    $mail->isHTML(true);

    $mail->Body = "
        <h2>Новая заявка с сайта</h2>

        <p><b>Имя:</b> " . htmlspecialchars($name) . "</p>

        <p><b>Телефон:</b> " . htmlspecialchars($phone) . "</p>

        <p><b>Email:</b> " .
        htmlspecialchars($email ?: 'Не указан') .
        "</p>

        <p><b>Комментарий:</b><br>" .
        nl2br(htmlspecialchars($message ?: 'Нет комментария')) .
        "</p>
    ";

    // Текстовая версия
    $mail->AltBody =
        "Новая заявка с сайта\n\n" .
        "Имя: {$name}\n" .
        "Телефон: {$phone}\n" .
        "Email: " . ($email ?: 'Не указан') . "\n\n" .
        "Комментарий:\n" . ($message ?: 'Нет комментария');

    $mail->send();

    $_SESSION['last_submit'] = time();

    echo json_encode([
        'success' => true
    ]);

} catch (Exception $e) {
    // Пишем ошибку в лог сервера
    error_log('Mail error: ' . $mail->ErrorInfo);

    echo json_encode([
        'success' => false,
        'message' => 'Не удалось отправить заявку'
    ]);
}