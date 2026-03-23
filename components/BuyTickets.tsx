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
      <div className="relative z-50 w-full max-w-3xl bg-white rounded-xl p-8 shadow-lg">
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

        <div className="space-y-2 mt-2">
          {/* Name + Email */}
          <div className="grid md:grid-cols-2 gap-4 text-black/70">
            <div>
              <label className="text-sm font-sans font-bold">
                Full name <span className="text-red-500">*</span>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full mt-1 px-2 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-sans font-bold">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                type="email"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>
          </div>

          {/* Ticket Selection */}
          <div>
            <p className="text-sm mb-1  text-black/70 font-sans font-bold">
              Select Ticket type <span className="text-red-500">*</span>
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Standard */}
              <div
                onClick={() => setTicketType("Standard")}
                className={`border rounded-xl p-4 cursor-pointer transition ${
                  ticketType === "Standard"
                    ? "border-red-500"
                    : "hover:border-gray-400"
                }`}
              >
                <div className="flex justify-between items-center mb-1  text-black/70 font-sans">
                  <div className="flex justify-center items-center gap-2">
                    {" "}
                    <input
                      type="radio"
                      name="ticket"
                      checked={ticketType === "Standard"}
                      onChange={() => setTicketType("Standard")}
                      className="accent-red-600 w-4 h-4"
                    />
                    <span className="text-md font-bold">Standard</span>
                  </div>

                  <div className="flex gap-1 justify-center items-center">
                    {" "}
                    <img src="/sell.png" className="w-4 h-4" alt="" />
                    <span className="text-md font-bold">₦4,500</span>
                  </div>
                </div>

                {/* Image placeholder */}
                <div className="mt-2 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-sm text-gray-500">
                  <img src="/tickets/stdticket.png" alt="" />
                </div>

                <div className="mt-3 text-xs text-gray-600">
                  <p className=" mb-1 text-xs text-black/70 font-sans font-bold">
                    What you get with the Standard ticket:
                  </p>
                  <ul className="list-disc text-sm ml-4 font-sans">
                    <li>Access to main event</li>
                    <li>Networking session</li>
                    <li>Event materials</li>
                  </ul>
                </div>
              </div>

              {/* VIP */}
              <div
                onClick={() => setTicketType("VIP")}
                className={`border rounded-xl p-4 cursor-pointer transition ${
                  ticketType === "VIP"
                    ? "border-red-500"
                    : "hover:border-gray-400"
                }`}
              >
                <div className="flex justify-between items-center mb-1 text-black/70 font-sans">
                  <div className="flex justify-center items-center gap-2">
                    {" "}
                    <input
                      type="radio"
                      name="ticket"
                      checked={ticketType === "VIP"}
                      onChange={() => setTicketType("VIP")}
                      className="accent-red-600 w-4 h-4"
                    />
                    <span className="text-md font-bold">VIP</span>
                  </div>

                  <div className="flex gap-1 justify-center items-center">
                    {" "}
                    <img src="/sell.png" className="w-4 h-4" alt="" />
                    <span className="text-md font-bold">₦20,000</span>
                  </div>
                </div>

                {/* Image placeholder */}
                <div className="h-20 mt-2 bg-gray-200 rounded-lg flex items-center justify-center text-sm text-gray-500">
                  <img src="/tickets/vipticket.png" alt="" />
                </div>

                <div className="mt-3 text-xs text-gray-600">
                  <p className=" mb-1 text-xs font-bold text-gray-600">
                    What you get with the VIP ticket:
                  </p>
                  <ul className="list-disc ml-4 space-y-1">
                    <li>Premium front-row seating</li>
                    <li>Priority entry & registration</li>
                    <li>VIP networking with speakers</li>
                    <li>Professional photo session</li>
                    <li>TEDxUITH Ilorin merchandise</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleBuyTicket}
            disabled={loading}
            className="font-main-italic text-xl w-full bg-red-600 text-white py-4 rounded-full hover:bg-red-700 transition disabled:opacity-50"
          >
            {loading ? "Processing..." : "Buy Ticket"}
          </button>
        </div>
      </div>
    </div>
  );
}
