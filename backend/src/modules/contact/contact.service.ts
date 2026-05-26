import nodemailer from "nodemailer";
import { env } from "../../config/env";

const GOLD = "#D4A017";

function transporter() {
  if (!env.SMTP_USER || !env.SMTP_PASS) {
    return null;
  }
  return nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: false,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
  });
}

type ContactEmailData = {
  name: string;
  email: string;
  phone?: string | null;
  serviceInterest?: string | null;
  budgetRange?: string | null;
  description: string;
  hearAboutUs?: string | null;
  createdAt: Date;
};

function adminNotificationHtml(data: ContactEmailData) {
  const submitted = data.createdAt.toLocaleString("en-ET", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,sans-serif;color:#e5e5e5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#111;border:1px solid #222;">
    <tr>
      <td style="padding:24px;background:#0a0a0a;border-bottom:3px solid ${GOLD};">
        <h1 style="margin:0;color:${GOLD};font-size:22px;letter-spacing:2px;">RAAFAT-DIGITAL</h1>
        <p style="margin:8px 0 0;color:#888;font-size:13px;">New project enquiry</p>
      </td>
    </tr>
    <tr>
      <td style="padding:24px;">
        <table width="100%" cellpadding="8" cellspacing="0" style="font-size:14px;">
          <tr><td style="color:#888;width:140px;">Name</td><td>${data.name}</td></tr>
          <tr><td style="color:#888;">Email</td><td><a href="mailto:${data.email}" style="color:${GOLD};">${data.email}</a></td></tr>
          <tr><td style="color:#888;">Phone</td><td>${data.phone || "—"}</td></tr>
          <tr><td style="color:#888;">Service</td><td>${data.serviceInterest || "—"}</td></tr>
          <tr><td style="color:#888;">Budget</td><td>${data.budgetRange || "—"}</td></tr>
          <tr><td style="color:#888;">Source</td><td>${data.hearAboutUs || "—"}</td></tr>
          <tr><td style="color:#888;vertical-align:top;">Message</td><td style="white-space:pre-wrap;">${data.description}</td></tr>
          <tr><td style="color:#888;">Submitted</td><td>${submitted}</td></tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 24px;background:#0a0a0a;color:#666;font-size:12px;border-top:1px solid #222;">
        Reply directly to <a href="mailto:${data.email}" style="color:${GOLD};">${data.email}</a>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function clientConfirmationHtml(data: ContactEmailData) {
  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,sans-serif;color:#e5e5e5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#111;border:1px solid #222;">
    <tr>
      <td style="padding:24px;background:#0a0a0a;border-bottom:3px solid ${GOLD};">
        <h1 style="margin:0;color:${GOLD};font-size:22px;letter-spacing:2px;">RAAFAT-DIGITAL</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:24px;">
        <p style="font-size:16px;margin:0 0 16px;">Hi ${data.name}, thank you for reaching out!</p>
        <p style="font-size:14px;line-height:1.6;color:#ccc;">
          We've received your message and will get back to you within 24 hours on business days.
        </p>
        <p style="font-size:14px;color:${GOLD};margin:24px 0 8px;font-weight:bold;">What's next?</p>
        <ul style="font-size:14px;color:#ccc;line-height:1.8;padding-left:20px;">
          <li>We review your project details</li>
          <li>We'll reach out to schedule a free discovery call</li>
          <li>We share a clear proposal with no surprises</li>
        </ul>
        <p style="margin-top:24px;font-size:14px;color:#ccc;">
          — Raafat, Founder<br/>
          <strong style="color:${GOLD};">RAAFAT-DIGITAL</strong>
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding:16px 24px;background:#0a0a0a;color:#666;font-size:12px;border-top:1px solid #222;">
        Harar, Ethiopia · hello@raafat.digital · WhatsApp available
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function sendContactEmails(data: ContactEmailData) {
  const transport = transporter();
  if (!transport) {
    console.warn("SMTP not configured — skipping contact emails");
    return;
  }

  await Promise.all([
    transport.sendMail({
      from: env.SMTP_FROM,
      to: env.NOTIFICATION_EMAIL,
      replyTo: data.email,
      subject: `🔔 New enquiry from ${data.name} — RAAFAT-DIGITAL`,
      html: adminNotificationHtml(data),
    }),
    transport.sendMail({
      from: env.SMTP_FROM,
      to: data.email,
      subject: "We got your message — RAAFAT-DIGITAL 🙌",
      html: clientConfirmationHtml(data),
    }),
  ]);
}
