// import React, { useState, useEffect } from 'react';
// import { Menu, X, ChevronDown } from 'lucide-react';
// import logo from '../assets/logo.svg'; 
// import whiteLogo from '../assets/2.svg';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 20) {
//         setScrolled(true);
//       } else {
//         setScrolled(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-transparent backdrop-blur-md py-2' : 'bg-transparent py-4'}`}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           <div className="flex-shrink-0 flex items-center">
//             <a href="/" className="text-primary-900 font-bold text-2xl">
//               <img src={logo} alt="logo" className='h-12 w-auto' />
//             </a>
//           </div>

//           {/* Desktop menu */}
//           <div className="hidden md:block">
//             <div className="ml-10 flex items-center space-x-8">
//               <NavDropdown 
//                 title="Products" 
//                 items={[
//                   { label: "Product 1", href: "/products/1" },
//                   { label: "Product 2", href: "/products/2" },
//                   { label: "Product 3", href: "/products/3" }
//                 ]} 
//               />
//               <NavDropdown 
//                 title="About" 
//                 items={[
//                   { label: "Our Story", href: "/about/story" },
//                   { label: "Team", href: "/about/team" },
//                   { label: "Careers", href: "/about/careers" }
//                 ]}  
//               />
//               <a href="#contact" className="px-1 pt-1 text-gray-800 font-medium hover:text-gray-900 transition-colors">
//                 Contact Us
//               </a>
//             </div>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-900 focus:outline-none"
//             >
//               {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
// <div className={`md:hidden transition-all duration-300 ease-in-out fixed top-16 right-0 z-40 ${isOpen ? 'w-2/3 max-h-[500px] opacity-100' : 'w-0 max-h-0 opacity-0 overflow-hidden'} h-screen`}>
//   <div
//     className="h-full w-full px-4 pt-6 pb-10 space-y-2 bg-white/90 backdrop-blur-md shadow-xl transition-all duration-300"
//     style={{
//       background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(204,204,204,0.95))',
//     }}
//   >
//     <MobileNavItem 
//       title="Products" 
//       items={[
//         { label: "Product 1", href: "/products/1" },
//         { label: "Product 2", href: "/products/2" },
//         { label: "Product 3", href: "/products/3" }
//       ]} 
//     />
//     <MobileNavItem 
//       title="About" 
//       items={[
//         { label: "Our Story", href: "/about/story" },
//         { label: "Team", href: "/about/team" },
//         { label: "Careers", href: "/about/careers" }
//       ]} 
//     />
//     <a href="#contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900">
//       Contact
//     </a>
//   </div>
// </div>

//     </nav>
//   );
// };

// const NavDropdown = ({ title, items }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = React.useRef(null);

//   const handleTitleClick = (e) => {
//     setIsOpen(!isOpen);
//     e.preventDefault();
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button 
//         onClick={handleTitleClick}
//         className="group inline-flex items-center px-1 pt-1 text-gray-800 font-medium hover:text-gray-900 transition-colors"
//       >
//         {title}
//         <ChevronDown className={`ml-1 h-4 w-4 group-hover:text-gray-900 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
//       </button>

//       <div className={`absolute z-10 -ml-4 mt-2 w-48 rounded-md bg-transparent  transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
//         <div className="py-1">
//           {items.map((item, index) => (
//             <a 
//               key={index} 
//               href={item.href} 
//               className="block px-4 py-2 text-sm text-gray-600 hover:bg-transparent hover:text-gray-900"f
//             >
//               {item.label}
//             </a>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const MobileNavItem = ({ title, items }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleTitleClick = (e) => {
//     setIsOpen(!isOpen);
//     e.preventDefault();
//   };

//   return (
//     <div>
//       <button
//         onClick={handleTitleClick}
//         className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-gray-900"
//       >
//         {title}
//         <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
//       </button>

//       <div className={`pl-4 transition-all duration-200 ease-in-out ${isOpen ? 'max-h-36 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
//         {items.map((item, index) => (
//           <a 
//             key={index} 
//             href={item.href} 
//             className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900"
//           >
//             {item.label}
//           </a>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Navbar;



import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import logo from '../assets/logo.svg'; 
import whiteLogo from '../assets/2.svg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-transparent backdrop-blur-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Hamburger menu on the left (mobile) */}
          <div className="md:hidden order-1">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>

          {/* Logo on the right (mobile), left on desktop */}
          <div className="flex-shrink-0 flex items-center order-2 md:order-1 ml-auto md:ml-0">
            <a href="/" className="text-primary-900 font-bold text-2xl">
              <img src={logo} alt="logo" className='h-12 w-auto' />
            </a>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block order-3">
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
                  { label: "Our Story", href: "/about/story" },
                  { label: "Team", href: "/about/team" },
                  { label: "Careers", href: "/about/careers" }
                ]}  
              />
              <a href="#contact" className="px-1 pt-1 text-gray-800 font-medium hover:text-gray-900 transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu from left */}
      <div className={`md:hidden fixed top-16 left-0 z-40 transition-all duration-300 ease-in-out ${isOpen ? 'w-2/3 max-h-[500px] opacity-100' : 'w-0 max-h-0 opacity-0 overflow-hidden'} h-screen`}>
        <div
          className="h-full w-full px-4 pt-6 pb-10 space-y-2 bg-white/90 backdrop-blur-md shadow-xl transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(204,204,204,0.95))',
          }}
        >
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
          <a href="#contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

const NavDropdown = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef(null);

  const handleTitleClick = (e) => {
    setIsOpen(!isOpen);
    e.preventDefault();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={handleTitleClick}
        className="group inline-flex items-center px-1 pt-1 text-gray-800 font-medium hover:text-gray-900 transition-colors"
      >
        {title}
        <ChevronDown className={`ml-1 h-4 w-4 group-hover:text-gray-900 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <div className={`absolute z-10 -ml-4 mt-2 w-48 rounded-md bg-transparent transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
        <div className="py-1">
          {items.map((item, index) => (
            <a 
              key={index} 
              href={item.href} 
              className="block px-4 py-2 text-sm text-gray-600 hover:bg-transparent hover:text-gray-900"
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
    setIsOpen(!isOpen);
    e.preventDefault();
  };

  return (
    <div>
      <button
        onClick={handleTitleClick}
        className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-gray-900"
      >
        {title}
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <div className={`pl-4 transition-all duration-200 ease-in-out ${isOpen ? 'max-h-36 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        {items.map((item, index) => (
          <a 
            key={index} 
            href={item.href} 
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900"
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
