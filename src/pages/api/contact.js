import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Honeypot validation
  if (req.body[process.env.HONEYPOT_FIELD_NAME] && req.body[process.env.HONEYPOT_FIELD_NAME].length > 0) {
    // Treat as bot - fake success response
    return res.status(200).json({ success: true });
  }

  const { name, email, phone, projectType, message } = req.body;

  // Validation
  if (!name || !email || !projectType || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Configure SMTP2GO transporter
  const transporter = nodemailer.createTransport({
    host: 'mail.smtp2go.com',
    port: 2525,  // Alternative ports: 8025, 587, 25
    secure: false,  // true for 465, false for other ports
    auth: {
      user: process.env.SMTP2GO_USER,
      pass: process.env.SMTP2GO_PASSWORD,
    },
  });

  try {
    // Send email
    await transporter.sendMail({
      from: `"CBF Contact" <${process.env.CONTACT_FORM_SENDER}>`,
      to: process.env.CONTACT_FORM_RECIPIENT,
      replyTo: `${name} <${email}>`,  // Critical for replies
      subject: `Cyan Blue Films Inquiry: ${projectType}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Project Type: ${projectType}
        
        Message:
        ${message}
      `,
      html: `
        <h3>New CBF Inquiry</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Project Type:</strong> ${projectType}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
      `
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('SMTP2GO Error:', error);
    return res.status(500).json({ 
      error: 'Error sending message', 
      details: error.response ? error.response : error.message 
    });
  }
}