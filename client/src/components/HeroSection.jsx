// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const HeroSection = () => {
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   return (
//     <div
//       className="w-full relative flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 min-h-screen"
//     >
//       {/* Gradient Overlay */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="w-full h-full bg-gradient-to-tr from-black/20 via-transparent to-transparent"></div>
//       </div>

//       {/* Content */}
//       <div
//         className={`max-w-4xl text-center z-10 transition-all duration-1000 ease-out ${
//           isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
//         }`}
//       >
//         <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black leading-tight">
//           Build Smarter. <span className="text-gray-700">Stay Notified.</span>
//         </h1>
//         <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
//           Get instant alerts from <span className="text-primary font-bold">Autodesk Construction Cloud</span> to streamline your construction workflow. One place. All updates. Effortless awareness.
//         </p>

//         <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-4">
//           <Link to="/acc-notifications">
//             <button className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base text-black font-medium rounded-md hover:shadow-md hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-2">
//               Get Started
//               <span className="transition-colors duration-300">&#8594;</span>
//             </button>
//           </Link>
//           <button className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base border border-black text-black font-medium rounded-md hover:bg-black hover:text-white transition-colors duration-300">
//             Learn More
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;





import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="w-full relative flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 min-h-screen">
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-tr from-black/20 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div
        className={`max-w-4xl text-center z-10 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black leading-tight">
          Build Smarter. <span className="text-black/50">Stay Notified.</span>
        </h1>
        <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
          Get instant alerts from <span className="text-gray-700 font-bold">Autodesk Construction Cloud</span> to streamline your construction workflow. One place. All updates. Effortless awareness.
        </p>

        {/* Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-row flex-wrap justify-center gap-4">
          <Link to="/company-grid">
            <button className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base text-black font-medium rounded-md hover:shadow-md hover:bg-black hover:text-white transition-all duration-300 flex items-center gap-2">
              Get Started
              <span className="transition-colors duration-300">&#8594;</span>
            </button>
          </Link>
          <button className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base border border-black text-black font-medium rounded-md hover:bg-black hover:text-white transition-colors duration-300">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
