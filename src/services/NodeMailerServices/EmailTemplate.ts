export default function EmailTemplate(code: string) {
  return `
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Redefinição de Senha</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 0;
      margin: 0;
      background-color: #f4f4f4;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: auto;
      background: #ffffff;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    }
    h2 {
      color: #BB1626;
      text-align: center;
      font-size: 24px;
    }
    p {
      font-size: 16px;
      color: #555;
      line-height: 1.6;
      text-align: center;
    }
    .button {
      background-color: #BB1626;
      color: white !important;
      padding: 15px 25px;
      text-decoration: none;
      font-size: 18px;
      border-radius: 5px;
      display: inline-block;
      text-align: center;
      transition: background-color 0.3s ease;
    }
    .button:hover {
      background-color: #9b0f1e;
    }
    .link {
      font-size: 14px;
      text-align: center;
      word-wrap: break-word;
      text-decoration: none;
    }
    .link:hover {
      text-decoration: underline;
    }
    .footer {
      font-size: 14px;
      color: #999;
      text-align: center;
      margin-top: 20px;
      padding-top: 10px;
      border-top: 1px solid #ddd;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>🔐 Redefinição de Senha</h2>
    <p>Você solicitou a redefinição de senha. Clique no botão abaixo para continuar:</p>
    <div style="text-align: center; margin: 20px 0;">
      <a href="${process.env.APP_BASE_URL}/newPassword/${code}" class="button">Redefinir Senha</a>
    </div>
    <p>Ou copie e cole este link no seu navegador:</p>
    <p class="link">${process.env.APP_BASE_URL}/newPassword/${code}</p>
    <div class="footer">
      <p>Se você não solicitou essa alteração, ignore este e-mail.</p>
    </div>
  </div>
</body>
</html>
  `;
}
