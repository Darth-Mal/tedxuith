"use client";

import { useState } from "react";
import Image from "next/image";
import { Instagram, Linkedin, LucideProps } from "lucide-react";
import TicketModal from "@/components/BuyTickets";

// Shared icon type (matches Lucide exactly)
type IconType = React.ComponentType<LucideProps>;

// Custom X (Twitter rebrand) Icon
const XIcon: IconType = ({ size = 20, className }) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const socialLinks: { Icon: IconType; url: string }[] = [
    {
      Icon: Instagram,
      url: "https://www.instagram.com/tedxuithilorin?igsh=NWF2MWM2MGkxYWo=",
    },
    {
      Icon: XIcon,
      url: "https://x.com/TEDxUITH_Ilorin?t=I_Nlt3d6tk1NBhFUGBIv9w&s=09",
    },
    {
      Icon: Linkedin,
      url: "https://www.linkedin.com/company/tedxuith-ilorin/",
    },
  ];

  return (
    <footer className="h-full w-full">
      <div className="bg-primary rounded-t-[100px] w-full min-h-full flex flex-col items-center pt-[55px] pb-2">
        {/* Register Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-[90%] text-white hover:text-primary hover:bg-gray-100 transition-colors duration-300 rounded-[50px] h-20 text-4xl flex flex-col items-center justify-center shadow-lg"
        >
          <h3 className="font-main-italic m-0 text-4xl text-inherit">
            Register
          </h3>
        </button>

        {/* Footer Columns */}
        <div className="w-[90%] mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 border-b border-white/20 pb-16">
          {/* Column 1 */}
          <div className="space-y-4">
            <h4>
              <span className="font-[700] text-4xl">TEDx</span> <br />
              <span className="text-4xl font-light">UITHIlorin</span>
            </h4>
            <p className="text-white/80 text-[12px] leading-relaxed max-w-xs">
              Ideas worth spreading. Join us for a day of inspiration,
              connection, and transformation.
            </p>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col space-y-1">
            <h4 className="font-bold text-sm mb-2">Explore</h4>
            {["Speakers", "Attend", "About", "Sponsors"].map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase().replace(" ", "-")}`}
                className="text-white/70 hover:text-white transition-colors text-[12px]"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col space-y-1">
            <h4 className="font-bold text-sm mb-2">Information</h4>
            <a
              href="/contact"
              className="text-white/70 hover:text-white transition-colors text-[12px]"
            >
              Contact Us
            </a>
            <a
              href="/privacy"
              className="text-white/70 hover:text-white transition-colors text-[12px]"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="w-[90%] mt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-white/50 text-center md:text-left order-2 md:order-1">
            This independent TEDx event is operated under license from TED.{" "}
            <br />© {new Date().getFullYear()} TEDxUITHIlorin. All Rights
            Reserved.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 order-1 md:order-2">
            {socialLinks.map(({ Icon, url }, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-white hover:text-primary transition-all duration-300"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Ticket Modal */}
        <TicketModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </footer>
  );
};

export default Footer;
