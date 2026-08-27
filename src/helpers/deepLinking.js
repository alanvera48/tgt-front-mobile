/**
 * Helper functions for deep linking
 */

/**
 * Generates a verification link for email verification
 * @param {string} token - The verification token
 * @param {boolean} useHttps - Whether to use HTTPS scheme (for production) or app scheme (for testing)
 * @returns {string} - The verification URL
 */
export const generateVerificationLink = (token, useHttps = false) => {
  if (useHttps) {
    // For production use
    return `https://thegoodtrainer.com/verify/${token}`;
  } else {
    // For testing in simulator
    return `thegoodtrainer://verify/${token}`;
  }
};

/**
 * Generates a complete registration link
 * @param {string} token - The registration token
 * @param {boolean} useHttps - Whether to use HTTPS scheme (for production) or app scheme (for testing)
 * @returns {string} - The complete registration URL
 */
export const generateCompleteRegistrationLink = (token, useHttps = false) => {
  if (useHttps) {
    // For production use
    return `https://thegoodtrainer.com/complete-registration/${token}`;
  } else {
    // For testing in simulator
    return `thegoodtrainer://complete-registration/${token}`;
  }
};

/**
 * Test function to demonstrate how to use these links in emails
 * This is just an example - you would use these in your email sending service
 */
export const getEmailVerificationHTML = (token) => {
  // Use the app scheme for testing in simulator
  const verificationLink = generateVerificationLink(token, false);
  
  return `
    <html>
      <body>
        <h1>Verifica tu cuenta de The Good Trainer</h1>
        <p>Haz clic en el siguiente enlace para verificar tu cuenta:</p>
        <a href="${verificationLink}">Verificar mi cuenta</a>
      </body>
    </html>
  `;
}; 