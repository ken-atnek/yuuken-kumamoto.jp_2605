<?php
/*=======================================
* お問い合せフォーム
* URL: /backend/contact.php
* Last updated: 2026-01-14
* ======================================= */

declare(strict_types=1);

// ------------------------------
// CORS（開発/LAN も許可しつつ、本番は固定）
// ※ Origin は「スキーム + ドメイン + ポート」まで（パスは含まれない）
// ------------------------------
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allow_origin = false;

// 本番/デモ（完全一致）
$fixed_origins = [
  'https://yuuken-kumamoto.jp',
  'https://demo-yuuken-kumamoto.tuna-pic.co.jp',
];

// 完全一致
if ($origin !== '' && in_array($origin, $fixed_origins, true)) {
  $allow_origin = true;
}

// 開発（localhost / LAN）をゆるく許可
if (
  $origin !== '' &&
  (
    preg_match('#^http://localhost:\d+$#', $origin) === 1 ||
    preg_match('#^http://127\.0\.0\.1:\d+$#', $origin) === 1 ||
    preg_match('#^http://192\.168\.\d+\.\d+:\d+$#', $origin) === 1
  )
) {
  $allow_origin = true;
}

if ($allow_origin) {
  header('Access-Control-Allow-Origin: ' . $origin);
  header('Vary: Origin');
  header('Access-Control-Allow-Methods: POST, OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type');
}

header('Content-Type: application/json; charset=UTF-8');

// JSONレスポンス統一
function json_exit(int $code, array $payload): void {
  http_response_code($code);
  echo json_encode($payload, JSON_UNESCAPED_UNICODE);
  exit;
}

// preflight
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
  http_response_code(204);
  exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  json_exit(405, ['success' => false, 'error' => '無効なリクエストです。']);
}

// フォームデータ
$company     = trim($_POST['company'] ?? '');
$referral    = trim($_POST['referral'] ?? '');
$name        = trim($_POST['name'] ?? '');
$furigana    = trim($_POST['furigana'] ?? '');
$address     = trim($_POST['address'] ?? '');
$email       = trim($_POST['email'] ?? '');
$phone       = trim($_POST['phone'] ?? '');
$message     = trim($_POST['message'] ?? '');

// 必須チェック
if ($name === '' || $furigana === '' || $address === '' || $email === '' || $phone === '' || $message === '') {
  json_exit(400, ['success' => false, 'error' => '必須項目を入力してください']);
}

// メール形式チェック
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  json_exit(400, ['success' => false, 'error' => 'メールアドレスの形式が正しくありません']);
}

// ヘッダインジェクション対策（最低限）
foreach ([$name, $furigana, $email] as $v) {
  if (preg_match("/[\r\n]/", $v)) {
    json_exit(400, ['success' => false, 'error' => '入力値が不正です']);
  }
}

// ------------------------------
// メール設定
// ------------------------------
$to = 'info@yuuken-kumamoto.jp';      // 本番
$to_name = '株式会社 雄建';

$from_name  = '株式会社雄建 お問い合わせ';
$from_email = 'info@yuuken-kumamoto.jp'; // 送信元（この環境に合わせる）

$send_date = date('Y/n/j H:i');

// mbstring
$orgEncoding = mb_internal_encoding();
mb_language('uni');
mb_internal_encoding('UTF-8');

// 件名（システムメール感を出すと迷惑判定が下がりやすい）
$subject = '【雄建】お問い合わせを受け付けました';

// ヘッダー
$headers  = 'From: "' . mb_encode_mimeheader($from_name, 'ISO-2022-JP') . '" <' . $from_email . ">\r\n";
$headers .= 'Reply-To: ' . $email . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=ISO-2022-JP\r\n";
$headers .= "Content-Transfer-Encoding: 7bit\r\n";

// 本文
$mail_body  = "お問い合わせフォームより\n";
$mail_body .= "--------------------\n";
if ($company !== '') {
  $mail_body .= "■会社名\n{$company} 様\n\n";
}
if ($referral !== '') {
  $mail_body .= "■ご紹介\n{$referral}\n\n";
}
$mail_body .= "■お名前\n{$name} 様\n\n";
$mail_body .= "■ふりがな\n{$furigana}\n\n";
$mail_body .= "■ご住所\n{$address}\n\n";
$mail_body .= "◎メールアドレス\n{$email}\n";
$mail_body .= "--------------------\n";
$mail_body .= "◎お電話番号\n{$phone}\n";
$mail_body .= "--------------------\n";
$mail_body .= "【お問い合わせ内容】\n{$message}\n\n";
$mail_body .= "--------------------\n";
$mail_body .= $send_date . "\n";

// 改行統一
$mail_body = str_replace(["\r\n", "\r"], "\n", $mail_body);

// 宛先表示名をエンコード
$to_name_enc  = mb_encode_mimeheader($to_name, 'ISO-2022-JP');
$send_target  = $to_name_enc . ' <' . $to . '>';

// 送信（-f は環境によって迷惑判定が強まることもあるので、問題が続くなら外して試してOK）
$rslt = mb_send_mail($send_target, $subject, $mail_body, $headers, '-f' . $from_email);

// 戻す
mb_internal_encoding($orgEncoding);

if ($rslt) {
  json_exit(200, ['success' => true, 'message' => 'お問い合わせを送信しました。']);
}

json_exit(500, ['success' => false, 'error' => 'メール送信に失敗しました']);
