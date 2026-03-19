import Image from "next/image";
import { Instagram, Linkedin } from "lucide-react"; // Lucide icons
import { ReactNode } from "react";

// Custom X (Twitter rebrand) Icon as SVG component
const XIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M23 3a10.9 10.9 0 0 1-3.14.86 4.48 4.48 0 0 0 1.95-2.48 9.05 9.05 0 0 1-2.83 1.08 4.52 4.52 0 0 0-7.72 4.13A12.84 12.84 0 0 1 1.67 2.15 4.52 4.52 0 0 0 3 9.7a4.41 4.41 0 0 1-2-.55v.06a4.52 4.52 0 0 0 3.63 4.43 4.52 4.52 0 0 1-2 .08 4.52 4.52 0 0 0 4.22 3.14A9.05 9.05 0 0 1 1 19.54 12.78 12.78 0 0 0 7 21c8.29 0 12.82-6.87 12.82-12.82 0-.2 0-.42-.01-.63A9.22 9.22 0 0 0 23 3z" />
  </svg>
);

const Footer = () => {
  const socialLinks: { Icon: ReactNode; url: string }[] = [
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
    // Replace with actual YouTube link
  ];

  return (
    <footer className="h-full w-full">
      <div className="bg-primary rounded-t-[100px] w-full min-h-full flex flex-col items-center pt-[55px] pb-2">
        {/* Register Button */}
        <button className="w-[90%] text-white hover:text-primary hover:bg-gray-100 transition-colors duration-300 rounded-[50px] h-20 text-4xl flex flex-col items-center justify-center shadow-lg">
          <h3 className="font-main-italic m-0 text-4xl text-inherit">
            Register
          </h3>
        </button>

        {/* Footer Columns */}
        <div className="w-[90%] mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 border-b border-white/20 pb-16">
          {/* Column 1: Brand & Intro */}
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

          {/* Column 2: Navigation */}
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

          {/* Column 3: Legal & Contact */}
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
          {/* Disclaimer */}
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
                {typeof Icon === "function" ? (
                  <Icon size={20} />
                ) : (
                  <Icon size={20} />
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
