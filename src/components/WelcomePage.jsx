import React from 'react';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen">

      {/* Section d'en-tête avec dégradé */}
      <div className="w-full py-4 px-6 flex justify-end" style={{ background: 'linear-gradient(to right, #d5b394 0%, #c0a081 100%)' }}>
        <span className="font-serif text-xl">
          <span className="text-white">My</span>
          <span className="text-red-600">Desire</span>
          <span className="text-white">.now</span>
        </span>
      </div>

      <div className="w-full max-w-md mx-auto rounded-lg overflow-hidden shadow-2xl relative z-10 mt-0">
        <div className="text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center px-8 py-10">
            <h1 className="font-playfair text-[30px] font-bold mb-4 text-center text-amber-100 drop-shadow-lg tracking-normal leading-normal">
              Bienvenue
            </h1>

            {/* Logo MyDesire.now */}
            <div className="mb-8 font-playfair text-[30px] font-normal text-center tracking-normal leading-normal">
              <span className="text-[#FFE1BE]">My</span>
              <span className="text-red-600">Desire</span>
              <span className="text-[#FFE1BE]">.now</span>
            </div>

            {/* Texte de bienvenue */}
            <div className="text-center mb-12">
              <p className="font-playfair text-[18px] font-normal leading-normal tracking-normal text-[#FFE1BE]">
                Bienvenue dans MyDesire.now,
                votre espace intime où vos
                fantasmes prennent vie. Laissez-
                vous emporter par des histoires
                audio érotiques personnalisées,
                conçues pour éveiller vos sens et
                sublimer vos désirs. Plongez
                dans une expérience unique,
                créée rien que pour vous.
              </p>
            </div>

            {/* Icône flèche vers le bas */}
            <Link to="/explanation">
              <div 
                className="w-16 h-16 rounded-full bg-gray-700/60 flex items-center justify-center cursor-pointer hover:bg-gray-600/70 transition-colors duration-300 mt-8"
                style={{ cursor: 'pointer' }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-8 w-8 text-amber-200"
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
