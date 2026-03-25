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
  const [ticketType, setTicketType] = useState<"Standard" | "VIP">("Standard");
  const [openTicket, setOpenTicket] = useState<"Standard" | "VIP">("Standard");
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

  const price = ticketType === "VIP" ? "₦20,000" : "₦4,500";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="relative z-50 w-full max-w-3xl bg-white rounded-xl p-6 shadow-lg max-h-[90vh] overflow-y-auto">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h1 className="text-[26px] text-black/70 font-main-italic leading-none">
          Register for Compass
        </h1>

        <div className="space-y-4 mt-4">
          {/* Name + Email */}
          <div className="grid md:grid-cols-2 gap-4 text-black/70">
            <div>
              <label className="text-sm font-bold">
                Full name <span className="text-red-500">*</span>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-bold">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                type="email"
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>
          </div>

          {/* Ticket Selection */}
          <div>
            <p className="text-sm mb-2 font-bold text-black/70">
              Select Ticket type <span className="text-red-500">*</span>
            </p>

            <div className="space-y-3">
              {/* STANDARD */}
              <div className="border rounded-xl overflow-hidden">
                <div
                  onClick={() => {
                    setTicketType("Standard");
                    setOpenTicket("Standard");
                  }}
                  className="flex justify-between items-center p-4 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={ticketType === "Standard"}
                      onChange={() => setTicketType("Standard")}
                      className="accent-red-600"
                    />
                    <span className=" text-black/70 font-bold">Standard</span>
                  </div>

                  <span className="text-black/70 font-bold">₦4,500</span>
                </div>

                {openTicket === "Standard" && (
                  <div className="px-4 pb-4 text-sm text-gray-600">
                    <img
                      src="/tickets/stdticket.png"
                      alt="Standard ticket"
                      className="rounded-lg mb-2"
                    />

                    <p className="text-black/70 font-bold mb-1">What you get:</p>
                    <ul className="list-disc ml-4">
                      <li>Access to main event</li>
                      <li>Networking session</li>
                      <li>Event materials</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* VIP */}
              <div className="border rounded-xl overflow-hidden">
                <div
                  onClick={() => {
                    setTicketType("VIP");
                    setOpenTicket("VIP");
                  }}
                  className="flex justify-between items-center p-4 cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={ticketType === "VIP"}
                      onChange={() => setTicketType("VIP")}
                      className="accent-red-600"
                    />
                    <span className="text-black/70 font-bold">VIP</span>
                  </div>

                  <span className="text-black/70 font-bold">₦20,000</span>
                </div>

                {openTicket === "VIP" && (
                  <div className="px-4 pb-4 text-sm text-gray-600">
                    <img
                      src="/tickets/vipticket.png"
                      alt="VIP ticket"
                      className="rounded-lg mb-2"
                    />

                    <p className=" text-black/70 font-bold mb-1">What you get:</p>
                    <ul className="list-disc ml-4 space-y-1">
                      <li>Premium front-row seating</li>
                      <li>Priority entry & registration</li>
                      <li>VIP networking with speakers</li>
                      <li>Professional photo session</li>
                      <li>TEDxUITH Ilorin merchandise</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Spacer for mobile sticky button */}
          <div className="h-24 md:hidden" />

          {/* Desktop Button */}
          <div className="hidden md:block">
            <button
              onClick={handleBuyTicket}
              disabled={loading}
              className="text-xl w-full bg-red-600 text-white py-4 rounded-full hover:bg-red-700 transition disabled:opacity-50"
            >
              {loading
                ? "Processing..."
                : `Buy ${ticketType} Ticket – ${price}`}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Button */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t p-4">
        <button
          onClick={handleBuyTicket}
          disabled={loading}
          className="text-lg w-full bg-red-600 text-white py-4 rounded-full shadow-lg hover:bg-red-700 transition disabled:opacity-50"
        >
          {loading
            ? "Processing..."
            : `Buy ${ticketType} Ticket – ${price}`}
        </button>
      </div>
    </div>
  );
              }
