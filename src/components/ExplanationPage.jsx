import React from 'react';
import { Link } from 'react-router-dom';

const ExplanationPage = () => {

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

            {/* Bouton Créer votre profil */}
            <Link to="/personal-info">
              <button className="profile-button">
                Créer votre profil
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplanationPage;
