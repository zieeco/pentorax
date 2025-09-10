import React, { useEffect, useState } from 'react';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Floating particles component
  const FloatingParticles = () => {
    const particles = Array.from({ length: 20 }, (_, i) => (
      <div
        key={i}
        className="absolute h-2 w-2 animate-pulse rounded-full bg-blue-400 opacity-30"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${3 + Math.random() * 2}s`,
        }}
      />
    ));
    return <>{particles}</>;
  };

  // Energy flow lines component
  const EnergyFlows = () => (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Animated flowing lines */}
      <div className="absolute left-0 top-1/4 h-0.5 w-full animate-pulse bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"></div>
      <div
        className="absolute right-0 top-2/4 h-0.5 w-full animate-pulse bg-gradient-to-l from-transparent via-blue-400 to-transparent opacity-40"
        style={{ animationDelay: '1s' }}
      ></div>
      <div
        className="absolute left-0 top-3/4 h-0.5 w-full animate-pulse bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-50"
        style={{ animationDelay: '2s' }}
      ></div>

      {/* Diagonal energy flows */}
      <div className="absolute left-0 top-0 h-full w-0.5 rotate-12 transform animate-pulse bg-gradient-to-b from-transparent via-cyan-300 to-transparent opacity-30"></div>
      <div
        className="absolute right-0 top-0 h-full w-0.5 -rotate-12 transform animate-pulse bg-gradient-to-b from-transparent via-blue-300 to-transparent opacity-40"
        style={{ animationDelay: '1.5s' }}
      ></div>
    </div>
  );

  // Stats overlay component
  const StatsOverlay = () => (
    <div className="absolute right-8 top-1/4 transform rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm transition-all duration-1000 hover:scale-105">
      <div className="text-center">
        <div className="text-2xl font-bold text-cyan-300">50%</div>
        <div className="text-xs text-white/80">Energy Savings</div>
      </div>
    </div>
  );

  // const TrustBadges = () => (
  //   <div className="absolute bottom-8 left-8 flex space-x-4 opacity-80">
  //     <div className="rounded-full border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-sm">
  //       <span className="text-xs text-white">25-Year Warranty</span>
  //     </div>
  //     <div className="rounded-full border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-sm">
  //       <span className="text-xs text-white">5000+ Customers</span>
  //     </div>
  //   </div>
  // );

  return (
    <>
      <section className="relative h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-gray-800 font-sand text-white">
        {/* Background Image with Parallax Effect */}
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center bg-no-repeat"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        ></div>

        {/* Enhanced overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 via-blue-900/60 to-gray-800/70"></div>

        {/* Animated pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.6'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            animation: 'float 6s ease-in-out infinite',
          }}
        ></div>

        {/* Floating Particles */}
        <FloatingParticles />

        {/* Energy Flow Effects */}
        <EnergyFlows />

        {/* Stats Overlay */}
        <StatsOverlay />

        {/* Trust Badges */}
        {/* <TrustBadges /> */}

        <div className="container relative z-10 mx-auto flex h-full items-center px-4 sm:px-6 lg:px-8">
          <div className="flex w-full flex-col items-center lg:flex-row">
            <div
              className={`transform text-center transition-all duration-1000 lg:w-1/2 lg:text-left ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              <h1 className="mb-6 font-sand text-4xl font-semibold leading-tight md:text-5xl lg:text-[3rem]">
                <span className="font-extrabold">
                  Together, Powering a Sustainable
                  Energy Future
                </span>{' '}
                <br></br>
                <span className="animate-pulse bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  with Optimal Benefits
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg text-gray-200 md:text-xl lg:mx-0">
                Enjoy 24/7 uninterrupted power with top-quality and reliable
                solar solutions.
              </p>

              {/* Enhanced feature list */}
              {/* <div className="mt-6 flex flex-wrap justify-center gap-4 lg:justify-start">
              <div className="flex items-center space-x-2 rounded-full bg-white/10 px-3 py-1 backdrop-blur-sm">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
                <span className="text-sm">Zero Down Payment</span>
              </div>
              <div className="flex items-center space-x-2 rounded-full bg-white/10 px-3 py-1 backdrop-blur-sm">
                <div className="h-2 w-2 animate-pulse rounded-full bg-blue-400"></div>
                <span className="text-sm">Tax Credits Available</span>
              </div>
            </div> */}

              <div className="mt-8">
                <a
                  href="#"
                  className="group relative inline-flex transform items-center space-x-3 overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 text-lg font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-cyan-600 hover:shadow-cyan-500/25"
                >
                  <span className="relative z-10">Get A Free Quote Today</span>
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-white transition-transform duration-300 group-hover:rotate-90">
                    <div className="h-2 w-2 transform bg-white transition-transform duration-300 group-hover:scale-150"></div>
                  </div>

                  {/* Animated background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
                </a>
              </div>

              {/* Urgency message */}
              {/* <p className="mt-4 animate-pulse text-sm text-cyan-300">
              ⚡ Limited time: 30% Federal Tax Credit expires soon
            </p> */}
            </div>
          </div>
        </div>
      </section>

      {/* <div
        className={`absolute right-8 top-[82%] z-10 mb-10 flex transform justify-center transition-all delay-300 duration-1000 lg:mt-0 lg:w-1/2 lg:justify-end ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
      >
        <div className="group relative">
          Glowing border effect
          <div className="rounded-lgd bg-gradiesnt-to-r from-scyan-500 to-blsue-500 absolute inset-0 animate-pulse opacity-75 blur transition-all duration-300 group-hover:opacity-100" />

          <img
            src="/public/black-solar.png"
            alt="Modern Solar Installation"
            className="roundedd-lg shadfow-2xl relative w-full max-w-md transform transition-all duration-500 group-hover:scale-105"
          />

          Interactive overlay on image
          <div className="rounded-lgs bg-grsadient-to-t from-sblue-900/50 to-trasnsparent absolute inset-0 flex items-end justify-center p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">$0</div>
              <div className="text-sm text-cyan-300">pentorax</div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Hero;
