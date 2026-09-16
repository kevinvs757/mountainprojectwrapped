<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !preg_match('#^https?://(www\.)?mountainprojectwrapped\.com$#i', $origin)) {
    http_response_code(403);
    echo json_encode(['error' => 'Forbidden']);
    exit;
}

$payload = json_decode(file_get_contents('php://input'), true);
$profileUrl = is_array($payload) ? trim((string) ($payload['profile_url'] ?? '')) : '';
$feature = is_array($payload) ? (string) ($payload['feature'] ?? '') : '';
$accessMethod = is_array($payload) ? (string) ($payload['access_method'] ?? '') : '';

$isValidProfileUrl = preg_match(
    '#^https://www\.mountainproject\.com/user/\d{1,12}/[a-z0-9-]+$#i',
    $profileUrl
);

if (!$isValidProfileUrl || !in_array($feature, ['wrapped', 'heatmap'], true)
    || !in_array($accessMethod, ['landing', 'wrapped-link'], true)) {
    http_response_code(422);
    echo json_encode(['error' => 'Invalid tracking event']);
    exit;
}

try {
    $config = require '/home/mountain/private/mpwrapped-db.php';
    $pdo = new PDO(
        sprintf('mysql:host=%s;dbname=%s;charset=utf8mb4', $config['host'], $config['database']),
        $config['username'],
        $config['password'],
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
    $statement = $pdo->prepare(
        'INSERT INTO access_events (profile_url, feature, access_method) VALUES (?, ?, ?)'
    );
    $statement->execute([$profileUrl, $feature, $accessMethod]);
    http_response_code(201);
    echo json_encode(['status' => 'recorded']);
} catch (Throwable $error) {
    error_log('Mountain Project Wrapped tracking error: ' . $error->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Tracking unavailable']);
}