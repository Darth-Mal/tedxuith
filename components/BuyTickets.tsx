"use client";

import { useState } from "react";

export default function TicketForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ticketType, setTicketType] = useState("Standard");

  const handleBuyTicket = async () => {
    const res = await fetch("/api/initiate-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, ticketType }),
    });
    const data = await res.json();
    if (data.authorization_url) {
      window.location.href = data.authorization_url; // redirect to Paystack
    }
  };

  return (
    <div>
      <input
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <select
        value={ticketType}
        onChange={(e) => setTicketType(e.target.value)}
      >
        <option>Standard</option>
        <option>VIP</option>
      </select>
      <button onClick={handleBuyTicket}>Buy Ticket</button>
    </div>
  );
}
