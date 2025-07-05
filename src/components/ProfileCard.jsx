import React from 'react';

const ProfileCard = ({ profile, onSelect, onEdit, onDelete, isActive }) => {
  return (
    <div className={`flex items-center justify-between p-5 rounded-lg backdrop-blur-md shadow-lg ${isActive ? 'bg-gradient-to-br from-[#d5b394]/90 to-[#c0a081]/90 border border-[#d5b394] shadow-[#d5b394]/30' : 'bg-gradient-to-br from-[#c4b5a6]/30 to-[#a69485]/30 border border-[#c4b5a6]/40'}`}>
      <div 
        className="flex-1 cursor-pointer" 
        onClick={onSelect}
      >
        <div className="flex items-center">
          <p className="font-bold text-lg text-white tracking-wide">{profile.name}</p>
          {isActive && (
            <span className="ml-2 px-3 py-1 text-sm bg-gradient-to-r from-[#d5b394] via-[#c4b5a6] to-[#c0a081] text-white rounded-full font-bold tracking-wider shadow-md backdrop-blur-sm">Actif</span>
          )}
        </div>
        <div className="text-base font-medium text-white/95 mt-3 space-y-2 drop-shadow-sm">
          {profile.gender && <p>Genre: {profile.gender}</p>}
          {profile.orientation && <p>Orientation: {profile.orientation}</p>}
          {profile.ageRange && <p>Âge: {profile.ageRange}</p>}
        </div>
      </div>
      <div className="flex space-x-2">
        <button 
          onClick={onEdit} 
          className="text-white/80 p-2 backdrop-blur-sm rounded-full bg-white/5"
          aria-label="Modifier le profil"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
        <button 
          onClick={onDelete} 
          className="text-white/80 p-2 backdrop-blur-sm rounded-full bg-white/5"
          aria-label="Supprimer le profil"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
