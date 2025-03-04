import nodemailer from 'nodemailer';

export default async function sendEmail(to: string, subject: string, text: string){
  try {
    
    const transporter = nodemailer.createTransport({  // SMTP
      service: 'gmail', // Exemplo usando Gmail
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
      },
    });

    // Configuração do formato e-mail
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: text,
    };

    // Enviar o e-mail
    const info = await transporter.sendMail(mailOptions);
    console.log('Email enviado:', info.messageId);
  } catch (error) {
    console.error('Erro ao enviar email:', error);
  }
};
