import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import QRCode from "qrcode";
import { sendTicketEmail } from "@/lib/send-ticket";

// Helper: safe async email sending (non-blocking)
async function safeSendEmail(ticket: any) {
  try {
    const qr = await QRCode.toDataURL(ticket.ticket_serial);
    await sendTicketEmail({
      name: ticket.name || "Guest", // ✅ FIX
      email: ticket.email,
      ticketSerial: ticket.ticket_serial,
      qrCode: qr,
      ticketType: ticket.ticket_type || "REGULAR", // always defined
    });
    console.log(`Email sent to ${ticket.email}`);
  } catch (err) {
    console.error("Failed to send ticket email:", err);
  }
}

export async function POST(req: Request) {
  try {
    const { ticketReference } = await req.json();

    if (!ticketReference) {
      return NextResponse.json(
        { success: false, error: "No payment reference provided" },
        { status: 400 },
      );
    }

    // 1️⃣ Fetch ticket from DB
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

    // 3️⃣ Prevent duplicate processing
    if (!ticket.paid) {
      // 4️⃣ Update ticket as paid
      await supabase
        .from("tickets")
        .update({
          paid: true,
          payment_reference: paystackData.data.reference,
        })
        .eq("id", ticket.id);
    }

    // 5️⃣ Prepare response (immediate)
    const qrCodeData = await QRCode.toDataURL(ticket.ticket_serial);

    // 6️⃣ Respond immediately to avoid 72s delay
    const response = NextResponse.json({
      success: true,
      ticketSerial: ticket.ticket_serial,
      qrCode: qrCodeData,
      ticketType: ticket.ticket_type || "REGULAR", // now always defined
    });

    // 7️⃣ Async: send email in background (non-blocking)
    safeSendEmail(ticket);

    return response;
  } catch (err) {
    console.error("Verify payment error:", err);

    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 },
    );
  }
}
