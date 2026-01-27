import { Linkedin, Twitter, Instagram } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center p-4 md:p-12 lg:p-20 font-sans">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Left Side: Text Content */}
        <div className="flex flex-col justify-center space-y-12 pt-8 lg:pt-20">
          <div>
            <h1 className="font-main-italic text-left text-5xl md:text-7xl leading-tight">
              Get in touch
              <br />
              <span className="text-[#E62B1E]">With us</span>
            </h1>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-[#E62B1E] text-lg font-medium mb-1 font-main-italic text-left">
                Email
              </h3>
              <p className="text-xl">tedxuith@gmail.com</p>
            </div>

            <div>
              <h3 className="text-[#E62B1E] text-lg font-medium mb-3 font-main-italic text-left">
                Socials
              </h3>
              <div className="flex space-x-6">
                <a href="#" className="hover:text-[#E62B1E] transition-colors">
                  <Linkedin size={28} />
                </a>
                <a href="#" className="hover:text-[#E62B1E] transition-colors">
                  {/* Using X icon representation */}
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
                <a href="#" className="hover:text-[#E62B1E] transition-colors">
                  <Instagram size={28} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form Card */}
        <div className="bg-white text-black rounded-3xl p-6 md:p-10 shadow-xl">
          <div className="flex justify-between items-baseline mb-8">
            <h2 className="font-main-italic text-3xl font-medium">
              Contact Form
            </h2>
            <span className="text-xs text-gray-500 hidden sm:block">
              Required fields are marked *
            </span>
          </div>

          <form className="space-y-6">
            {/* Full Name */}
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
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#E62B1E] focus:ring-1 focus:ring-[#E62B1E] transition-all"
              />
            </div>

            {/* Email & Phone Grid */}
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
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#E62B1E] focus:ring-1 focus:ring-[#E62B1E] transition-all"
                />
              </div>
            </div>

            {/* Message */}
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
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none resize-none focus:border-[#E62B1E] focus:ring-1 focus:ring-[#E62B1E] transition-all"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#D40000] hover:bg-[#b30000] text-white font-main-italic text-lg py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 mt-4"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
