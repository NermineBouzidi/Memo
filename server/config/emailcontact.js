import nodemailer from 'nodemailer';
import sanitizeHtml from 'sanitize-html';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper function to sanitize HTML inputs
const sanitize = (input) => {
  return sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {},
  });
};

// Helper function to get Base64-encoded logo


// Helper function for status colors
function getStatusColor(status) {
  const colors = {
    'demo-request': '#f25287',
    'in-progress': '#ed8936',
    'scheduled': '#3182ce',
    'completed': '#38b2ac',
    'open': '#4299e1',
    'closed': '#48bb78',
  };
  return colors[status] || '#4299e1';
}

// Helper function to format status for display
function formatStatus(status) {
  const statusMap = {
    'demo-request': 'Demande reçue',
    'in-progress': 'En cours',
    'scheduled': 'Planifiée',
    'completed': 'Terminée',
    'open': 'Ouvert',
    'closed': 'Résolu',
  };
  return statusMap[status] || status;
}

// Function to send contact confirmation email
async function sendContactConfirmationEmail({ userEmail, message, ticketId, reply, status, metadata = {}, fileUrl }) {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Get logo as base64
   

    // Sanitize inputs
    const sanitizedUserEmail = sanitize(userEmail || '');
    const sanitizedMessage = sanitize(message || '');
    const sanitizedReply = reply ? sanitize(reply) : '';
    const sanitizedMetadata = {
      name: sanitize(metadata.name || 'Non fourni'),
      company: sanitize(metadata.company || 'Non fournie'),
      sector: sanitize(metadata.sector || 'Non spécifié'),
      phone: sanitize(metadata.phone || 'Non fourni'),
    };

    const emailSubject = reply
      ? `Réponse à votre ticket de support #${ticketId}`
      : `Confirmation de votre demande de contact`;

    // Email template sections
    const headerSection = `
      <div style="background: linear-gradient(90deg, #ef7fbdff 0%, #f69c3cff 100%); padding: 20px; text-align: center;">
        <h2 style="color: white; font-size: 26px; font-weight: 700; margin: 0;">
          ${reply ? 'Réponse à votre demande' : 'Votre Demande de Contact a été Reçue'}
        </h2>
        <p style="color: rgba(255,255,255,0.9); font-size: 14px; margin: 8px 0;">
          Envoyé • ${new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>
    `;
    const userInfoSection = `
      <div style="margin-bottom: 30px;">
        <h3 style="color: #1a202c; font-size: 20px; font-weight: 600; margin-bottom: 12px;">Informations client</h3>
        <p style="color: #4a5568; margin: 8px 0;"><strong>Email :</strong> ${sanitizedUserEmail}</p>
        <p style="color: #4a5568; margin: 8px 0;"><strong>Nom :</strong> ${sanitizedMetadata.name}</p>
        <p style="color: #4a5568; margin: 8px 0;"><strong>Entreprise :</strong> ${sanitizedMetadata.company}</p>
        ${fileUrl ? `
        <p style="color: #4a5568; margin: 8px 0;"><strong>Fichier joint :</strong> <a href="${fileUrl}" style="color: #f25287; text-decoration: none;">Télécharger</a></p>
        ` : ''}
      </div>
    `;

    const messageSection = `
      <div style="margin-bottom: ${reply ? '30px' : '0'};">
        <h3 style="color: #1a202c; font-size: 20px; font-weight: 600; margin-bottom: 12px;">
          ${reply ? 'Votre message initial' : 'Votre message'}
        </h3>
        <div style="background: linear-gradient(to bottom right, #fff1f2, #ffffff, #feefe6); padding: 20px; border-radius: 8px; border-left: 4px solid #f1647c;">
          <p style="color: #4a5568; margin: 0; line-height: 1.7; font-size: 15px;">${sanitizedMessage}</p>
        </div>
      </div>
    `;

    const replySection = sanitizedReply ? `
      <div style="margin-top: 30px;">
        <h3 style="color: #1a202c; font-size: 20px; font-weight: 600; margin-bottom: 12px;">Réponse de l'équipe MEMO</h3>
        <div style="background-color: #fefcbf; padding: 20px; border-radius: 8px; border-left: 4px solid #f6e05e;">
          <p style="color: #4a5568; margin: 0; line-height: 1.7; font-size: 15px;">${sanitizedReply}</p>
        </div>
        <p style="color: #718096; font-size: 14px; margin-top: 16px; line-height: 1.6;">
          Vous pouvez répondre directement à cet email pour ajouter des informations complémentaires ou poser d'autres questions.
        </p>
      </div>
    ` : '';

    const nextStepsSection = !sanitizedReply ? `
      <div style="margin-top: 30px; background: linear-gradient(to bottom right, #fff1f2, #ffffff, #feefe6); padding: 20px; border-radius: 8px; border-left: 4px solid #f1647c;">
        <h3 style="color: #1a202c; font-size: 20px; font-weight: 600; margin-bottom: 12px;">Prochaines étapes</h3>
        <p style="color: #4a5568; margin: 0; line-height: 1.7; font-size: 15px;">
          Votre demande a été reçue avec succès. Notre équipe vous répondra dans les <strong>24 heures ouvrables</strong>.
        </p>
      </div>
    ` : '';

    const footerSection = `
      <div style="background-color: #f7fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="color: #718096; font-size: 14px; margin: 0;">
          © ${new Date().getFullYear()} MEMO. Tous droits réservés.
        </p>
      </div>
    `;

    const mailOptions = {
      from: `"Équipe MEMO" <${process.env.MAIL_USER}>`,
      to: sanitizedUserEmail,
      subject: emailSubject,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f7fafc; padding: 40px 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 16px; box-shadow: 0 4px 16px rgba(0,0,0,0.1); overflow: hidden;">
            ${headerSection}
            
            <div style="padding: 30px;">
              ${userInfoSection}
              ${messageSection}
              ${replySection}
              ${nextStepsSection}
            </div>
            ${footerSection}
          </div>
        </div>
      `,
      attachments: fileUrl ? [
        {
          filename: path.basename(fileUrl),
          path: path.join(process.cwd(), 'public/uploads/', path.basename(fileUrl)),
        },
      ] : [],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Contact email sent successfully:`, info.response);
  } catch (error) {
    console.error('Error sending contact email:', {
      message: error.message,
      code: error.code,
      stack: error.stack,
      userEmail,
      ticketId,
    });
    throw new Error(`Failed to send contact email: ${error.message}`);
  }
}

export default sendContactConfirmationEmail;