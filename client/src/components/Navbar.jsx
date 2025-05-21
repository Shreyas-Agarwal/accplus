

// /* Responsive Version */

// // src/components/Navbar.jsx
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import logo from '../assets/logo.svg'; 
// import whiteLogo from '../assets/2.svg';

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <nav className="bg-white shadow-md fixed top-0 w-full z-50">
//       <div className="max-w-7xl mx-auto px-4 py-4  flex justify-between items-center">
//         {/* Logo */}
//         <img src={logo} alt="logo " className='h-10 w-auto'/>
//         <Link to="/" className="text-[#06265a] text-2xl font-bold">
        
//         </Link>

//         {/* Hamburger for Mobile */}
//         <div className="md:hidden">
//           <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-800 focus:outline-none">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//               {menuOpen ? (
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//               ) : (
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//               )}
//             </svg>
//           </button>
//         </div>

//         {/* Menu Items */}
//         <div className={`md:flex space-x-8 text-[#06265a] font-medium ${menuOpen ? 'block' : 'hidden'} md:block`}>
//           <div className="relative group">
//             <button className="hover:text-blue-700">Products</button>
//             {/* Dropdown */}
//             <div className="absolute hidden group-hover:block bg-white shadow-md mt-2 p-2 rounded w-40">
//               <Link to="#" className="block px-4 py-2 hover:bg-gray-100">BIM Assessment</Link>
//               <Link to="#" className="block px-4 py-2 hover:bg-gray-100">ACC Notifications</Link>
//             </div>
//           </div>
//           <div className="relative group">
//             <button className="hover:text-blue-700">About</button>
//             <div className="absolute hidden group-hover:block bg-white shadow-md mt-2 p-2 rounded w-40">
//               <Link to="#" className="block px-4 py-2 hover:bg-gray-100">Company</Link>
//               <Link to="#" className="block px-4 py-2 hover:bg-gray-100">Team</Link>
//               <Link to="#" className="block px-4 py-2 hover:bg-gray-100">Gallery</Link>
//             </div>
//           </div>
//           <Link to="#contact" className="hover:text-blue-700">Contact</Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import logo from '../assets/logo.svg'; 
import whiteLogo from '../assets/2.svg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-2' : 'bg-white py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="text-blue-900 font-bold text-2xl">
              <img src={logo} alt="logo" className='h-12 w-auto' />
            </a>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <NavDropdown 
                title="Products" 
                items={[
                  { label: "Product 1", href: "/products/1" },
                  { label: "Product 2", href: "/products/2" },
                  { label: "Product 3", href: "/products/3" }
                ]} 
              />
              <NavDropdown 
                title="About" 
                items={[
                  { label: "Our Story", href: "/about/story" }, // Create story page
                  { label: "Team", href: "/about/team" }, // Create team page
                  { label: "Careers", href: "/about/careers" } //Create careers page
                ]}  
              />
              <a href="#contact" className="px-1 pt-1 text-blue-900 font-medium hover:text-blue-600 transition-colors">
                Contact Us
              </a>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-blue-900 hover:text-blue-800 hover:bg-blue-100 focus:outline-none"
              aria-expanded="false"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          <MobileNavItem 
            title="Products" 
            items={[
              { label: "Product 1", href: "/products/1" },
              { label: "Product 2", href: "/products/2" },
              { label: "Product 3", href: "/products/3" }
            ]} 
          />
          <MobileNavItem 
            title="About" 
            items={[
              { label: "Our Story", href: "/about/story" },
              { label: "Team", href: "/about/team" },
              { label: "Careers", href: "/about/careers" }
            ]} 
          />
          <a href="#contact" className="block px-3 py-2 rounded-md text-base font-medium text-blue-900 hover:bg-blue-50">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

const NavDropdown = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleTitleClick = (e) => {
    // Toggle dropdown on click
    setIsOpen(!isOpen);
    e.preventDefault();
  };
  
  // Using useEffect and a ref to close when clicking outside
  const dropdownRef = React.useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={handleTitleClick}
        className="group inline-flex items-center px-1 pt-1 text-blue-900 font-medium hover:text-blue-600 transition-colors"
      >
        {title}
        <ChevronDown className={`ml-1 h-4 w-4 group-hover:text-blue-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <div className={`absolute z-10 -ml-4 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
        <div className="py-1">
          {items.map((item, index) => (
            <a 
              key={index} 
              href={item.href} 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const MobileNavItem = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleTitleClick = (e) => {
    // Toggle the dropdown and prevent navigation
    setIsOpen(!isOpen);
    e.preventDefault();
  };
  
  return (
    <div>
      <button
        onClick={handleTitleClick}
        className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-blue-900 hover:bg-blue-50"
      >
        {title}
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <div className={`pl-4 transition-all duration-200 ease-in-out ${isOpen ? 'max-h-36 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        {items.map((item, index) => (
          <a 
            key={index} 
            href={item.href} 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-800"
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Navbar;