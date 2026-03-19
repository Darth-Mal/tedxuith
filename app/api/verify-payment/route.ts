import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import QRCode from "qrcode";
import { sendTicketEmail } from "@/lib/send-ticket";

export async function POST(req: Request) {
  try {
    const { ticketReference } = await req.json();

    if (!ticketReference) {
      return NextResponse.json(
        { success: false, error: "No payment reference provided" },
        { status: 400 },
      );
    }

    // 1️⃣ Get ticket using ID (since you used it as Paystack reference)
    const { data: ticket, error: ticketError } = await supabase
      .from("tickets")
      .select("*")
      .eq("id", ticketReference)
      .single();

    if (ticketError || !ticket) {
      return NextResponse.json(
        { success: false, error: "Ticket not found" },
        { status: 404 },
      );
    }

    // 2️⃣ Verify payment with Paystack
    const res = await fetch(
      `https://api.paystack.co/transaction/verify/${ticketReference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      },
    );

    const paystackData = await res.json();

    if (!paystackData?.data || paystackData.data.status !== "success") {
      return NextResponse.json(
        { success: false, error: "Payment not successful" },
        { status: 402 },
      );
    }

    // 3️⃣ Prevent duplicate processing (VERY IMPORTANT)
    if (ticket.paid) {
      return NextResponse.json({
        success: true,
        ticketSerial: ticket.ticket_serial,
        qrCode: await QRCode.toDataURL(ticket.ticket_serial),
      });
    }

    // 4️⃣ Update ticket as paid
    await supabase
      .from("tickets")
      .update({
        paid: true,
        payment_reference: paystackData.data.reference,
      })
      .eq("id", ticket.id);

    // 5️⃣ Generate QR code
    const qr = await QRCode.toDataURL(ticket.ticket_serial);

    // 6️⃣ Send email
    await sendTicketEmail({
      email: ticket.email,
      ticketSerial: ticket.ticket_serial,
      qrCode: qr,
    });

    // 7️⃣ Return response
    return NextResponse.json({
      success: true,
      ticketSerial: ticket.ticket_serial,
      qrCode: qr,
    });
  } catch (err) {
    console.error("Verify payment error:", err);

    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 },
    );
  }
}
