import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3000",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, firstName, lastName, email, phone, service, message } = body;

    // We have two different forms: one with 'name', one with 'firstName' and 'lastName'
    const finalName = name || `${firstName || ""} ${lastName || ""}`.trim();

    // Verify required fields
    if (!finalName || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
      console.log("Email variables not set. Simulating email sending:");
      console.log(`From: ${finalName} <${email}>`);
      console.log(`Subject: New Portfolio Contact from ${finalName}${service ? ` - ${service}` : ''}`);
      console.log(`Message: \n${message}`);
      return NextResponse.json({ success: true, simulated: true }, { status: 200, headers: corsHeaders });
    }

    // Configure Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD, 
      },
    });

    // Build the email content
    const mailOptions = {
      from: `"${finalName}" <${process.env.EMAIL_USER}>`, // Send *from* our authenticated email to avoid spam blocks, but use sender's name
      replyTo: email, // If we simply hit "Reply", it goes to their email
      to: "phouphetchanthalungsy40@gmail.com", // Destination email
      subject: `New Portfolio Contact from ${finalName}${service ? ` - ${service}` : ''}`,
      html: `
        <h2>New Message from your Portfolio</h2>
        <p><strong>Name:</strong> ${finalName}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${service ? `<p><strong>Service Requested:</strong> ${service}</p>` : ''}
        <br />
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      `,
    };

    // Send Email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200, headers: corsHeaders });
  } catch (error: any) {
    console.error("Failed to send email:", error);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500, headers: corsHeaders }
    );
  }
}
