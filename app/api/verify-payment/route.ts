import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";
import QRCode from "qrcode";
import { Resend } from "resend";

// Initialize Resend (make sure RESEND_API_KEY is set in .env)
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { reference } = req.query;

  if (!reference || typeof reference !== "string") {
    return res
      .status(400)
      .json({ success: false, message: "No payment reference provided." });
  }

  try {
    console.log("Verifying Paystack reference:", reference);

    // Set up 10-second timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    // Verify payment with Paystack
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
        signal: controller.signal,
      },
    );

    clearTimeout(timeout);

    const data = await response.json();
    console.log("Paystack response:", data);

    if (data.status && data.data.status === "success") {
      const email = data.data.customer.email;
      const name = data.data.customer.first_name || "Attendee"; // fallback if no name

      // 1️⃣ Update transaction status in Supabase
      await supabase
        .from("transactions")
        .update({ status: "success" })
        .eq("reference", reference);

      // 2️⃣ Generate ticket ID and QR code
      const ticketId = `TICKET-${Math.floor(Math.random() * 1000000)}`;
      const qrCode = await QRCode.toDataURL(ticketId);

      // 3️⃣ Save ticket in Supabase
      await supabase.from("tickets").insert({
        email,
        ticket_id: ticketId,
        reference,
        qr_code: qrCode,
      });

      // 4️⃣ Send ticket via email
      await resend.emails.send({
        from: "tickets@yourdomain.com",
        to: email,
        subject: "Your Event Ticket 🎫",
        html: `
          <h1>Hi ${name}, your ticket is confirmed!</h1>
          <p>Ticket ID: ${ticketId}</p>
          <img src="${qrCode}" alt="Your Ticket QR Code" />
        `,
      });

      // 5️⃣ Return info to frontend
      return res.status(200).json({
        success: true,
        ticketId,
        qrCode,
      });
    } else {
      console.error("Payment verification failed:", data);
      return res.status(400).json({
        success: false,
        message:
          data.message ||
          "Payment verification failed. Please contact support.",
      });
    }
  } catch (error: any) {
    console.error("Error verifying payment:", error);

    let message = "Server error verifying payment.";
    if (error.name === "AbortError") {
      message = "Payment verification timed out. Please try again.";
    }

    return res.status(500).json({
      success: false,
      message,
    });
  }
}
