import nodemailer from "nodemailer";

// Create transporter using environment variables
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Subscribe to newsletter
export const subscribeToNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    const transporter = createTransporter();

    // Email content
    const mailOptions = {
      from: {
        name: 'QuickAI Team',
        address: process.env.EMAIL_USER,
      },
      to: email,
      subject: '🎉 Welcome to QuickAI - You\'re All Set!',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to QuickAI</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f8f9fa;
            }
            .container {
              background: white;
              border-radius: 12px;
              padding: 40px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 28px;
              font-weight: bold;
              color: #6366f1;
              margin-bottom: 10px;
            }
            .title {
              color: #1f2937;
              margin-bottom: 20px;
            }
            .content {
              color: #4b5563;
              margin-bottom: 30px;
            }
            .features {
              background: #f3f4f6;
              border-radius: 8px;
              padding: 20px;
              margin: 20px 0;
            }
            .feature-item {
              display: flex;
              align-items: center;
              margin-bottom: 10px;
            }
            .feature-icon {
              color: #6366f1;
              margin-right: 10px;
              font-weight: bold;
            }
            .cta-button {
              display: inline-block;
              background: #6366f1;
              color: white;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 6px;
              font-weight: 500;
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              color: #6b7280;
              font-size: 14px;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">QuickAI</div>
              <h1 class="title">Welcome to the Future of Content Creation! 🚀</h1>
            </div>
            
            <div class="content">
              <p>Hi there!</p>
              
              <p>Thank you for subscribing to QuickAI updates! You've just joined thousands of content creators who are revolutionizing their workflow with the power of AI.</p>
              
              <div class="features">
                <h3 style="margin-top: 0; color: #1f2937;">What you can expect from us:</h3>
                <div class="feature-item">
                  <span class="feature-icon">✨</span>
                  <span>Latest AI tool releases and feature updates</span>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">📝</span>
                  <span>Content creation tips and best practices</span>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">🎯</span>
                  <span>Exclusive tutorials and use cases</span>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">💡</span>
                  <span>Industry insights and AI trends</span>
                </div>
                <div class="feature-item">
                  <span class="feature-icon">🎁</span>
                  <span>Special offers and early access to new features</span>
                </div>
              </div>
              
              <p>Ready to explore what QuickAI can do for you? Our AI-powered tools are designed to streamline your content creation process and boost your productivity.</p>
              
              <center>
                <a href="${process.env.CLIENT_URL || 'https://quickai.vercel.app'}" class="cta-button" style="color: white;">
                  Start Creating with QuickAI →
                </a>
              </center>
              
              <p>If you have any questions or need assistance, feel free to reach out to our support team. We're here to help you make the most of your QuickAI experience!</p>
            </div>
            
            <div class="footer">
              <p><strong>QuickAI Team</strong></p>
              <p>Elevating content creation with AI technology</p>
              <p style="font-size: 12px; margin-top: 15px;">
                You're receiving this email because you subscribed to QuickAI updates.<br>
                If you no longer wish to receive these emails, you can unsubscribe at any time.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        Welcome to QuickAI!
        
        Thank you for subscribing to our updates! You've just joined thousands of content creators who are revolutionizing their workflow with AI.
        
        What you can expect from us:
        • Latest AI tool releases and feature updates
        • Content creation tips and best practices
        • Exclusive tutorials and use cases
        • Industry insights and AI trends
        • Special offers and early access to new features
        
        Ready to start creating? Visit ${process.env.CLIENT_URL || 'https://quickai.vercel.app'} to explore our AI-powered tools.
        
        Best regards,
        QuickAI Team
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Successfully subscribed! Please check your email for confirmation.",
    });

  } catch (error) {
    console.error("Email subscription error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send confirmation email. Please try again later.",
    });
  }
};
