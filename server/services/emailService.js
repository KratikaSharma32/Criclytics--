import nodemailer from "nodemailer";

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) return null;

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  return transporter;
}

export async function sendPasswordResetEmail(to, resetUrl) {
  const t = getTransporter();

  if (!t) {
    // No SMTP configured — log it so local dev still works end to end.
    console.log(`📧 [email not configured] Password reset link for ${to}: ${resetUrl}`);
    return { sent: false, reason: "smtp_not_configured" };
  }

  await t.sendMail({
    from: process.env.SMTP_FROM || `"CricLive" <no-reply@criclive.app>`,
    to,
    subject: "Reset your CricLive password",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: auto;">
        <h2 style="color:#00b8cc;">CricLive</h2>
        <p>We received a request to reset your password. This link expires in 1 hour.</p>
        <p><a href="${resetUrl}" style="background:#00e5ff;color:#081120;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">Reset password</a></p>
        <p style="color:#94a3b8;font-size:12px;">If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
  });

  return { sent: true };
}

export async function sendMatchNotificationEmail(to, subject, body) {
  const t = getTransporter();
  if (!t) {
    console.log(`📧 [email not configured] ${subject} → ${to}: ${body}`);
    return { sent: false, reason: "smtp_not_configured" };
  }
  await t.sendMail({ from: process.env.SMTP_FROM || `"CricLive" <no-reply@criclive.app>`, to, subject, text: body });
  return { sent: true };
}
