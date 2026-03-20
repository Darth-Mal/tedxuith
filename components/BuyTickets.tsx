"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TicketModal({ isOpen, onClose }: TicketModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ticketType, setTicketType] = useState("Standard");
  const [loading, setLoading] = useState(false);

  // Close with ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleBuyTicket = async () => {
    if (!name || !email) return alert("Please fill all fields");

    try {
      setLoading(true);

      const res = await fetch("/api/initiate-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, ticketType }),
      });

      const data = await res.json();

      if (data.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        alert("Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative z-50 w-full max-w-2xl bg-white rounded-xl p-8 shadow-lg">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h1 className=" m-0 text-[30px] text-black/70 text-left font-main-italic leading-none">
          Register for Compass{" "}
        </h1>

        {/* Form */}
        <div className="space-y-6 mt-4">
          {/* Name + Email */}
          <div className="grid md:grid-cols-2 gap-4 text-black/70 font-sans">
            <div>
              <label className="text-sm font-light">
                Full name <span className="text-red-500">*</span>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="placeholder:text-sm w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className=" text-black/70 ">
              <label className="text-sm font-light">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                type="email"
                className="placeholder:text-sm w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Ticket Type */}
          <div className=" text-black/70 ">
            <p className="text-sm  text-black/70 mb-2">
              Select Ticket type <span className="text-red-500">*</span>
            </p>

            <div className="flex gap-4">
              <label
                className={`flex items-center gap-2 border px-4 py-2 rounded-lg cursor-pointer ${
                  ticketType === "Standard" ? "border-red-500" : ""
                }`}
              >
                <input
                  type="radio"
                  name="ticket"
                  checked={ticketType === "Standard"}
                  onChange={() => setTicketType("Standard")}
                />
                Standard ◆ ₦4500.00
              </label>

              <label
                className={`flex items-center gap-2 border px-4 py-2 rounded-lg cursor-pointer ${
                  ticketType === "VIP" ? "border-red-500" : ""
                }`}
              >
                <input
                  type="radio"
                  name="ticket"
                  checked={ticketType === "VIP"}
                  onChange={() => setTicketType("VIP")}
                />
                VIP ◆ ₦20000.00
              </label>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleBuyTicket}
            disabled={loading}
            className="font-main-italic text-2xl w-full bg-red-600 text-white py-5 rounded-full hover:bg-red-700 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Buy Ticket"}
          </button>
        </div>
      </div>
    </div>
  );
}
