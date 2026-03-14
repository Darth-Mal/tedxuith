import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendTicketEmail(
  email: string,
  name: string,
  ticketSerial: string,
  qrCode: string,
) {
  await resend.emails.send({
    from: "TEDxUITH <tickets@tedxuith.com>",
    to: email,
    subject: "Your TEDxUITH Ticket 🎟️",
    html: `
      <h1>Your TEDxUITH Ticket</h1>

      <p>Hello ${name},</p>

      <p>Your ticket has been confirmed.</p>

      <p><strong>Ticket ID:</strong> ${ticketSerial}</p>

      <p>Please present this QR code at the event entrance:</p>

      <img src="${qrCode}" width="200"/>

      <p>We look forward to seeing you at TEDxUITH.</p>
    `,
  });
}
