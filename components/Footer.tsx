import Image from "next/image";
import { Instagram, Linkedin, Twitter, Youtube, Mail } from "lucide-react"; // Ensure you have lucide-react installed

const Footer = () => {
  return (
    <footer className="h-full w-full">
      {/* Main Container - Preserving your layout classes */}
      <div className="bg-primary rounded-t-[100px] w-full min-h-full flex flex-col items-center pt-[55px] pb-2 ">
        {/* --- YOUR ORIGINAL BUTTON SECTION --- */}
        {/* I added bg-white/text-primary to make the button pop against the primary background */}
        <button className="w-[90%] text-primary hover:text-primary hover:bg-gray-100 transition-colors duration-300 rounded-[50px] h-20 text-4xl flex flex-col items-center justify-center shadow-lg">
          <h3 className="font-main-italic m-0 text-4xl ">Register</h3>
        </button>

        {/* --- NEW CONTENT BELOW --- */}

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
            {["Speakers", "Schedule", "About Us", "Partners", "Team"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="text-white/70 hover:text-white transition-colors text-[12px]"
                >
                  {item}
                </a>
              )
            )}
          </div>

          {/* Column 3: Legal & Contact */}
          <div className="flex flex-col space-y-1">
            <h4 className="font-bold text-sm mb-2">Information</h4>
            <a
              href="/nominate"
              className="text-white/70 hover:text-white transition-colors text-[12px]"
            >
              Nominate a Speaker
            </a>
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

          {/* Column 4: Newsletter */}
          {/* <div className="space-y-4">
            <h4 className="font-bold text-lg">Stay Updated</h4>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:border-white placeholder:text-white/50"
              />
              <button className="px-6 py-2 bg-black text-white rounded-xl font-bold hover:bg-gray-900 transition-colors uppercase text-sm tracking-widest">
                Subscribe
              </button>
            </div>
          </div> */}
        </div>

        {/* --- BOTTOM SECTION --- */}
        <div className="w-[90%] mt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Mandatory TEDx Disclaimer */}
          <p className="text-xs text-white/50 text-center md:text-left order-2 md:order-1">
            This independent TEDx event is operated under license from TED.{" "}
            <br />© {new Date().getFullYear()} TEDxEventName. All Rights
            Reserved.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 order-1 md:order-2">
            {[Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-2 bg-white/10 rounded-full hover:bg-white hover:text-primary transition-all duration-300"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
