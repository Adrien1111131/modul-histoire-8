import React from 'react';
import { useNavigate } from 'react-router-dom';
import myDesireLogo from '/logo1.png';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-[#e0c29b] via-[#d5b394] to-[#b39274] backdrop-blur-sm shadow-md border-b border-[#d5b394]/30 p-4 flex justify-between items-center transition-all duration-300 ease-in-out">
      <div className="flex items-center">
        <button 
          onClick={() => navigate('/home')}
          className="mr-4 text-white hover:text-white/80 transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div className="flex items-center">
          <div className="h-12 w-12 mr-3">
            <img src={myDesireLogo} alt="MyDesire Logo" className="h-full w-full object-contain" />
          </div>
          <div className="text-xl font-bold tracking-wide text-white">
            My<span className="text-red-200">Desire</span>.now
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
