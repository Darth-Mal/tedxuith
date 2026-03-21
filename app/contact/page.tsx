"use client";

import { useState } from "react";
import { Linkedin, Twitter, Instagram } from "lucide-react";

const ContactSection = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, phone, message }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatusMessage({
          type: "success",
          text: "Message sent successfully!",
        });
        setFullName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        setStatusMessage({
          type: "error",
          text: data.error || "Failed to send message.",
        });
      }
    } catch (err) {
      console.error(err);
      setStatusMessage({
        type: "error",
        text: "Something went wrong. Try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center p-4 md:p-12 lg:p-20 font-sans">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Left Side */}
        <div className="flex flex-col justify-center space-y-12 pt-8 lg:pt-20">
          <div>
            <h1 className="font-main-italic text-left text-5xl md:text-7xl max-sm:mt-20 leading-tight">
              Get in touch
              <br />
              <span className="text-[#E62B1E]">with us</span>
            </h1>
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="text-[#E62B1E] text-lg font-medium mb-1 font-main-italic text-left">
                Email
              </h3>
              <p className="text-xl">tedxuithilorin@gmail.com</p>
            </div>
            <div>
              <h3 className="text-[#E62B1E] text-lg font-medium mb-3 font-main-italic text-left">
                Socials
              </h3>
              <div className="flex space-x-6">
                <a
                  href="https://www.linkedin.com/company/tedxuith-ilorin/"
                  className="hover:text-[#E62B1E] transition-colors"
                >
                  <Linkedin size={28} />
                </a>
                <a
                  href="https://x.com/TEDxUITH_Ilorin?t=I_Nlt3d6tk1NBhFUGBIv9w&s=09"
                  className="hover:text-[#E62B1E] transition-colors"
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/tedxuithilorin?igsh=NWF2MWM2MGkxYWo="
                  className="hover:text-[#E62B1E] transition-colors"
                >
                  <Instagram size={28} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="bg-white text-black rounded-3xl p-6 md:p-10 shadow-xl">
          <div className="flex justify-between items-baseline mb-8">
            <h2 className="font-main-italic text-3xl font-medium">
              Contact Form
            </h2>
            <span className="text-xs text-gray-500 hidden sm:block">
              Required fields are marked *
            </span>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="fullName"
                className="block text-sm font-semibold text-gray-800"
              >
                Full name *
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="Enter your name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#E62B1E] focus:ring-1 focus:ring-[#E62B1E] transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#E62B1E] focus:ring-1 focus:ring-[#E62B1E] transition-all"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Phone number
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#E62B1E] focus:ring-1 focus:ring-[#E62B1E] transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-gray-800"
              >
                Your message *
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none resize-none focus:border-[#E62B1E] focus:ring-1 focus:ring-[#E62B1E] transition-all"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#D40000] hover:bg-[#b30000] text-white font-main-italic text-lg py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 mt-4"
            >
              {loading ? "Sending..." : "Submit"}
            </button>

            {/* Status message */}
            {statusMessage && (
              <p
                className={`mt-4 text-center font-semibold ${
                  statusMessage.type === "success"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {statusMessage.text}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
