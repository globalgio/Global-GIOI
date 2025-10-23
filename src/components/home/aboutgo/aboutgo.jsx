import Image from "next/image";

const AboutGO = () => {
  return (
    <div className="relative bg-gradient-to-br from-[#FFFFFF] via-[#F5F7FA] to-[#E8F4FF] py-20 px-6 sm:px-8 lg:px-12 xl:px-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-[0.06]">
        <div className="absolute top-10 right-20 w-96 h-96 bg-[#FFD700] rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-[450px] h-[450px] bg-[#0066CC] rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-[#00D4FF] rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-16">
        {/* Left Section: Title and Image */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start space-y-8 animate-slide-in-left">
          {/* Title */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1A1A1A] text-center md:text-left">
            <span className="relative inline-block">
              Innovation
              <span className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-[#00D4FF]/30 to-transparent animate-expand-line"></span>
            </span>
            <br />
            <span className="relative inline-block bg-gradient-to-r from-[#0066CC] via-[#4D9FFF] to-[#0066CC] bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto] mt-2">
              Spotlight
            </span>
          </h2>

          {/* Decorative line */}
          <div className="flex items-center gap-4 animate-fade-in animation-delay-300">
            <div className="relative w-20 h-1 bg-gradient-to-r from-[#FFD700] via-[#00D4FF] to-[#0066CC] rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-white/50 animate-slide-shine"></div>
            </div>
            <div className="flex gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFD700] shadow-lg shadow-[#FFD700]/50 animate-bounce-slow"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#0066CC] shadow-lg shadow-[#0066CC]/50 animate-bounce-slow animation-delay-200"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#00D4FF] shadow-lg shadow-[#00D4FF]/50 animate-bounce-slow animation-delay-400"></div>
            </div>
          </div>

          {/* Image positioned below the title */}
          <div className="w-full flex justify-center md:justify-start animate-fade-in-up animation-delay-400">
            <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[450px]">
              {/* Animated glow border */}
              <div className="absolute -inset-5 bg-gradient-to-r from-[#0066CC] via-[#FFD700] to-[#00D4FF] rounded-3xl blur-2xl opacity-40 animate-rotate-gradient"></div>

              {/* Corner decorations */}
              <div className="absolute -top-4 -left-4 w-14 h-14 border-t-[5px] border-l-[5px] border-[#FFD700] rounded-tl-3xl animate-pulse-slow z-20 shadow-lg shadow-[#FFD700]/30"></div>
              <div className="absolute -bottom-4 -right-4 w-14 h-14 border-b-[5px] border-r-[5px] border-[#0066CC] rounded-br-3xl animate-pulse-slow animation-delay-400 z-20 shadow-lg shadow-[#0066CC]/30"></div>

              {/* Main image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-[5px] border-white ring-4 ring-[#FFD700]/30 transform transition-all duration-800 hover:scale-105 hover:rotate-1 hover:shadow-[0_25px_50px_rgba(0,102,204,0.3)]">
                <Image
                  src="/homeabout.png"
                  alt="Person smiling"
                  width={450}
                  height={550}
                  className="rounded-2xl object-cover"
                />

                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0066CC]/30 via-[#FFD700]/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-800"></div>

                {/* Shine effect on hover */}
                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-800">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></div>
                </div>
              </div>

              {/* Floating accent elements */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-[#FFD700] to-[#FFE55C] rounded-full opacity-70 blur-xl animate-float z-0"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-br from-[#00D4FF] to-[#0066CC] rounded-full opacity-60 blur-xl animate-float-delayed z-0"></div>
            </div>
          </div>
        </div>

        {/* Right Section: Description */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start animate-slide-in-right">
          <div className="relative">
            {/* Quote decoration */}
            <div className="absolute -top-8 -left-4 text-8xl text-[#FFD700] opacity-20 font-serif leading-none animate-fade-in">
              "
            </div>

            <p className="relative text-xl sm:text-2xl lg:text-3xl xl:text-4xl leading-relaxed text-[#2C3E50] text-center md:text-left font-medium">
              <span className="text-[#0066CC] font-extrabold drop-shadow-sm">
                Top performers
              </span>{" "}
              gain{" "}
              <span className="relative inline-block">
                <span className="relative z-10 font-bold text-[#00D4FF]">
                  global recognition
                </span>
                <span className="absolute bottom-0 left-0 w-full h-2 bg-[#FFD700]/30 animate-expand-line animation-delay-200"></span>
              </span>
              , with the{" "}
              <span className="font-extrabold text-[#FFD700] drop-shadow-sm">
                top 50 schools
              </span>{" "}
              featured in major publications. Join{" "}
              <span className="relative inline-block font-extrabold bg-gradient-to-r from-[#0066CC] via-[#4D9FFF] to-[#0066CC] bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
                GIO
              </span>{" "}
              to inspire innovation and showcase your school's excellence.
            </p>

            {/* Bottom accent */}
            <div className="mt-8 flex justify-center md:justify-start gap-3 animate-fade-in animation-delay-600">
              <div className="w-16 h-1 bg-gradient-to-r from-[#0066CC] to-[#00D4FF] rounded-full animate-pulse-slow"></div>
              <div className="w-8 h-1 bg-[#FFD700] rounded-full animate-pulse-slow animation-delay-200"></div>
              <div className="w-4 h-1 bg-[#00D4FF] rounded-full animate-pulse-slow animation-delay-400"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutGO;
