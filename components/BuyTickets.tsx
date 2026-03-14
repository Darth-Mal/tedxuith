"use client";

import { useState } from "react";

export default function TicketForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function buyTicket() {
    const res = await fetch("/api/pay", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
      }),
    });

    const data = await res.json();

    window.location.href = data.url;
  }

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

      <button onClick={buyTicket}>Buy Ticket</button>
    </div>
  );
}
