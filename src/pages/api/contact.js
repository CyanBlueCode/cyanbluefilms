import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  //   only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Honeypot check
  if (
    req.body[process.env.HONEYPOT_FIELD_NAME] &&
    req.body[process.env.HONEYPOT_FIELD_NAME].length > 0
  ) {
    // Treat as bot - fake success response
    return res.status(200).json({ success: true });
  }

  const { name, email, phone, projectType, message } = req.body;

  // Required fields check
  if (!name || !email || !projectType || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Email validation (RFC 5322 compliant-ish)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // Phone validation (only digits, spaces, hyphens, parentheses, and optional +)
  const phoneRegex = /^[+]?[\d\s\-()]*$/;
  if (phone && !phoneRegex.test(phone)) {
    return res.status(400).json({ error: 'Invalid phone number format' });
  }

  const transporter = nodemailer.createTransport({
    host: 'mail.smtp2go.com',
    port: 2525, // Alternative ports: 8025, 587, 25
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP2GO_USER,
      pass: process.env.SMTP2GO_PASSWORD,
    },
  });

  try {
    // Send email
    await transporter.sendMail({
      from: `"CBF Inquiry" <${process.env.CONTACT_FORM_SENDER}>`,
      to: process.env.CONTACT_FORM_RECIPIENT,
      replyTo: `${name} <${email}>`, // Critical for replies
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
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Project Type:</strong> ${projectType}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('SMTP2GO Error:', error);
    return res.status(500).json({
      error: 'Error sending message',
      details: error.response ? error.response : error.message,
    });
  }
}
