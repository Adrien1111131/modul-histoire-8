import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileCard from './ProfileCard';
import profileService from '../services/profileService';
import MysterySettingsModal from './MysterySettingsModal';
import { logUserAction, ANALYTICS_ACTIONS } from '../services/analyticsService';
import myDesireLogo from '/logo1.png';
import guideeImg from '/guidee.png';
import fantasmeImg from '/fantasme.png';

const HomePage = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [hasProfile, setHasProfile] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [activeProfileId, setActiveProfileId] = useState(null);
  const [showEroticismSlider, setShowEroticismSlider] = useState(false);
  const [tempRandomStoryData, setTempRandomStoryData] = useState(null);

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = () => {
    const savedProfiles = profileService.getProfiles();
    setProfiles(savedProfiles);
    setHasProfile(savedProfiles.length > 0);
    const activeId = profileService.getActiveProfile();
    setActiveProfileId(activeId);
  };

  const handleSelectProfile = (profileId) => {
    profileService.setActiveProfile(profileId);
    setActiveProfileId(profileId);
  };

  const handleEditProfile = (profileId) => {
    navigate(`/personal-info?edit=${profileId}`);
  };

  const handleDeleteProfile = (profileId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce profil ?')) {
      profileService.deleteProfile(profileId);
      loadProfiles();
    }
  };

  const handleAddProfile = () => {
    navigate('/personal-info');
    setShowProfileModal(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{
      backgroundImage: 'url("/fond start.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="w-full max-w-4xl mx-auto border border-[#a69485] rounded-lg overflow-hidden">
        {/* En-tête */}
        <div className="bg-gradient-to-r from-[#e0c29b] via-[#d5b394] to-[#b39274] backdrop-blur-sm shadow-md border-b border-[#d5b394]/30 p-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-12 w-12 mr-3">
              <img src={myDesireLogo} alt="MyDesire Logo" className="h-full w-full object-contain" />
            </div>
            <div className="text-xl font-bold tracking-wide text-white">
              My<span className="text-red-200">Desire</span>.now
            </div>
          </div>
          <button 
            onClick={() => setShowProfileModal(!showProfileModal)}
            className="relative w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 shadow-md"
          >
            <span className="text-sm">Profil</span>
          </button>
        </div>

        {/* Modal de gestion des profils */}
        {showProfileModal && (
          <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-md transition-all duration-500 animate-fadeIn">
            <div className="bg-[#c4b5a6] rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden transform transition-all duration-500 animate-slideIn">
              <div className="bg-gradient-to-r from-[#e0c29b] via-[#d5b394] to-[#b39274] text-white px-4 py-3 flex justify-between items-center">
                <h3 className="text-lg font-medium">Gestion des profils</h3>
                <button 
                  onClick={() => setShowProfileModal(false)}
                  className="text-white hover:text-amber-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-4">
                {profiles.length > 0 ? (
                  <div className="space-y-3 mb-4">
                    {profiles.map(profile => (
                      <ProfileCard 
                        key={profile.id}
                        profile={profile}
                        isActive={profile.id === activeProfileId}
                        onSelect={() => handleSelectProfile(profile.id)}
                        onEdit={() => handleEditProfile(profile.id)}
                        onDelete={() => handleDeleteProfile(profile.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    Aucun profil enregistré. Créez votre premier profil pour personnaliser vos histoires.
                  </p>
                )}
                
                <div className="flex justify-center mt-4">
                  <button
                    onClick={handleAddProfile}
                    className="bg-white/20 hover:bg-white/40 text-white px-4 py-2 rounded-full flex items-center transition-all duration-300 hover:shadow-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Ajouter un profil
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Contenu principal */}
        <div className="text-white">
          <div className="p-6">
            <h2 className="text-3xl font-light text-center mb-4 tracking-[0.15em] bg-gradient-to-r from-[#e0c29b] via-[#d5b394] to-[#b39274] bg-clip-text text-transparent drop-shadow-lg">Créez votre histoire...</h2>
            
            <p className="text-base mb-8 text-center max-w-lg mx-auto leading-relaxed bg-gradient-to-r from-[#e0c29b] via-[#d5b394] to-[#b39274] bg-clip-text text-transparent">
              Choisissez votre expérience : laissez-vous surprendre par le Mystère, optez pour un 
              scénario Guidé, explorez vos Fantasmes ou écrivez librement avec Libre.
            </p>

            {/* Grille des options */}
            <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* L'Inattendu */}
              <div className="relative rounded-2xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.2),0_8px_32px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.2),0_16px_48px_-8px_rgba(0,0,0,0.1)] transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] ring-1 ring-white/20">
                <div className="absolute inset-0 bg-gradient-to-br from-[#e0c29b] via-[#d5b394] to-[#b39274] backdrop-blur-sm border border-white/10"></div>
                <div className="relative px-5 py-5 min-h-[220px] flex flex-col">
                  <div className="flex-grow">
                    <h3 className="title-card text-2xl text-white tracking-[0.2em] mb-2 font-extralight drop-shadow-lg">Mystère</h3>
                    <p className="description-card text-[15px] text-white/95 mb-4 leading-relaxed">
                      Une histoire sensuelle totalement mystérieuse.
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <button 
                      onClick={() => {
                        const activeProfile = profileService.getActiveProfileData();
                        const defaultProfile = {
                          name: "Utilisateur",
                          gender: "femme",
                          orientation: "hétérosexuelle",
                          dominantStyle: "VISUEL",
                          excitationType: "ÉMOTIONNEL",
                          tone: "doux",
                          length: "medium"
                        };
                        const profileToUse = activeProfile || defaultProfile;
                        const allKinks = [
                          'Romance', 'Passion', 'Sensualité', 'Désir', 'Séduction',
                          'Fantasme', 'Intimité', 'Plaisir', 'Érotisme', 'Tension'
                        ];
                        const numKinks = Math.floor(Math.random() * 3) + 2;
                        const randomKinks = [];
                        while (randomKinks.length < numKinks && allKinks.length > 0) {
                          const randomIndex = Math.floor(Math.random() * allKinks.length);
                          randomKinks.push(allKinks[randomIndex]);
                          allKinks.splice(randomIndex, 1);
                        }
                        const storyData = {
                          personalInfo: {
                            name: profileToUse.name,
                            gender: profileToUse.gender,
                            orientation: profileToUse.orientation || 'hétérosexuelle'
                          },
                          selectedKinks: randomKinks,
                          dominantStyle: profileToUse.dominantStyle || "VISUEL",
                          excitationType: profileToUse.excitationType || "ÉMOTIONNEL",
                          tone: profileToUse.tone || 'doux',
                          length: profileToUse.length || 'medium'
                        };
                        setTempRandomStoryData(storyData);
                        setShowEroticismSlider(true);
                      }}
                      className="button-text bg-white/20 hover:bg-white/40 text-white px-4 py-1.5 rounded-full flex items-center transition-all duration-300 hover:shadow-lg"
                    >
                      Lancer
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Guidée */}
              <div className="relative rounded-2xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.2),0_8px_32px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.2),0_16px_48px_-8px_rgba(0,0,0,0.1)] transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] ring-1 ring-white/20">
                <img src={guideeImg} alt="Guidée" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
                <div className="relative px-5 py-5 min-h-[220px] flex flex-col">
                  <div className="flex-grow">
                    <h3 className="title-card text-2xl text-white tracking-[0.2em] mb-2 font-extralight drop-shadow-lg">Guidée</h3>
                    <p className="description-card text-[15px] text-white/95 mb-4 leading-relaxed">
                      Laisse-toi guider selon l'ambiance et la situation que tu choisis
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <button 
                      onClick={() => {
                        logUserAction(
                          ANALYTICS_ACTIONS.STORY_MODE_SELECTED,
                          'HomePage',
                          { mode: 'guided', description: 'Guidée - scénario personnalisé' }
                        );
                        navigate('/custom-story');
                      }}
                      className="button-text bg-white/30 hover:bg-white/40 text-white px-4 py-1.5 rounded-full flex items-center"
                    >
                      Choisir
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Fantasmes */}
              <div className="relative rounded-2xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.2),0_8px_32px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.2),0_16px_48px_-8px_rgba(0,0,0,0.1)] transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] ring-1 ring-white/20">
                <img src={fantasmeImg} alt="Fantasmes" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
                <div className="relative px-5 py-5 min-h-[220px] flex flex-col">
                  <div className="flex-grow">
                    <h3 className="title-card text-2xl text-white tracking-[0.2em] mb-2 font-extralight drop-shadow-lg">Fantasmes</h3>
                    <p className="description-card text-[15px] text-white/95 mb-4 leading-relaxed">
                      Sélectionne tes envies, on s'occupe du reste...
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <button 
                      onClick={() => {
                        logUserAction(
                          ANALYTICS_ACTIONS.STORY_MODE_SELECTED,
                          'HomePage',
                          { mode: 'fantasies', description: 'Fantasmes - sélection de catégories' }
                        );
                        navigate('/random-story-generator');
                      }}
                      className="button-text bg-white/30 hover:bg-white/40 text-white px-4 py-1.5 rounded-full flex items-center"
                    >
                      Sélectionner
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Libre */}
              <div className="relative rounded-2xl overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.2),0_8px_32px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.2),0_16px_48px_-8px_rgba(0,0,0,0.1)] transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] ring-1 ring-white/20">
                <div className="absolute inset-0 bg-gradient-to-br from-[#e0c29b] via-[#d5b394] to-[#b39274] backdrop-blur-sm border border-white/10"></div>
                <div className="relative px-5 py-5 min-h-[220px] flex flex-col">
                  <div className="flex-grow">
                    <h3 className="title-card text-2xl text-white tracking-[0.2em] mb-2 font-extralight drop-shadow-lg">Libre</h3>
                    <p className="description-card text-[15px] text-white/95 mb-4 leading-relaxed">
                      Transforme ton idée en une histoire érotique immersive.
                    </p>
                  </div>
                  <div className="flex justify-end">
                    <button 
                      onClick={() => {
                        logUserAction(
                          ANALYTICS_ACTIONS.STORY_MODE_SELECTED,
                          'HomePage',
                          { mode: 'free', description: 'Libre - fantasme personnalisé' }
                        );
                        navigate('/free-fantasy');
                      }}
                      className="button-text bg-white/20 hover:bg-white/40 text-white px-4 py-1.5 rounded-full flex items-center transition-all duration-300 hover:shadow-lg"
                    >
                      Écrire
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Copyright */}
            <div className="mt-8 text-center text-amber-200/50 text-xs">
              © 2025 MyDesire.now
            </div>
          </div>
        </div>
      </div>

      {/* Modal de paramètres pour le mode Mystère */}
      {showEroticismSlider && tempRandomStoryData && (
        <MysterySettingsModal
          initialReadingTime={2}
          initialEroticismLevel={2}
          onClose={() => setShowEroticismSlider(false)}
          onSubmit={({ readingTime, eroticismLevel }) => {
            const updatedStoryData = {
              ...tempRandomStoryData,
              readingTime,
              eroticismLevel
            };
            localStorage.setItem('randomStoryData', JSON.stringify(updatedStoryData));
            setShowEroticismSlider(false);
            navigate('/random-story-result');
          }}
        />
      )}
    </div>
  )
}

export default HomePage
