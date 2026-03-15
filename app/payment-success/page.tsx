"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface TicketData {
  success?: boolean;
  ticketSerial?: string;
  qrCode?: string;
  error?: string;
}

export default function PaymentSuccess() {
  const params = useSearchParams();
  const [ticket, setTicket] = useState<TicketData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const reference = params.get("reference");
    if (!reference) {
      setTicket({ error: "No reference provided" });
      setLoading(false);
      return;
    }

    async function verify() {
      try {
        const res = await fetch("/api/verify-payment", {
          method: "POST",
          body: JSON.stringify({ reference }),
        });
        const data: TicketData = await res.json();
        setTicket(data);
      } catch (err) {
        setTicket({ error: "Failed to fetch ticket" });
      } finally {
        setLoading(false);
      }
    }

    verify();
  }, [params]);

  if (loading) {
    return (
      <h1 style={{ textAlign: "center", marginTop: "20vh" }}>
        Generating your ticket...
      </h1>
    );
  }

  if (ticket?.error) {
    return (
      <h1 style={{ textAlign: "center", marginTop: "20vh", color: "red" }}>
        Error: {ticket.error}
      </h1>
    );
  }

  // Success state – ticket is guaranteed to be non-null here
  return (
    <div style={{ textAlign: "center", marginTop: "10vh" }}>
      <h1>Payment Successful 🎉</h1>
      <p>Your ticket has been sent to your email.</p>
      <p>
        <strong>Ticket Serial:</strong> {ticket?.ticketSerial ?? "N/A"}
      </p>
      {ticket?.qrCode && (
        <div style={{ marginTop: "20px" }}>
          <img
            src={ticket.qrCode}
            alt="Ticket QR Code"
            style={{ maxWidth: "200px" }}
          />
        </div>
      )}
    </div>
  );
}
