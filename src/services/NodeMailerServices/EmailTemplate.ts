export default function EmailTemplate(code: string) {
    
    return`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Redefinição de Senha</title>
</head>
<body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
  <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1);">
    <h2 style="color: #333; text-align: center;">🔐 Redefinição de Senha</h2>
    <p style="font-size: 16px; color: #555; text-align: center;">
      Você solicitou a redefinição de senha. Clique no botão abaixo para continuar:
    </p>
    <div style="text-align: center; margin: 20px 0;">
      <a href="http://localhost:5173/newPassword/${code}" style="background-color: #007BFF; color: white; padding: 12px 20px; text-decoration: none; font-size: 16px; border-radius: 5px; display: inline-block;">
        Redefinir Senha
      </a>
    </div>
    <p style="font-size: 14px; color: #555; text-align: center;">
      Ou copie e cole este link no seu navegador:
    </p>
    <p style="font-size: 14px; color: #007BFF; text-align: center; word-break: break-word;">
      http://localhost:5173/newPassword/${code}
    </p>
    <p style="font-size: 14px; color: #999; text-align: center; margin-top: 20px;  word-break: break-word;">
      Se você não solicitou essa alteração, ignore este e-mail.
    </p>
  </div>
</body>
</html>

`};
