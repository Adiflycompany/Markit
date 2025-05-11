// emailService.ts
import nodemailer from 'nodemailer';

// Créer un transporteur pour l'envoi d'email avec Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Utilise le service d'email (ici, Gmail)
  auth: {
    user: process.env.EMAIL_USER, // Ton adresse email (met dans .env)
    pass: process.env.EMAIL_PASS, // Ton mot de passe (met dans .env)
  },
});

// Fonction pour envoyer un email de réinitialisation de mot de passe
export function sendResetEmail(email: string, resetToken: string): Promise<void> {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Adresse de l'expéditeur
    to: email, // L'adresse du destinataire
    subject: 'Réinitialisation de votre mot de passe', // Objet du message
    text: `Bonjour, \n\nPour réinitialiser votre mot de passe, cliquez sur ce lien: \n\nhttp://example.com/reset-password?token=${resetToken}\n\nSi vous n'avez pas demandé cette réinitialisation, ignorez ce message.`, // Corps de l'email
  };

  // Envoie l'email via Nodemailer
  return transporter.sendMail(mailOptions)
    .then(() => {
      console.log('Email de réinitialisation envoyé avec succès!');
    })
    .catch((error: any) => {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
    });   
}
