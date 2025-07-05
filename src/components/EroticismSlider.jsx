import React, { useState, useEffect, useRef } from 'react';

const EroticismSlider = ({ initialValue = 2, onChange, onClose, onSubmit }) => {
  const [value, setValue] = useState(initialValue);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);
  const thumbRef = useRef(null);
  
  // Mettre à jour la valeur lorsque initialValue change
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // Calculer la position du curseur en fonction de la valeur
  const calculateThumbPosition = (val) => {
    // Convertir la valeur (1-3) en pourcentage (0-100%)
    return ((val - 1) / 2) * 100;
  };

  // Calculer la taille de la flamme en fonction de la valeur
  const calculateFlameSize = (val) => {
    // Taille de base + taille supplémentaire en fonction de la valeur
    return 24 + (val - 1) * 8; // 24px pour val=1, 32px pour val=2, 40px pour val=3
  };

  // Gérer le changement de valeur via l'input range
  const handleChange = (e) => {
    const newValue = parseFloat(e.target.value);
    updateValue(newValue);
  };

  // Mettre à jour la valeur et notifier le parent
  const updateValue = (newValue) => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  // Obtenir la description du niveau d'érotisme
  const getLevelDescription = () => {
    if (value <= 1.33) {
      return 'Doux - Sensuel et suggestif';
    } else if (value <= 2.33) {
      return 'Modéré - Plus direct et explicite';
    } else {
      return 'Brûlant - Très cru et intense';
    }
  };

  // Obtenir la couleur de fond du curseur en fonction de la valeur
  const getSliderBackground = () => {
    const percent = calculateThumbPosition(value);
    return `linear-gradient(to right, #3b82f6 0%, #ef4444 ${percent}%, #9ca3af ${percent}%, #9ca3af 100%)`;
  };

  // Gérer le début du glissement
  const handleMouseDown = (e) => {
    setIsDragging(true);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    handleMouseMove(e);
  };

  // Fonction unifiée pour gérer les mouvements (souris et tactile)
  const handleMove = (clientX) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const newValue = 1 + (x / rect.width) * 2; // Convertir la position en valeur (1-3)
      updateValue(Math.max(1, Math.min(3, newValue))); // Limiter entre 1 et 3
    }
  };

  // Gérer le mouvement de la souris pendant le glissement
  const handleMouseMove = (e) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  // Gérer la fin du glissement
  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // Gérer le clic direct sur la barre
  const handleBarClick = (e) => {
    // Traiter comme un mouvement direct
    handleMove(e.clientX);
  };

  // Gérer les événements tactiles
  const handleTouchStart = (e) => {
    setIsDragging(true);
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd);
    const touch = e.touches[0];
    handleMove(touch.clientX);
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      const touch = e.touches[0];
      handleMove(touch.clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
  };

  // Calculer la position et la taille de la flamme
  const thumbPosition = `${calculateThumbPosition(value)}%`;
  const flameSize = calculateFlameSize(value);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
      <div className="bg-amber-700/90 rounded-lg p-6 max-w-md w-full mx-4 border border-amber-500 shadow-xl">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-medium text-white mb-2">Niveau de chaleur</h3>
          <p className="text-amber-200 text-sm">Ajustez l'intensité de votre histoire</p>
        </div>
        
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white text-sm">Doux</span>
            <span className="text-white text-sm">Intense</span>
          </div>
          
          {/* Curseur personnalisé avec flamme */}
          <div 
            ref={sliderRef}
            className="relative w-full h-6 my-4 cursor-pointer"
            onClick={handleBarClick}
          >
            {/* Barre de progression avec effet de focus */}
            <div 
              className="absolute top-1/2 left-0 w-full h-2 -translate-y-1/2 rounded-full cursor-pointer"
              style={{ 
                background: getSliderBackground(),
                boxShadow: isDragging ? '0 0 0 2px rgba(255, 255, 255, 0.3)' : 'none',
                transition: 'box-shadow 0.2s ease'
              }}
              onClick={handleBarClick}
            ></div>
            
            {/* Curseur flamme avec zone de clic plus large */}
            <div 
              ref={thumbRef}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 select-none z-10"
              style={{ 
                left: thumbPosition,
                fontSize: `${flameSize}px`,
                transition: 'left 0.1s ease, font-size 0.3s ease',
                cursor: 'grab',
                userSelect: 'none',
                touchAction: 'none',
                // Ajouter un halo autour de la flamme pour faciliter le clic
                textShadow: '0 0 10px rgba(255, 165, 0, 0.7)',
                // Ajouter une zone de clic plus large
                padding: '10px',
                margin: '-10px',
                // Ajouter un effet de survol
                filter: isDragging ? 'brightness(1.2)' : 'brightness(1)'
              }}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            >
              🔥
            </div>
          </div>
          
          {/* Input range caché pour l'accessibilité */}
          <input
            type="range"
            min="1"
            max="3"
            step="0.01"
            value={value}
            onChange={handleChange}
            className="sr-only"
            aria-label="Niveau d'érotisme"
          />
          
          <div className="text-center mt-3">
            <span className="text-white text-sm">{getLevelDescription()}</span>
          </div>
          
          <div className="text-amber-200/70 text-xs text-center mt-4">
            Glissez la flamme pour choisir l'intensité qui vous convient
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-amber-800 text-white rounded-md hover:bg-amber-700 transition-colors"
          >
            Annuler
          </button>
          
          <button
            onClick={() => onSubmit(Math.round(value))}
            className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-400 transition-colors"
          >
            Générer
          </button>
        </div>
      </div>
    </div>
  );
};

export default EroticismSlider;
