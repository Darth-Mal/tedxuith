// app/api/verify-payment/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import QRCode from "qrcode";
import { sendTicketEmail } from "@/lib/send-ticket";

export async function POST(req: Request) {
  try {
    const { reference } = await req.json();
    if (!reference) {
      return NextResponse.json(
        { error: "Reference is required" },
        { status: 400 },
      );
    }

    // 1️⃣ Verify payment with Paystack
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      },
    );
    const data = await response.json();

    if (!data.data || data.data.status !== "success") {
      return NextResponse.json({ error: "Payment failed" }, { status: 400 });
    }

    const name = data.data.metadata?.name ?? "No Name";
    const email = data.data.customer?.email ?? "";

    // 2️⃣ Generate ticket serial and QR code
    const ticketSerial = `TEDXUITH-${Math.floor(Math.random() * 100000)}`;
    const qrCode = await QRCode.toDataURL(ticketSerial);

    // 3️⃣ Send ticket email (placeholder)
    await sendTicketEmail(email, name, ticketSerial, qrCode);

    // 4️⃣ Save ticket to Supabase
    const { data: insertData, error } = await supabaseAdmin
      .from("tickets")
      .insert({
        name,
        email,
        ticket_serial: ticketSerial,
        payment_reference: reference,
        amount: data.data.amount,
      });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Ticket creation failed" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, ticketSerial, qrCode });
  } catch (err) {
    console.error("Verify payment error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
