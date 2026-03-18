import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    console.log("🔥 API HIT");

    const body = await req.json();
    console.log("📦 Body:", body);

    const { name, email, phone, ticketType } = body;

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    console.log("✅ Supabase initialized");

    const amount = ticketType === "VIP" ? 500000 : 200000;

    const { data, error } = await supabase
      .from("tickets")
      .insert({
        name,
        email,
        phone,
        ticket_type: ticketType,
        amount,
        paid: false,
      })
      .select()
      .single();

    if (error) {
      console.error("❌ Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("✅ Ticket created:", data);

    console.log(
      "🔑 PAYSTACK KEY:",
      process.env.PAYSTACK_SECRET_KEY ? "exists" : "MISSING",
    );

    const paystackRes = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount,
          reference: data.id,
          callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?ticketId=${data.id}`,
        }),
      },
    );

    const text = await paystackRes.text();
    console.log("📡 Paystack raw:", text);

    const paystackData = JSON.parse(text);

    return NextResponse.json(paystackData.data);
  } catch (err: any) {
    console.error("💥 FULL ERROR:", err);
    return NextResponse.json(
      { error: err?.message || "Unknown error" },
      { status: 500 },
    );
  }
}
