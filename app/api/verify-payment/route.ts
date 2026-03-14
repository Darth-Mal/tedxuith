import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase-admin";
import QRCode from "qrcode";
import { sendTicketEmail } from "@/lib/send-ticket";

export async function POST(req: Request) {
  const { reference } = await req.json();

  const response = await fetch(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    },
  );

  const data = await response.json();

  if (data.data.status !== "success") {
    return NextResponse.json({ error: "Payment failed" });
  }

  const name = data.data.metadata.name;
  const email = data.data.customer.email;

  const ticketSerial = `TEDXUITH-${Math.floor(Math.random() * 100000)}`;

  const qrCode = await QRCode.toDataURL(ticketSerial);

  await sendTicketEmail(email, name, ticketSerial, qrCode);

  const { data: insertData, error } = await supabaseAdmin
    .from("tickets")
    .insert({
      name,
      email,
      ticket_serial: ticketSerial,
      payment_reference: reference,
      amount: data.data.amount,
    });

  console.log("Insert result:", insertData);
  console.log("Insert error:", error);

  if (error) {
    return NextResponse.json({ error: "Ticket creation failed" });
  }

  return NextResponse.json({
    success: true,
    ticketSerial,
    qrCode,
  });
}
