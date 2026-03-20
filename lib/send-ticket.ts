// lib/send-ticket.ts
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
      from: "TEDxUITH <onboarding@tedxuithilorin.com>", // ✅ use your verified domain
      to: email,
      subject: "🎟️ Your TEDxUITH Ticket",
      html: `
        <div style="font-family: sans-serif; text-align: center; padding: 20px;">
          <h2>🎉 Payment Successful!</h2>
          <p>Your ticket ID:</p>
          <h3 style="color: #ff6600;">${ticketSerial}</h3>
          <p>Show this QR code at the venue:</p>
          <img src="${qrCode}" alt="QR Code" style="width: 200px; height: 200px; margin-top: 10px;" />
          <p style="margin-top: 20px; font-size: 14px; color: #555;">
            Thank you for registering for TEDxUITH! See you at the event.
          </p>
        </div>
      `,
    });

    console.log("📧 Email sent successfully:", response);
  } catch (err) {
    console.error("❌ Failed to send ticket email:", err);
  }
}
