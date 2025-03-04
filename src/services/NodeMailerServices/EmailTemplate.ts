export default function EmailTemplate(code: string) {
    
    return`
  <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
    <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1);">
      <h2 style="color: #333; text-align: center;">🔐 Redefinição de Senha</h2>
      <p style="font-size: 16px; color: #555; text-align: center;">
        Você solicitou a redefinição de senha. Use o código abaixo para continuar:
      </p>
      <div style="text-align: center; font-size: 24px; font-weight: bold; color: #007BFF; margin: 20px 0;">
        ${code}
      <p style="font-size: 14px; color: #999; text-align: center; margin-top: 20px;">
        Se você não solicitou essa alteração, ignore este e-mail.
      </p>
    </div>
  </div>
`};
