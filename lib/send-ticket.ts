import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendTicketEmail({
  email,
  ticketSerial,
  qrCode,
}: {
  email: string;
  ticketSerial: string;
  qrCode: string;
}) {
  try {
    const response = await resend.emails.send({
      from: "TEDxUITH <onboarding@resend.dev>",
      to: email,
      subject: "🎟️ Your TEDxUITH Ticket",
      html: `
        <div style="font-family: sans-serif; text-align: center;">
          <h2>🎉 Payment Successful!</h2>
          <p>Your ticket ID:</p>
          <h3>${ticketSerial}</h3>
          <p>Show this QR code at the venue:</p>
          <img src="${qrCode}" alt="QR Code" />
        </div>
      `,
    });

    console.log("📧 Email response:", response); // 🔥 ADD THIS
  } catch (err) {
    console.error("❌ Email send error:", err);
  }
}
