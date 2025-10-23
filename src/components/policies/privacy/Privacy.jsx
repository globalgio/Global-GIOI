const Privacy = () => {
  return (
    <>
      {/* Header Section */}
      <div className="relative w-full h-80 bg-gradient-to-br from-[#0066CC] via-[#004C99] to-[#0066CC] overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-96 h-96 bg-[#FFD700] rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-20 w-[500px] h-[500px] bg-[#00D4FF] rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 animate-fade-in-up">
          <div className="mb-4 animate-fade-in animation-delay-200">
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto mb-6 animate-expand-line"></div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4">
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-white via-[#FFE55C] to-white bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
                  PRIVACY POLICY
                </span>
              </span>
            </h1>
          </div>

          <p className="text-lg md:text-xl lg:text-2xl mt-4 font-medium max-w-3xl leading-relaxed animate-fade-in-up animation-delay-400">
            Learn about our privacy policy for{" "}
            <span className="font-bold text-[#FFD700]">GIO</span> events and
            activities.
          </p>

          <div className="flex items-center gap-2 text-sm md:text-base mt-6 animate-fade-in animation-delay-600">
            <a
              href="/"
              className="text-white hover:text-[#FFD700] transition-colors duration-300 font-semibold"
            >
              Home
            </a>
            <span className="text-[#00D4FF]">/</span>
            <span className="text-[#FFD700] font-bold">Privacy Policy</span>
          </div>

          {/* Decorative dots */}
          <div className="flex gap-2 mt-8 animate-fade-in animation-delay-600">
            <div className="w-2 h-2 rounded-full bg-[#FFD700] animate-bounce-slow"></div>
            <div className="w-2 h-2 rounded-full bg-white animate-bounce-slow animation-delay-200"></div>
            <div className="w-2 h-2 rounded-full bg-[#00D4FF] animate-bounce-slow animation-delay-400"></div>
          </div>
        </div>

        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Content Section */}
      <div className="relative bg-gradient-to-br from-[#FFFFFF] via-[#F5F7FA] to-[#E8F4FF] px-6 sm:px-12 lg:px-20 py-12 md:py-20 overflow-hidden">
        {/* Background orbs */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute top-40 right-20 w-96 h-96 bg-[#0066CC] rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-40 left-20 w-[450px] h-[450px] bg-[#FFD700] rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Main Title */}
          <div className="mb-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1A1A1A] mb-4">
              Privacy Policy for{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#0066CC] via-[#4D9FFF] to-[#0066CC] bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
                  GIO
                </span>
                <span className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-[#FFD700]/30 to-transparent animate-expand-line"></span>
              </span>
            </h2>

            <div className="flex items-center gap-4 mt-6">
              <div className="relative w-24 h-1 bg-gradient-to-r from-[#FFD700] via-[#00D4FF] to-[#0066CC] rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-white/50 animate-slide-shine"></div>
              </div>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-[#FFD700] shadow-lg shadow-[#FFD700]/50 animate-bounce-slow"></div>
                <div className="w-2 h-2 rounded-full bg-[#0066CC] shadow-lg shadow-[#0066CC]/50 animate-bounce-slow animation-delay-200"></div>
                <div className="w-2 h-2 rounded-full bg-[#00D4FF] shadow-lg shadow-[#00D4FF]/50 animate-bounce-slow animation-delay-400"></div>
              </div>
            </div>
          </div>

          {/* Introduction Paragraphs */}
          <div className="space-y-6 mb-12 animate-fade-in-up animation-delay-200">
            <p className="text-lg md:text-xl text-[#2C3E50] leading-relaxed">
              At <span className="font-bold text-[#0066CC]">GIO</span>, we
              prioritize the privacy of our stakeholders and the safeguarding of
              personal information. Our commitment to this is reflected in our
              concise privacy policy, governing the collection, utilization, and
              dissemination of personal data through our official website.
            </p>
            <p className="text-lg md:text-xl text-[#2C3E50] leading-relaxed">
              This policy is exclusive to the GIO domain and doesn't extend to
              external websites linked from our pages. Given the dynamic nature
              of internet technology, we may periodically update this policy,
              with changes promptly reflected on the privacy policy page.
            </p>
            <p className="text-lg md:text-xl text-[#2C3E50] leading-relaxed">
              Transparency is key in privacy matters. We urge you to review this
              document to understand the terms for providing personal
              information on our website. By continuing to use the GIO website,
              you signify your acceptance of these terms.
            </p>
            <p className="text-lg md:text-xl text-[#2C3E50] leading-relaxed">
              Our policy is crafted to ensure a secure online experience,
              fostering a trusted environment for STEM and robotics exploration.
              Your confidence is paramount. Updates to this privacy policy are
              made with your best interests in mind, maintaining the highest
              standards of privacy and data security.
            </p>
            <p className="text-lg md:text-xl text-[#2C3E50] leading-relaxed">
              Thank you for entrusting us with your participation in the{" "}
              <span className="font-bold text-[#00D4FF]">
                Global Innovator Olympiad
              </span>
              . We anticipate a shared journey of innovation, learning, and a
              steadfast commitment to privacy.
            </p>
          </div>

          {/* Section Cards */}
          <div className="space-y-10">
            {/* Information Collection */}
            <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl border-3 border-[#0066CC]/20 shadow-xl hover:shadow-2xl transition-all duration-500 animate-fade-in-up animation-delay-400 group">
              <div className="absolute -top-3 -left-3 w-10 h-10 border-t-4 border-l-4 border-[#FFD700] rounded-tl-2xl animate-pulse-slow"></div>
              <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-4 border-r-4 border-[#00D4FF] rounded-br-2xl animate-pulse-slow animation-delay-400"></div>

              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-[#0066CC] flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0066CC] to-[#4D9FFF] flex items-center justify-center text-white font-extrabold text-lg shadow-lg">
                  1
                </span>
                Information Collection and Use
              </h3>
              <div className="space-y-4 text-lg md:text-xl text-[#2C3E50] leading-relaxed pl-13">
                <p>
                  While some sections of our website can be accessed without
                  personal information, specific areas may require registration
                  with particular details. Information collected by the Global
                  Innovator Olympiad (GIO) is strictly used for specified
                  purposes outlined at collection and will not be sold, traded,
                  rented, or shared with third parties, including commercial
                  entities.
                </p>
                <p>
                  GIO may disclose collected information to its employees,
                  agents, consultants, and others deemed necessary for proper
                  information handling. In certain circumstances, disclosure to
                  third parties, such as law enforcement officials and courts,
                  may occur at the institute's discretion.
                </p>
                <p>
                  At GIO, we are unwavering in our commitment to maintaining the
                  confidentiality and security of your data. Any disclosure is
                  made with due consideration and adherence to applicable laws.
                  We prioritize responsible information handling to ensure your
                  privacy is upheld throughout your interaction with our
                  platform.
                </p>
              </div>
            </div>

            {/* Cookies */}
            <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl border-3 border-[#FFD700]/20 shadow-xl hover:shadow-2xl transition-all duration-500 animate-fade-in-up animation-delay-500 group">
              <div className="absolute -top-3 -left-3 w-10 h-10 border-t-4 border-l-4 border-[#00D4FF] rounded-tl-2xl animate-pulse-slow"></div>
              <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-4 border-r-4 border-[#FFD700] rounded-br-2xl animate-pulse-slow animation-delay-400"></div>

              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-[#FFD700] flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFE55C] flex items-center justify-center text-[#1A1A1A] font-extrabold text-lg shadow-lg">
                  2
                </span>
                Cookies
              </h3>
              <div className="space-y-4 text-lg md:text-xl text-[#2C3E50] leading-relaxed pl-13">
                <p>
                  At Global Innovator Olympiad (GIO), our website utilizes
                  "cookies" to track usage and enhance services. These small
                  data bits, transferred to users' hard drives during logins or
                  specific site access, serve purposes like authentication.
                  Adjusting browser settings can block cookies, though this may
                  limit access to certain site sections. Users retain control
                  and can remove cookies through browser options.
                </p>
                <p>
                  Crucially, data collected through cookies is anonymous, devoid
                  of personally identifiable information like names or
                  addresses. Our commitment to transparency and user control
                  ensures an optimal online experience.
                </p>
              </div>
            </div>

            {/* Data Security */}
            <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl border-3 border-[#00D4FF]/20 shadow-xl hover:shadow-2xl transition-all duration-500 animate-fade-in-up animation-delay-600 group">
              <div className="absolute -top-3 -left-3 w-10 h-10 border-t-4 border-l-4 border-[#0066CC] rounded-tl-2xl animate-pulse-slow"></div>
              <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-4 border-r-4 border-[#FFD700] rounded-br-2xl animate-pulse-slow animation-delay-400"></div>

              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-[#00D4FF] flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#0066CC] flex items-center justify-center text-white font-extrabold text-lg shadow-lg">
                  3
                </span>
                Data Security
              </h3>
              <div className="space-y-4 text-lg md:text-xl text-[#2C3E50] leading-relaxed pl-13">
                <p>
                  At Global Innovator Olympiad (GIO), we prioritize the utmost
                  precautions to secure your data. While stringent measures
                  enhance security, it's important to note our limited control
                  over the internet's digital transmission medium. Therefore,
                  any information transferred to us is at your own risk.
                </p>
                <p>
                  Upon receiving your data, we are committed to its security,
                  employing cutting-edge technology, regularly upgrading our
                  digital infrastructure, and implementing restricted access
                  protocols. All information is stored on GIO secured servers.
                </p>
              </div>
            </div>

            {/* Online Forums */}
            <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl border-3 border-[#0066CC]/20 shadow-xl hover:shadow-2xl transition-all duration-500 animate-fade-in-up animation-delay-700 group">
              <div className="absolute -top-3 -left-3 w-10 h-10 border-t-4 border-l-4 border-[#FFD700] rounded-tl-2xl animate-pulse-slow"></div>
              <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-4 border-r-4 border-[#00D4FF] rounded-br-2xl animate-pulse-slow animation-delay-400"></div>

              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-[#0066CC] flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0066CC] to-[#4D9FFF] flex items-center justify-center text-white font-extrabold text-lg shadow-lg">
                  4
                </span>
                Online Forums and Information Use
              </h3>
              <div className="space-y-4 text-lg md:text-xl text-[#2C3E50] leading-relaxed pl-13">
                <p>
                  The GIO website features online forums where providing
                  personal information is necessary for services like
                  registrations, payments, and surveys. By submitting the form,
                  you consent to GIO storing and using the information for
                  specified purposes.
                </p>
                <p>
                  Your participation not only enriches engagement but also
                  signifies agreement to responsible information use. We value
                  your trust and are committed to handling your data with the
                  utmost care and in line with our privacy policies.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom decorative element */}
          <div className="mt-16 flex justify-center animate-fade-in animation-delay-800">
            <div className="flex gap-2">
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className={`w-3 h-1 rounded-full ${
                    i % 3 === 0
                      ? "bg-[#0066CC]"
                      : i % 3 === 1
                      ? "bg-[#FFD700]"
                      : "bg-[#00D4FF]"
                  } animate-pulse-slow`}
                  style={{ animationDelay: `${i * 150}ms` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;
