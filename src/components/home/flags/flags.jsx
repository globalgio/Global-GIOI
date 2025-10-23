"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";

const Flags = () => {
  const controls = useAnimation();
  const containerRef = useRef(null);

  const flagData = [
    { src: "/flags/India.jpg", alt: "Flag of India", name: "India" },
    { src: "/flags/Norway.jpg", alt: "Flag of Norway", name: "Norway" },
    {
      src: "/flags/South Africa.jpg",
      alt: "Flag of South Africa",
      name: "South Africa",
    },
    { src: "/flags/Kuwait.jpg", alt: "Flag of Kuwait", name: "Kuwait" },
    {
      src: "/flags/Saudi.jpg",
      alt: "Flag of Saudi Arabia",
      name: "Saudi Arabia",
    },
    { src: "/flags/Qutar.jpg", alt: "Flag of Qatar", name: "Qatar" },
    { src: "/flags/UAE.jpg", alt: "Flag of UAE", name: "UAE" },
    { src: "/flags/Nepal.jpg", alt: "Flag of Nepal", name: "Nepal" },
    { src: "/flags/USA.jpg", alt: "Flag of USA", name: "USA" },
  ];

  // Duplicate the flags to create a seamless loop
  const duplicatedFlags = [...flagData, ...flagData];

  useEffect(() => {
    const animateFlags = () => {
      if (containerRef.current) {
        const totalWidth = containerRef.current.scrollWidth / 2;
        controls.start({
          x: [0, -totalWidth],
          transition: {
            duration: 30,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          },
        });
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      animateFlags();
    }, 100);

    return () => clearTimeout(timer);
  }, [controls]);

  return (
    <>
      <style>{`
        @layer utilities {
          @keyframes float {
            0%, 100% {
              transform: translate(0, 0) scale(1);
            }
            33% {
              transform: translate(30px, -30px) scale(1.05);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.95);
            }
          }

          @keyframes float-delayed {
            0%, 100% {
              transform: translate(0, 0) scale(1);
            }
            33% {
              transform: translate(-35px, 25px) scale(1.08);
            }
            66% {
              transform: translate(25px, -25px) scale(0.92);
            }
          }

          @keyframes pulse-slow {
            0%, 100% {
              transform: scale(1);
              opacity: 0.6;
            }
            50% {
              transform: scale(1.08);
              opacity: 0.9;
            }
          }

          @keyframes shimmer {
            0% {
              background-position: -200% center;
            }
            100% {
              background-position: 200% center;
            }
          }

          .animate-float {
            animation: float 8s ease-in-out infinite;
          }

          .animate-float-delayed {
            animation: float-delayed 9s ease-in-out infinite;
          }

          .animate-pulse-slow {
            animation: pulse-slow 3s ease-in-out infinite;
          }

          .animate-shimmer {
            background-size: 200% auto;
            animation: shimmer 3s linear infinite;
          }

          .flag-card-hover {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .flag-card-hover:hover {
            transform: translateY(-8px) scale(1.05);
          }
        }
      `}</style>

      <div className="relative w-full overflow-hidden bg-gradient-to-br from-[#0066CC] via-[#004C99] to-[#0066CC] py-12 sm:py-16">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 opacity-[0.07]">
          <div className="absolute top-10 left-20 w-96 h-96 bg-[#FFD700] rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-[#00D4FF] rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        {/* Decorative Top Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>

        {/* Section Header */}
        <div className="relative z-10 text-center mb-8 sm:mb-12 px-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#FFD700] via-white to-[#FFD700] bg-clip-text text-transparent animate-shimmer drop-shadow-lg">
            Our Global Reach
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mt-3 drop-shadow-md">
            Connecting students across continents
          </p>
        </div>

        {/* Scrolling Flags Container */}
        <div className="relative z-10">
          <motion.div
            className="flex flex-nowrap"
            ref={containerRef}
            animate={controls}
            initial={{ x: 0 }}
          >
            {duplicatedFlags.map((flag, index) => (
              <div key={index} className="flex-shrink-0 mx-3 sm:mx-4 lg:mx-6">
                <div className="flag-card-hover relative group">
                  {/* Glow Effect */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-[#FFD700]/30 via-[#00D4FF]/30 to-[#FFD700]/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Flag Card */}
                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-xl">
                    {/* Corner Decoration */}
                    <div className="absolute -top-1 -right-1 w-8 h-8 border-t-[3px] border-r-[3px] border-[#FFD700] rounded-tr-xl opacity-70"></div>

                    {/* Flag Image Container */}
                    <div className="relative w-32 h-20 sm:w-36 sm:h-24 lg:w-40 lg:h-28 rounded-xl overflow-hidden border-[3px] border-white/30 shadow-lg">
                      <Image
                        src={flag.src}
                        alt={flag.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 128px, (max-width: 1024px) 144px, 160px"
                      />
                    </div>

                    {/* Country Name */}
                    <p className="text-center text-white font-bold text-sm sm:text-base mt-3 drop-shadow-md">
                      {flag.name}
                    </p>

                    {/* Bottom Accent */}
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-[2px] bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Gradient Fade Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 sm:w-48 bg-gradient-to-r from-[#0066CC] to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 sm:w-48 bg-gradient-to-l from-[#0066CC] to-transparent z-20 pointer-events-none"></div>

        {/* Decorative Bottom Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent"></div>
      </div>
    </>
  );
};

export default Flags;
