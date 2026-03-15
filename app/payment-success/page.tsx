import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  console.log("🔵 verify-payment route triggered");

  try {
    const body = await req.json();
    console.log("📦 Request body:", body);

    const { reference } = body;

    console.log("🔎 Payment reference:", reference);

    // your verification logic
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      },
    );

    const data = await response.json();

    console.log("💳 Paystack response:", data);

    if (data.data.status === "success") {
      console.log("✅ Payment verified");

      // save ticket
      const { error } = await supabaseAdmin
        .from("tickets")
        .insert([{ reference }]);

      if (error) {
        console.error("❌ Supabase insert error:", error);
      }

      return NextResponse.json({ success: true });
    }

    console.warn("⚠ Payment not successful");

    return NextResponse.json({ success: false });
  } catch (err) {
    console.error("🔥 API ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
