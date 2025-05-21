import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Loader2 } from 'lucide-react';

import DLF_Logo from '../assets/companylogos/DLF_logo.svg';
import HeroSvg from '../assets/companylogos/HeroSvg.svg';
import logo from '../assets/companylogos/logo.svg';

const companies = [
  {
    name: '5DVDC',
    caption: 'Industry-leading design and engineering software.',
    url: 'https://5dvdc.example.com',
    logo: logo,
  },
  {
    name: 'DLF',
    caption: 'Solutions for infrastructure and construction.',
    url: 'https://dlf.example.com',
    logo: DLF_Logo,
  },
  {
    name: 'Company 3',
    caption: 'Connecting physical and digital worlds.',
    url: 'https://sample.example.com',
    logo: HeroSvg,
  },
];

export default function CompanyGrid() {
  const [loadingIndex, setLoadingIndex] = useState(null);

  const handleRedirect = (url, index) => {
    setLoadingIndex(index);
    setTimeout(() => {
      window.open(url, '_blank');
      setLoadingIndex(null);
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-grow pt-32 px-6 py-16 max-w-screen-2xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
          Choose Company
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {companies.map((company, index) => (
            <div
              key={company.name}
              className="bg-white p-10 rounded-2xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1 flex flex-col justify-between items-center h-full"
            >
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 mb-6 rounded-full overflow-hidden border-2 border-gray-300">
                  <img
                    src={company.logo}
                    alt={`${company.name} logo`}
                    className="object-cover w-ffull h-full"
                  />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
                  {company.name}
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  {company.caption}
                </p>
              </div>
              <button
                onClick={() => handleRedirect(company.url, index)}
                disabled={loadingIndex === index}
                className={`w-full py-3 rounded-md text-white font-medium transition-all ${
                  loadingIndex === index
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-black hover:bg-gray-800'
                }`}
              >
                {loadingIndex === index ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin w-5 h-5" />
                    Redirecting...
                  </div>
                ) : (
                  'Choose Company'
                )}
              </button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
