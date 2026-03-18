import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // create this in lib/supabase.ts

export async function POST(req: Request) {
  const { name, email, phone, ticketType } = await req.json();
  const amount = ticketType === "VIP" ? 500000 : 200000; // kobo

  // Save ticket first (paid = false)
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

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  // Initialize Paystack payment
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
        reference: data.id, // Use Supabase ticket id as reference
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?ticketId=${data.id}`,
      }),
    },
  );
  const paystackData = await paystackRes.json();
  return NextResponse.json(paystackData.data);
}
