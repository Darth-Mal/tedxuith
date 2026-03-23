// lib/generate-ticket.ts
import { renderToBuffer } from "@react-pdf/renderer";
import { TicketPDF } from "./ticket-pdf";

export async function generateTicketPDF(data: {
  name: string;
  ticketSerial: string;
  qrCode: string;
  ticketType: "REGULAR" | "VIP";
}) {
  return await renderToBuffer(TicketPDF(data));
}
