// import React, { useState } from 'react';
// import { ChevronDown, ChevronUp } from 'lucide-react';

// const companies = ['Company 1', 'Company 2', 'Company 3'];

// const CompanySelect = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedCompany, setSelectedCompany] = useState(null);

//   const toggleDropdown = () => setIsOpen(!isOpen);

//   const handleSelect = (company) => {
//     setSelectedCompany(company);
//     setIsOpen(false);
//   };

//   const handleSubmit = () => {
//     if (selectedCompany) {
//       alert(`You selected: ${selectedCompany}`);
//       // You can redirect or send data to backend here
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
//       <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md transition duration-500 ease-in-out">
//         <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Select Your Company</h2>

//         {/* Selected Company Display */}
//         {selectedCompany && (
//           <div className="mb-4 text-center text-gray-700 font-medium">
//             Selected: <span className="text-gray-900">{selectedCompany}</span>
//           </div>
//         )}

//         {/* Dropdown */}
//         <div className="relative">
//           <button
//             onClick={toggleDropdown}
//             className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg shadow-sm flex justify-between items-center transition duration-300 hover:bg-gray-300"
//           >
//             {selectedCompany || 'Choose a company'}
//             {isOpen ? <ChevronUp className="ml-2 w-5 h-5" /> : <ChevronDown className="ml-2 w-5 h-5" />}
//           </button>

//           <div
//             className={`absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-md transform transition-all duration-300 origin-top ${
//               isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'
//             }`}
//           >
//             {companies.map((company) => (
//               <div
//                 key={company}
//                 className="cursor-pointer px-4 py-3 text-gray-800 hover:bg-gray-100 transition-colors"
//                 onClick={() => handleSelect(company)}
//               >
//                 {company}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Submit Button */}
//         <div className="mt-6">
//           <button
//             onClick={handleSubmit}
//             disabled={!selectedCompany}
//             className={`w-full py-3 rounded-md font-medium transition-colors ${
//               selectedCompany
//                 ? 'bg-gray-800 text-white hover:bg-gray-700'
//                 : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//             }`}
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompanySelect;




import Navbar from '../components/Navbar';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Footer from '../components/Footer';

const companies = ['Company 1', 'Company 2', 'Company 3'];


const CompanySelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (company) => {
    setSelectedCompany(company);
    setIsOpen(false);
  };

  const handleSubmit = () => {
    if (!selectedCompany) return;

    setIsSubmitting(true);
    setTimeout(() => {
      alert(`You selected: ${selectedCompany}`);
      setIsSubmitting(false);
    }, 500);
  };

  return (
        <div className="min-h-screen bg-gray-50">
      {/* Navbar added here */}
      <Navbar />

    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md transition duration-500 ease-in-out">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Select Your Company</h2>

        {selectedCompany && (
          <div className="mb-4 text-center text-gray-700 font-medium">
            Selected: <span className="text-gray-900">{selectedCompany}</span>
          </div>
        )}

        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg shadow-sm flex justify-between items-center transition duration-300 hover:bg-gray-300"
          >
            {selectedCompany || 'Choose a company'}
            {isOpen ? <ChevronUp className="ml-2 w-5 h-5" /> : <ChevronDown className="ml-2 w-5 h-5" />}
          </button>

          <div
            className={`absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-md transform transition-all duration-300 origin-top ${
              isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'
            }`}
          >
            {companies.map((company) => (
              <div
                key={company}
                className="cursor-pointer px-4 py-3 text-gray-800 hover:bg-gray-100 transition-colors"
                onClick={() => handleSelect(company)}
              >
                {company}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleSubmit}
            disabled={!selectedCompany || isSubmitting}
            className={`w-full py-3 rounded-md font-medium flex items-center justify-center transition-colors ${
              selectedCompany && !isSubmitting
                ? 'bg-blue-800 text-white hover:bg-blue-900'
                : 'bg-gray-500 text-gray-800 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              'Submit'
            )}
          </button>
        </div>
      </div>
    </div>
    <Footer />
    </div>
    
  );
};

export default CompanySelect;
