"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function PaymentSuccess() {
  const params = useSearchParams();
  const [ticket, setTicket] = useState<any>(null);

  useEffect(() => {
    const reference = params.get("reference");

    async function verify() {
      const res = await fetch("/api/verify-payment", {
        method: "POST",
        body: JSON.stringify({ reference }),
      });

      const data = await res.json();
      setTicket(data);
    }

    if (reference) verify();
  }, []);

  if (!ticket) return <h1>Generating your ticket...</h1>;

  return (
    <div>
      <div>
        <h1>Payment Successful 🎉</h1>
        <p>Your ticket has been sent to your email.</p>
      </div>
    </div>
  );
}
