
// /* Color-Text #06265a */

// const HeroSection = () => {
//   return (
//     <>
//       {/* Hero Section */}
//       <section className="min-h-screen flex items-center justify-center px-8 pt-24">
//         <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//           {/* Left Side – Hero Text */}
//           <div>
//             <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
//               Welcome to <span style={{ color: '#06265a' }}>BIM ACC App</span>
//             </h1>
//             <p className="text-lg text-gray-700">
//               Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur quas exercitationem debitis tempora maxime quaerat! Ipsum illum voluptate cumque saepe.
//             </p>
//           </div>

//           {/* Right Side – Image Placeholder */}
//           <div className="w-full aspect-square bg-white rounded-xl shadow-md flex items-center justify-center border border-dashed border-gray-300">
//             <span className="text-gray-400 text-sm">[Custom Image Here]</span>
//           </div>
//         </div>
//       </section>

//       {/* Dual Column Section (Vertically Divided) */}
//       <section className="w-full px-8 py-20 bg-gray-100">
//         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

//           <div className="bg-white p-8 rounded-lg shadow-md text-center">
//             <h2 className="text-2xl font-semibold text-[#06265a] mb-4">BIM Maturity Test</h2>
//             <p className="text-gray-700 mb-6">
//              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa voluptatem, in facilis optio consectetur ipsum.
//             </p>
//             <button className="bg-[#06265a] text-white px-6 py-2 rounded hover:bg-blue-900 transition">
//               Take Assessment
//             </button>
//           </div>

//           <div className="bg-white p-8 rounded-lg shadow-md text-center">
//             <h2 className="text-2xl font-semibold text-[#06265a] mb-4">ACC Notifications</h2>
//             <p className="text-gray-700 mb-6">
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, minus?
//             </p>
//             <button className="bg-[#06265a] text-white px-6 py-2 rounded hover:bg-blue-900 transition">
//               Login
//             </button>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default HeroSection;







// src/components/HeroSection.jsx
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-32 bg-white">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side – Hero Text */}
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Welcome to <span style={{ color: '#06265a' }}>BIM ACC App</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-700">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur quas exercitationem debitis tempora maxime quaerat!
            </p>
          </div>

          {/* Right Side – Image Placeholder */}
          <div className="w-full aspect-square bg-white rounded-xl shadow-md flex items-center justify-center border border-dashed border-gray-300">
            <span className="text-gray-400 text-sm">[Custom Image Here]</span>
          </div>
        </div>
      </section>

      <section className="w-full px-6 py-20 bg-gray-100 space-y-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* BIM Maturity Test */}
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold text-[#06265a] mb-4">BIM Maturity Test</h2>
          <p className="text-gray-700 mb-6">Assess your BIM proficiency and maturity level using our tailored tool.</p>
          <Link to="/bim-maturity">
          <button className="bg-[#06265a] text-white px-6 py-2 rounded hover:bg-blue-900 transition">
            Take Assessment
          </button>
          </Link>
        </div>

        {/* ACC Notifications */}
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold text-[#06265a] mb-4">ACC Notifications</h2>
          <p className="text-gray-700 mb-6">Log in to view Autodesk Construction Cloud notifications and alerts.</p>
          <Link to="/acc-notifications">
            <button className="bg-[#06265a] text-white px-6 py-2 rounded hover:bg-blue-900 transition">
              Login
            </button>
          </Link>
        </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;


