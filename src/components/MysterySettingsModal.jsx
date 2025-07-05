import React, { useState } from 'react';
import ReadingTimeSlider from './ReadingTimeSlider';
import EroticismLevelSlider from './EroticismLevelSlider';

const MysterySettingsModal = ({ initialReadingTime = 2, initialEroticismLevel = 2, onClose, onSubmit }) => {
  const [readingTime, setReadingTime] = useState(initialReadingTime);
  const [eroticismLevel, setEroticismLevel] = useState(initialEroticismLevel);

  const handleSubmit = () => {
    onSubmit({ readingTime, eroticismLevel });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-md transition-all duration-500 animate-fadeIn">
      <div className="bg-gradient-to-r from-[#e0c29b] via-[#d5b394] to-[#b39274] rounded-lg p-6 max-w-md w-full mx-4 border border-[#d5b394]/30 shadow-xl backdrop-blur-sm transform transition-all duration-500 animate-slideIn">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-light tracking-wide text-white mb-3 drop-shadow-lg">Paramètres de l'histoire</h3>
          <p className="text-white/90 text-base font-light">Personnalisez votre expérience mystérieuse</p>
        </div>
        
        <div className="space-y-6">
          {/* Curseur de temps de lecture */}
          <div>
            <h4 className="text-lg font-light tracking-wide text-white/95 mb-3">Temps de lecture</h4>
            <ReadingTimeSlider 
              value={readingTime}
              onChange={setReadingTime}
            />
          </div>

          {/* Curseur de niveau d'érotisme */}
          <div>
            <h4 className="text-lg font-light tracking-wide text-white/95 mb-3">Niveau d'érotisme</h4>
            <EroticismLevelSlider 
              value={eroticismLevel}
              onChange={setEroticismLevel}
            />
          </div>
        </div>
        
        <div className="flex justify-between mt-8">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all duration-300 border border-white/10"
          >
            Annuler
          </button>
          
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-all duration-300 border border-white/10 font-medium"
          >
            Lancer l'histoire
          </button>
        </div>
      </div>
    </div>
  );
};

export default MysterySettingsModal;
