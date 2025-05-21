// // src/components/FeatureCards.jsx
// import React, { useState, useEffect } from 'react';
// import { LogIn, CheckCircle } from 'lucide-react';

// const FeatureCards = () => {
//   const [isVisible, setIsVisible] = useState(false);
  
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 300) {
//         setIsVisible(true);
//       }
//     };
    
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);
  
//   return (
//     <div className="py-16 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* BIM Maturity Test Card */}
//           <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//             <div className="p-8">
//               <h2 className="text-2xl font-bold text-center mb-4">
//                 <span className="text-blue-800">BIM</span> Maturity Test
//               </h2>
//               <p className="text-center text-gray-600 mb-8">
//                 Assess your BIM proficiency and maturity level using our tailored tool.
//               </p>
//               <div className="flex justify-center">
//                 <button className="px-6 py-2 bg-blue-900 text-white font-medium rounded-md hover:bg-blue-800 transition-colors flex items-center">
//                   <CheckCircle className="mr-2 h-4 w-4" />
//                   Take Assessment
//                 </button>
//               </div>
//             </div>
//           </div>
          
//           {/* ACC Notifications Card */}
//           <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//             <div className="p-8">
//               <h2 className="text-2xl font-bold text-center mb-4">
//                 <span className="text-blue-800">ACC</span> Notifications
//               </h2>
//               <p className="text-center text-gray-600 mb-8">
//                 Log in to view Autodesk Construction Cloud notifications and alerts.
//               </p>
//               <div className="flex justify-center">
//                 <button className="px-6 py-2 bg-blue-900 text-white font-medium rounded-md hover:bg-blue-800 transition-colors flex items-center">
//                   <LogIn className="mr-2 h-4 w-4" />
//                   Login
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeatureCards;



import React, { useRef, useState, useEffect } from 'react';
import { LogIn, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeatureCards = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* BIM Maturity Test Card */}
          <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-center mb-4">
                BIM Maturity Test
              </h2>
              <p className="text-center text-gray-600 mb-8">
                Assess your BIM proficiency and maturity level using our tailored tool.
              </p>
              <div className="flex justify-center">
                <button className="px-6 py-2 bg-blue-900 text-white font-medium rounded-md hover:bg-blue-800 transition-colors flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Take Assessment
                </button>
              </div>
            </div>
          </div>

          {/* ACC Notifications Card */}
          <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-center mb-4">
                ACC Notifications
              </h2>
              <p className="text-center text-gray-600 mb-8">
                Log in to view Autodesk Construction Cloud notifications and alerts.
              </p>
              <div className="flex justify-center">
                <Link to="/acc-notifications">
                <button className="px-6 py-2 bg-blue-900 text-white font-medium rounded-md hover:bg-blue-800 transition-colors flex items-center">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCards;
