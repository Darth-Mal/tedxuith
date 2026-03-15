// lib/send-ticket.ts
export async function sendTicketEmail(
  email: string,
  name: string,
  ticketSerial: string,
  qrCode: string,
) {
  // TODO: Integrate your email service here (Resend, SendGrid, etc.)
  console.log(`Sending ticket to ${email}: ${ticketSerial}`);
  // Example placeholder: you can later replace this with actual email logic
}
