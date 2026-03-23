// lib/send-ticket.ts
import { Resend } from "resend";
import { generateQRCode } from "./generate-qr";
import { generateTicketPDF } from "./generate-ticket";

const resend = new Resend(process.env.RESEND_API_KEY);

export type TicketEmailProps = {
  name: string; // optional, in case name is not provided
  email: string;
  ticketSerial: string;
  ticketType: "REGULAR" | "VIP";
  qrCode?: string; // optional; will generate if not provided
};

export async function sendTicketEmail({
  name,
  email,
  ticketSerial,
  ticketType,
  qrCode,
}: TicketEmailProps) {
  try {
    // 1️⃣ Ensure we have a QR code
    const finalQRCode = qrCode || (await generateQRCode(ticketSerial));

    // 2️⃣ Generate PDF
    const pdfBuffer = await generateTicketPDF({
      name,
      ticketSerial,
      qrCode: finalQRCode,
      ticketType,
    });

    console.log("PDF size (bytes):", pdfBuffer.length);

    // 3️⃣ Customize email based on ticket type
    const isVIP = ticketType === "VIP";

    // 4️⃣ Send email using Resend
    const displayName = name ?? "Guest";

    const response = await resend.emails.send({
      from: "TEDxUITH <onboarding@tedxuithilorin.com>",
      to: email,
      subject: isVIP
        ? `👑 ${displayName}, your VIP TEDxUITH ticket is ready`
        : `🎟️ ${displayName}, your TEDxUITH ticket is ready`,
      html: `
  <div style="background:#0a0a0a;padding:20px;font-family:sans-serif;">
    <div style="max-width:600px;margin:auto;background:#111;padding:30px;border-radius:12px;text-align:center;">
      
      <h1 style="color:${isVIP ? "#FFD700" : "#e62b1e"}; margin-bottom:10px;">
        TEDxUITH
      </h1>

      <p style="color:#888; font-size:14px; margin-bottom:20px;">
        Discover your true north.
      </p>

      <h2 style="margin-bottom:10px;">
        Hi ${displayName},
      </h2>

      <h3 style="margin-bottom:15px;">
        ${isVIP ? "👑 VIP Access Confirmed" : "🎉 You're officially in!"}
      </h3>

      <p style="color:#bbb; line-height:1.6;">
        ${
          isVIP
            ? "You now have exclusive VIP access to TEDxUITH. Get ready for a premium experience filled with powerful ideas, inspiring speakers, and meaningful connections."
            : "Your seat at TEDxUITH has been successfully reserved. Get ready for an experience filled with powerful ideas, inspiring speakers, and meaningful connections."
        }
      </p>

      <div style="margin:25px 0;">
        <p style="color:#777; font-size:12px; margin-bottom:5px;">
          Your Ticket ID
        </p>
        <h3 style="color:${isVIP ? "#FFD700" : "#e62b1e"}; letter-spacing:1px;">
          ${ticketSerial}
        </h3>
      </div>

      <img src="${finalQRCode}" style="width:150px;margin-top:10px;" />

      <p style="margin-top:20px;color:#aaa; font-size:14px;">
        Please present this QR code at the venue for check-in.
      </p>

      <p style="margin-top:20px;color:#777; font-size:13px;">
        Your official ticket is attached to this email.
      </p>

      <hr style="border:none;border-top:1px solid #222;margin:30px 0;" />

      <p style="color:#666; font-size:12px;">
        We can’t wait to have you on our journey to the stars.<br/>
        <strong>— TEDxUITH Team</strong>
      </p>

    </div>
  </div>
  `,
      attachments: [
        {
          filename: `TEDxUITH-${ticketType}-${ticketSerial}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    console.log("✅ Email sent:", response);
  } catch (err) {
    console.error("❌ Error sending email:", err);
  }

  console.log("ticketType:", ticketType);
}
