import nodemailer from 'nodemailer';
import sanitizeHtml from 'sanitize-html';
import fs from 'fs/promises';
import path from 'path';

// Helper function to sanitize HTML inputs
const sanitize = (input) => {
  return sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {},
  });
};

// Helper function to get Base64-encoded logo
async function getBase64Logo() {
  try {
    const logoPath = path.join(process.cwd(), 'public/assets/logo.png');
    const logoBuffer = await fs.readFile(logoPath);
    return `data:image/png;base64,${logoBuffer.toString('base64')}`;
  } catch (error) {
    console.error('Error reading logo file for Base64:', {
      message: error.message,
      stack: error.stack,
    });
    return null; // Fallback to URL if Base64 fails
  }
}

const sendSupportEmail = async ({ userEmail, message, ticketId, reply, status, isDemo = false, metadata = {} }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // STARTTLS
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Sanitize inputs to prevent XSS
    const sanitizedUserEmail = sanitize(userEmail || '');
    const sanitizedMessage = sanitize(message || '');
    const sanitizedReply = reply ? sanitize(reply) : '';
    const sanitizedMetadata = {
      name: sanitize(metadata.name || 'Non fourni'),
      company: sanitize(metadata.company || 'Non fournie'),
      sector: sanitize(metadata.sector || 'Non spécifié'),
      phone: sanitize(metadata.phone || 'Non fourni'),
    };

    // Determine if it's a demo request
    const isDemoRequest = isDemo || sanitizedMessage.includes('demo') || sanitizedMessage.includes('démo') || sanitizedMessage.includes('démonstration');

    // Set email subject
    const emailSubject = reply
      ? `Réponse à votre demande de démonstration #${ticketId}`
      : isDemoRequest
        ? `Confirmation de votre demande de démonstration MEMO`
        : `Confirmation de votre Mail de Contact`;

    // Format metadata for display
    const metadataDetails = isDemoRequest
      ? `
          <p style="color: #4a5568; margin: 8px 0;"><strong>Nom :</strong> ${sanitizedMetadata.name}</p>
          <p style="color: #4a5568; margin: 8px 0;"><strong>Entreprise :</strong> ${sanitizedMetadata.company}</p>
          <p style="color: #4a5568; margin: 8px 0;"><strong>Secteur :</strong> ${sanitizedMetadata.sector}</p>
          <p style="color: #4a5568; margin: 8px 0;"><strong>Téléphone :</strong> ${sanitizedMetadata.phone}</p>
        `
      : `<p style="color: #4a5568; margin: 8px 0;"><strong>Email :</strong> ${sanitizedUserEmail}</p>`;

    // Base URL for assets (use environment variable for production)
    const assetBaseUrl = process.env.ASSET_BASE_URL || 'http://localhost:8080';
    const logoUrl = `${assetBaseUrl}/assets/logo.png`;

    // Try to get Base64 logo, fall back to URL if it fails
    const base64Logo = await getBase64Logo();
    const finalLogoUrl = base64Logo || logoUrl;

    const mailOptions = {
      from: `"Équipe MEMO" <${process.env.MAIL_USER}>`,
      to: sanitizedUserEmail,
      subject: emailSubject,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f7fafc; padding: 40px 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 16px; box-shadow: 0 4px 16px rgba(0,0,0,0.1); overflow: hidden;">
            <!-- Header -->
            <div style="background: linear-gradient(90deg,  #ef7fbdff 0%, #f69c3cff 100%); padding: 20px; text-align: center;">
              <h2 style="color: white; font-size: 26px; font-weight: 700; margin: 0;">
                ${isDemoRequest ? 'Votre demande de démo MEMO' : reply ? 'Réponse à votre demande' : 'Confirmation de votre ticket'}
              </h2>
              <p style="color: rgba(255,255,255,0.9); font-size: 14px; margin: 8px 0;">
                Envoyé le • ${new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>

            <!-- Status Badge -->
            ${status ? `
            <div style="text-align: center; margin: 20px 0;">
              <span style="background-color: ${getStatusColor(status)}; color: white; padding: 8px 20px; border-radius: 20px; font-size: 14px; font-weight: 600;">
                Statut: ${formatStatus(status)}
              </span>
            </div>
            ` : ''}

            <!-- Content -->
            <div style="padding: 30px;">
              <!-- User Info -->
              <div style="margin-bottom: 30px;">
                <h3 style="color: #1a202c; font-size: 20px; font-weight: 600; margin-bottom: 12px;">${isDemoRequest ? 'Détails de votre demande' : 'Informations client'}</h3>
                ${metadataDetails}
              </div>

              <!-- Message Content -->
              <div style="margin-bottom: ${reply ? '30px' : '0'};">
                <h3 style="color: #1a202c; font-size: 20px; font-weight: 600; margin-bottom: 12px;">
                  ${reply ? 'Votre message initial' : 'Votre message'}
                </h3>
                <div style="background: linear-gradient(to bottom right, #fff1f2, #ffffff, #feefe6); padding: 20px; border-radius: 8px; border-left: 4px solid #f1647c;">
                  <p style="color: #4a5568; margin: 0; line-height: 1.7; font-size: 15px;">${sanitizedMessage}</p>
                </div>
              </div>

              <!-- Reply Section -->
              ${sanitizedReply ? `
              <div style="margin-top: 30px;">
                <h3 style="color: #1a202c; font-size: 20px; font-weight: 600; margin-bottom: 12px;">Réponse de l'équipe MEMO</h3>
                <div style="background-color: #fefcbf; padding: 20px; border-radius: 8px; border-left: 4px solid #f6e05e;">
                  <p style="color: #4a5568; margin: 0; line-height: 1.7; font-size: 15px;">${sanitizedReply}</p>
                </div>
                ${!isDemoRequest ? `
                <p style="color: #718096; font-size: 14px; margin-top: 16px; line-height: 1.6;">
                  Vous pouvez répondre directement à cet email pour ajouter des informations complémentaires ou poser d'autres questions.
                </p>
                ` : ''}
              </div>
              ` : ''}

              <!-- Next Steps -->
              ${!sanitizedReply && isDemoRequest ? `
              <div style="margin-top: 30px; background: linear-gradient(to bottom right, #fff1f2, #ffffff, #feefe6); padding: 20px; border-radius: 8px; border-left: 4px solid #f1647c;">

                <h3 style="color: #1a202c; font-size: 20px; font-weight: 600; margin-bottom: 12px;">Prochaines étapes</h3>
                <p style="color: #4a5568; margin: 0; line-height: 1.7; font-size: 15px;">
                  Merci pour votre intérêt pour MEMO ! Un de nos experts vous contactera dans les <strong>24 heures ouvrables</strong> pour organiser une démonstration personnalisée adaptée à vos besoins.
                </p>
                <p style="color: #4a5568; margin: 12px 0 0; line-height: 1.7; font-size: 15px;">
                  Pour accélérer le processus, vous pouvez <a href="https://koalendar.com/e/meet-avec-le-service-commercial-memo" style="color: #f25287; text-decoration: none; font-weight: 600;">réserver une réunion directement ici</a>.
                </p>
              </div>
              ` : !sanitizedReply ? `
             <div style="margin-top: 30px; background: linear-gradient(to bottom right, #fff1f2, #ffffff, #feefe6); padding: 20px; border-radius: 8px; border-left: 4px solid #f1647c;">
                <h3 style="color: #1a202c; font-size: 20px; font-weight: 600; margin-bottom: 12px;">Prochaines étapes</h3>
                <p style="color: #4a5568; margin: 0; line-height: 1.7; font-size: 15px;">
                  Votre demande a été reçue avec succès. Notre équipe vous répondra dans les <strong>24 heures ouvrables</strong>.
                </p>
              </div>
              ` : ''}

            <!-- Footer -->
            <div style="background-color: #f7fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #718096; font-size: 14px; margin: 0;">
                © ${new Date().getFullYear()} MEMO. Tous droits réservés.
              </p>
            </div>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Logo URL used: ${finalLogoUrl}`);
    console.log(`${reply ? 'Reply' : isDemoRequest ? 'Demo' : 'Support'} email sent successfully:`, info.response);
  } catch (error) {
    console.error(`Error sending ${reply ? 'reply' : isDemoRequest ? 'demo' : 'support'} email:`, {
      message: error.message,
      code: error.code,
      stack: error.stack,
      userEmail: userEmail,
      ticketId: ticketId,
      logoUrl: logoUrl,
      base64Attempted: !!base64Logo,
    });
    throw new Error(`Failed to send ${reply ? 'reply' : isDemoRequest ? 'demo' : 'support'} email: ${error.message}`);
  }
};

// Helper function for status colors
function getStatusColor(status) {
  const colors = {
    'demo-request': '#f25287', // Pink for demo requests
    'in-progress': '#ed8936',  // Orange for in-progress
    'scheduled': '#3182ce',    // Blue for scheduled demos
    'completed': '#38b2ac',    // Teal for completed demos
    'open': '#4299e1',        // Blue for open support tickets
    'closed': '#48bb78',       // Green for closed tickets
  };
  return colors[status] || '#4299e1'; // Default to blue
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

export default sendSupportEmail;