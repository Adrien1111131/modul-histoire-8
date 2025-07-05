import React from 'react';
import { useLocation } from 'react-router-dom';

const ProgressBar = () => {
  const location = useLocation();
  
  const steps = [
    { path: '/personal-info', label: 'Informations' },
    { path: '/sensory-questionnaire', label: 'Profil sensoriel' },
    { path: '/excitation-questionnaire', label: 'Préférences' },
    { path: '/story-result', label: 'Histoire' }
  ];

  const getCurrentStep = () => {
    const currentIndex = steps.findIndex(step => step.path === location.pathname);
    return currentIndex === -1 ? 0 : currentIndex;
  };

  const currentStep = getCurrentStep();

  return (
    <div className="w-full max-w-md mx-auto mb-0 pt-4 pb-2 px-4 bg-amber-200/80 rounded-b-lg border-b border-x border-blue-400">
      <div className="flex justify-between mb-2">
        {steps.map((step, index) => (
          <div
            key={step.path}
            className={`flex-1 text-center text-sm font-medium ${
              index <= currentStep ? 'text-amber-800' : 'text-amber-500/50'
            }`}
          >
            {step.label}
          </div>
        ))}
      </div>
      <div className="h-2 bg-amber-300/30 rounded-full">
        <div
          className="h-full bg-amber-500 rounded-full transition-all duration-300"
          style={{
            width: `${((currentStep + 1) / steps.length) * 100}%`
          }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
