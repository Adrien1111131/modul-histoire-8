import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import lipsLogo from '/logo1.png';

const SmoothScrollPage = () => {
  const explanationRef = useRef(null);
  const containerRef = useRef(null);

  // Style du bouton
  const buttonStyle = {
    color: 'white',
    background: 'linear-gradient(135deg, #e0c29b 0%, #d5b394 50%, #c0a081 100%)',
    border: '2px solid #d5b394',
    borderRadius: '30px',
    padding: '12px 24px',
    fontWeight: '600',
    letterSpacing: '1px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
    transition: 'all 0.3s ease',
    display: 'inline-block',
    textAlign: 'center',
    cursor: 'pointer',
    minWidth: '200px'
  };

  // Fonction de défilement améliorée
  const scrollToExplanation = () => {
    if (explanationRef.current) {
      // Utiliser une approche plus directe avec window.scrollTo
      const yOffset = -60; // Ajustement pour l'en-tête
      const element = explanationRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
      
      // Méthode de secours si la première ne fonctionne pas
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

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

      {/* Conteneur principal avec défilement */}
      <div ref={containerRef} className="scroll-container w-full max-w-md mx-auto overflow-y-auto overflow-x-hidden h-[calc(100vh-60px)]" style={{ scrollbarWidth: 'none' }}>
        {/* Section d'introduction */}
        <div className="scroll-section min-h-[calc(100vh-60px)] flex flex-col items-center px-8 py-10">
          <h1 className="font-playfair text-[30px] font-bold mb-4 text-center text-amber-100 drop-shadow-lg tracking-normal leading-normal">
            Bienvenue
          </h1>

          {/* Logo Lèvres */}
          <div className="w-48 mb-6">
            <img
              src={lipsLogo}
              alt="Lips Logo"
              className="w-full h-auto"
            />
          </div>

          {/* Logo MyDesire.now */}
          <div className="mb-8 font-playfair text-[18px] font-normal text-center tracking-normal leading-normal">
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
          <div 
            className="w-16 h-16 rounded-full bg-gray-700/60 flex items-center justify-center cursor-pointer hover:bg-gray-600/70 transition-colors duration-300 mt-8 hover:scale-110 active:scale-95"
            onClick={scrollToExplanation}
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
        </div>

        {/* Section d'explication */}
        <div ref={explanationRef} className="scroll-section min-h-[calc(100vh-60px)] flex flex-col items-center px-8 py-10">
          {/* Logo MyDesire.now */}
          <div className="mb-8 font-playfair text-[18px] font-normal text-center tracking-normal leading-normal">
            <span className="text-[#FFE1BE]">My</span>
            <span className="text-red-600">Desire</span>
            <span className="text-[#FFE1BE]">.now</span>
          </div>

          {/* Texte explicatif */}
          <div className="text-center mb-12">
            <p className="font-playfair text-[18px] font-normal leading-normal tracking-normal text-[#FFE1BE]">
              Pour créer des histoires érotiques
              audio immersives parfaitement
              adaptées à vos désirs, prenez un
              moment pour compléter votre
              profil et répondre à notre test de
              personnalité sexuelle. Ces étapes
              sont essentielles pour
              personnaliser votre expérience et
              vous offrir des récits uniques qui
              résonnent avec vos envies les plus
              profondes. Commencez
              maintenant et laissez
              MyDesire.now vous emmener dans
              un voyage sur mesure !
            </p>
          </div>

          {/* Bouton Créer votre profil avec style amélioré */}
          <Link to="/personal-info">
            <button 
              style={buttonStyle}
              className="hover:scale-105 active:scale-95 transition-transform duration-300"
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.4)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Créer votre profil
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmoothScrollPage;
