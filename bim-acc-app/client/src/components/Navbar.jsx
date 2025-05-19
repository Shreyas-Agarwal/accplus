// import { useState } from "react";
// import { ChevronDown } from "lucide-react";
// import logo from "../assets/logo.svg";

// const Navbar = () => {
//   const [openMenu, setOpenMenu] = useState(null);

//   const toggleMenu = (menu) => {
//     setOpenMenu(openMenu === menu ? null : menu);
//   };

//   return (
//     <nav className="w-full flex items-center justify-between px-8 py-4 bg-white fixed top-0 z-50">
//       {/* Logo */}
//       <div className="flex items-center">
//         <img src={logo} alt="Company Logo" className="h-10 w-auto" />
//       </div>

//       {/* Menu */}
//       <ul className="flex space-x-8 text-gray-800 font-medium relative">
//         {/* Products */}
//         <li className="relative">
//           <button
//             onClick={() => toggleMenu("products")}
//             className="flex items-center gap-1 hover:text-orange-500"
//           >
//             Products <ChevronDown size={16} />
//           </button>
//           {openMenu === "products" && (
//             <ul className="absolute top-full mt-2 w-40 bg-white border rounded shadow-lg">
//               <li className="px-4 py-2 hover:bg-gray-100">BIM Assessment</li>
//               <li className="px-4 py-2 hover:bg-gray-100">ACC Notifications</li>
//             </ul>
//           )}
//         </li>

//         {/* About */}
//         <li className="relative">
//           <button
//             onClick={() => toggleMenu("about")}
//             className="flex items-center gap-1 hover:text-orange-500"
//           >
//             About <ChevronDown size={16} />
//           </button>
//           {openMenu === "about" && (
//             <ul className="absolute top-full mt-2 w-40 bg-white border rounded shadow-lg">
//               <li className="px-4 py-2 hover:bg-gray-100">Company</li>
//               <li className="px-4 py-2 hover:bg-gray-100">Technology</li>
//               <li className="px-4 py-2 hover:bg-gray-100">Gallery</li>
//             </ul>
//           )}
//         </li>

//         {/* Contact */}
//         <li>
//           <a href="#contact" className="hover:text-orange-500">
//             Contact
//           </a>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;

/* Responsive Version */

// src/components/Navbar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-[#06265a] text-2xl font-bold">
          5DVDC Services
        </Link>

        {/* Hamburger for Mobile */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-800 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <div className={`md:flex space-x-8 text-[#06265a] font-medium ${menuOpen ? 'block' : 'hidden'} md:block`}>
          <div className="relative group">
            <button className="hover:text-blue-700">Products</button>
            {/* Dropdown */}
            <div className="absolute hidden group-hover:block bg-white shadow-md mt-2 p-2 rounded w-40">
              <Link to="#" className="block px-4 py-2 hover:bg-gray-100">BIM Assessment</Link>
              <Link to="#" className="block px-4 py-2 hover:bg-gray-100">ACC Notifications</Link>
            </div>
          </div>
          <div className="relative group">
            <button className="hover:text-blue-700">About</button>
            <div className="absolute hidden group-hover:block bg-white shadow-md mt-2 p-2 rounded w-40">
              <Link to="#" className="block px-4 py-2 hover:bg-gray-100">Company</Link>
              <Link to="#" className="block px-4 py-2 hover:bg-gray-100">Team</Link>
              <Link to="#" className="block px-4 py-2 hover:bg-gray-100">Gallery</Link>
            </div>
          </div>
          <Link to="#contact" className="hover:text-blue-700">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
