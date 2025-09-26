<?php
// Simple test file
header('Content-Type: text/html; charset=utf-8');

echo "<h1>PHP Test</h1>";
echo "<p>PHP is working correctly!</p>";
echo "<p>Current time: " . date('Y-m-d H:i:s') . "</p>";
echo "<p>PHP Version: " . phpversion() . "</p>";
echo "<p>Server: " . $_SERVER['SERVER_SOFTWARE'] . "</p>";

// Test JSON
$data = [
    'success' => true,
    'message' => 'PHP is working correctly',
    'timestamp' => date('Y-m-d H:i:s')
];

echo "<h2>JSON Test:</h2>";
echo "<pre>" . json_encode($data, JSON_PRETTY_PRINT) . "</pre>";
?>
