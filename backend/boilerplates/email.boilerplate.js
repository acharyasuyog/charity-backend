function generateSignupSuccessEmail(name) {
  return `
          <html>
              <body>
                  <h1>Welcome to Our Service, ${name}!</h1>
                  <p>Dear ${name},</p>
                  <p>We are excited to inform you that your signup was successful.</p>
                    <p>You are now a member of our community.</p>
                  <p>If you have any questions or need assistance, please do not hesitate to contact our support team.</p>
                  <p>Thank you for joining us!</p>
                  <p>Best regards,</p>
                  <p>Hamro Charity</p>
              </body>
          </html>
      `;
}
export default generateSignupSuccessEmail;
