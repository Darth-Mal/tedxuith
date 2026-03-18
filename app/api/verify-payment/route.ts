import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import QRCode from "qrcode";

export async function POST(req: Request) {
  const { ticketId } = await req.json();

  // Get ticket
  const { data: ticket } = await supabase
    .from("tickets")
    .select("*")
    .eq("id", ticketId)
    .single();

  // Verify with Paystack
  const res = await fetch(
    `https://api.paystack.co/transaction/verify/${ticketId}`,
    {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
    },
  );
  const paystackData = await res.json();

  if (paystackData.data.status === "success") {
    // Update ticket
    await supabase
      .from("tickets")
      .update({ paid: true, paystack_ref: paystackData.data.reference })
      .eq("id", ticketId);

    // Generate QR code
    const qr = await QRCode.toDataURL(ticketId);

    // Send email (via Supabase or nodemailer)
    await fetch("/api/send-ticket", {
      method: "POST",
      body: JSON.stringify({ email: ticket.email, qr, name: ticket.name }),
    });

    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false });
}
