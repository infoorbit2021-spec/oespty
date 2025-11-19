import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const formData = await req.json();

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST!,
    port: Number(process.env.SMTP_PORT!),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
  });

  const mailOptions = {
    from: `"Orbit Engineering Website" <${process.env.SMTP_USER}>`,
    to: process.env.RECIPIENTS,
    replyTo: formData.email, // allows clicking "Reply" to reply to the sender
    subject: `📩 New Contact Form: ${formData.subject}`,
    text: `
A new contact form message has been submitted:

━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.contact}
Preferred Office: ${formData.preferredOffice}
Subject: ${formData.subject}
━━━━━━━━━━━━━━━━━━━━━━━━━━

Message:
${formData.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━

Sent from Orbit Engineering Website
    `.trim(),
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email sending failed:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
