import React from "react";

const SponsorsSection = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute -top-15 z-0">
        {/* Replace the src below with your actual handshake image */}
        <img src={"/sponsors.png"} className="w-full h-1/3 object-cover " />
        {/* Dark Red/Black Gradient Overlay to match the aesthetic */}
        <div className="absolute inset-0 bg-[#b70000] mix-blend-multiply"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Section Header */}
        <div className="mb-12 lg:mb-12 mx-8">
          <h2 className="text-white font-main-italic text-5xl md:text-6xl leading-tight">
            Sponsors <br />& Partners
          </h2>
        </div>

        {/* Red Container Card */}
        <div className="bg-[#D40000] w-full max-w-5xl mx-auto p-8 md:p-16 shadow-2xl">
          {/* 1. Sponsors (2 Columns) */}
          <div className="mb-12 md:mb-16">
            <h3 className="text-white font-main-italic text-center text-2xl md:text-3xl mb-6 md:mb-8">
              Sponsors
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
              {[1, 2].map((item) => (
                <div
                  key={item}
                  className="bg-white h-32 md:h-40 w-full shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  {/* Logo Placeholder */}
                </div>
              ))}
            </div>
          </div>

          {/* 2. Partners (3 Columns x 2 Rows) */}
          <div className="mb-12 md:mb-16">
            <h3 className="text-white font-main-italic text-center text-2xl md:text-3xl mb-6 md:mb-8">
              Partners
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="bg-white h-28 md:h-32 w-full shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  {/* Logo Placeholder */}
                </div>
              ))}
            </div>
          </div>

          {/* 3. Media Partners (4 Columns) */}
          <div>
            <h3 className="text-white font-main-italic text-center text-2xl md:text-3xl mb-6 md:mb-8">
              Media Partners
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="bg-white h-24 md:h-28 w-full shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  {/* Logo Placeholder */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
