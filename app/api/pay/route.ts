import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const { name, email } = await req.json();

  const amount = 5000; // ticket price in Naira
  const reference = `tx_${Date.now()}`;

  // 1. Save pending transaction in Supabase
  await supabase.from("transactions").insert({
    email,
    amount,
    reference,
    status: "pending",
  });

  // 2. Initialize Paystack transaction
  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      amount: amount * 100, // in kobo
      reference,
      callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`,
    }),
  });

  const data = await res.json();

  return NextResponse.json({ url: data.data.authorization_url });
}
