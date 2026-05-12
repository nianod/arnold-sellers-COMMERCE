import nodemailer from "nodemailer";

const sender = process.env.EMAIL_FROM;
const createTransporter = () => {
  const host = process.env.EMAIL_HOST;
  const port = process.env.EMAIL_PORT;
  const userEmail = process.env.EMAIL_USER;
  const password = process.env.EMAIL_PASS;

  return nodemailer.createTransport({
    host,
    port: parseInt(port || "587"),
    secure: false,
    auth: { user: userEmail, pass: password },
    tls: { rejectUnauthorized: false },
  });
};

// Send OTP email
export const sendOTPEmail = async (email, otp) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Your E-Commerce App" <${sender}>`,
      to: email,
      subject: "Your OTP Verification Code",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: white;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 40px 20px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              font-weight: 600;
            }
            .content {
              padding: 40px 30px;
              background: #ffffff;
            }
            .otp-box {
              background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
              border: 2px dashed #667eea;
              border-radius: 12px;
              padding: 30px;
              text-align: center;
              margin: 30px 0;
            }
            .otp-label {
              font-size: 14px;
              color: #666;
              margin-bottom: 10px;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .otp-code {
              font-size: 36px;
              font-weight: bold;
              letter-spacing: 10px;
              color: #667eea;
              font-family: 'Courier New', monospace;
            }
            .info-box {
              background: #f8f9fa;
              border-left: 4px solid #667eea;
              padding: 15px;
              margin: 20px 0;
              border-radius: 4px;
            }
            .info-box p {
              margin: 5px 0;
              font-size: 14px;
            }
            .warning {
              color: #dc3545;
              font-weight: 600;
            }
            .footer {
              background: #f8f9fa;
              padding: 20px 30px;
              text-align: center;
              color: #666;
              font-size: 12px;
              border-top: 1px solid #e9ecef;
            }
            .footer p {
              margin: 5px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Verification Code</h1>
            </div>
            
            <div class="content">
              <p style="font-size: 16px; margin-bottom: 20px;">Hello,</p>
              
              <p style="font-size: 16px;">
                Thank you for signing up! To complete your verification, please use the following One-Time Password (OTP):
              </p>
              
              <div class="otp-box">
                <div class="otp-label">Your OTP Code</div>
                <div class="otp-code">${otp}</div>
              </div>
              
              <div class="info-box">
                <p> <strong>This code will expire in 5 minutes</strong></p>
                <p>For security reasons, do not share this code with anyone</p>
                <p>If you didn't request this code, please ignore this email</p>
              </div>
              
              <p style="margin-top: 30px; font-size: 14px; color: #666;">
                Having trouble? Contact our support team for assistance.
              </p>
            </div>
            
            <div class="footer">
              <p><strong>Your E-Commerce App</strong></p>
              <p>This is an automated email. Please do not reply to this message.</p>
              <p style="margin-top: 10px; color: #999;">
                © ${new Date().getFullYear()} Your E-Commerce App. All rights reserved.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `Your OTP verification code is: ${otp}
      
This code will expire in 5 minutes.

If you didn't request this code, please ignore this email.

- Your E-Commerce App Team`,
    };

    const info = await transporter.sendMail(mailOptions);

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(" Error sending email:", error);

    if (error.code === "EAUTH") {
      console.error("Authentication failed.");
    } else if (error.code === "ESOCKET") {
      console.error("Network error. Check your internet connection");
    }

    throw new Error("Try again later");
  }
};

//testin
export const testEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log(" Email configuration is valid");
    return true;
  } catch (error) {
    console.error(" Email configuration error:", error);
    return false;
  }
};
