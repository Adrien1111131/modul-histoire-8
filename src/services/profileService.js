// Service pour gérer les profils utilisateurs dans le localStorage

// Clés utilisées pour stocker les profils dans le localStorage
const PROFILES_STORAGE_KEY = 'user_profiles';
const ACTIVE_PROFILE_KEY = 'active_profile_id';

/**
 * Récupère tous les profils stockés
 * @returns {Array} Liste des profils
 */
export const getProfiles = () => {
  try {
    const profilesJson = localStorage.getItem(PROFILES_STORAGE_KEY);
    return profilesJson ? JSON.parse(profilesJson) : [];
  } catch (error) {
    console.error('Erreur lors de la récupération des profils:', error);
    return [];
  }
};

/**
 * Sauvegarde un nouveau profil
 * @param {Object} profile - Le profil à sauvegarder
 * @returns {Object} Le profil sauvegardé avec son ID
 */
export const saveProfile = (profile) => {
  try {
    const profiles = getProfiles();
    
    // Générer un ID unique pour le profil
    const newProfile = {
      ...profile,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    // Ajouter le nouveau profil à la liste
    const updatedProfiles = [...profiles, newProfile];
    
    // Sauvegarder la liste mise à jour
    localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(updatedProfiles));
    
    // Si c'est le premier profil, le définir comme actif
    if (profiles.length === 0) {
      setActiveProfile(newProfile.id);
    }
    
    return newProfile;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du profil:', error);
    throw error;
  }
};

/**
 * Met à jour un profil existant
 * @param {string} profileId - L'ID du profil à mettre à jour
 * @param {Object} updatedData - Les nouvelles données du profil
 * @returns {Object|null} Le profil mis à jour ou null en cas d'erreur
 */
export const updateProfile = (profileId, updatedData) => {
  try {
    const profiles = getProfiles();
    const profileIndex = profiles.findIndex(profile => profile.id === profileId);
    
    if (profileIndex === -1) {
      console.error('Profil non trouvé:', profileId);
      return null;
    }
    
    // Mettre à jour le profil
    const updatedProfile = {
      ...profiles[profileIndex],
      ...updatedData,
      updatedAt: new Date().toISOString()
    };
    
    // Remplacer le profil dans la liste
    profiles[profileIndex] = updatedProfile;
    
    // Sauvegarder la liste mise à jour
    localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(profiles));
    
    return updatedProfile;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    return null;
  }
};

/**
 * Supprime un profil par son ID
 * @param {string} profileId - L'ID du profil à supprimer
 * @returns {boolean} Succès de l'opération
 */
export const deleteProfile = (profileId) => {
  try {
    const profiles = getProfiles();
    const updatedProfiles = profiles.filter(profile => profile.id !== profileId);
    
    localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(updatedProfiles));
    
    // Si le profil supprimé était le profil actif, définir un autre profil comme actif
    if (getActiveProfile() === profileId && updatedProfiles.length > 0) {
      setActiveProfile(updatedProfiles[0].id);
    } else if (updatedProfiles.length === 0) {
      // Si plus aucun profil, supprimer le profil actif
      localStorage.removeItem(ACTIVE_PROFILE_KEY);
    }
    
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression du profil:', error);
    return false;
  }
};

/**
 * Récupère un profil par son ID
 * @param {string} profileId - L'ID du profil à récupérer
 * @returns {Object|null} Le profil trouvé ou null
 */
export const getProfileById = (profileId) => {
  try {
    const profiles = getProfiles();
    return profiles.find(profile => profile.id === profileId) || null;
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    return null;
  }
};

/**
 * Définit le profil actif
 * @param {string} profileId - L'ID du profil à définir comme actif
 * @returns {boolean} Succès de l'opération
 */
export const setActiveProfile = (profileId) => {
  try {
    localStorage.setItem(ACTIVE_PROFILE_KEY, profileId);
    return true;
  } catch (error) {
    console.error('Erreur lors de la définition du profil actif:', error);
    return false;
  }
};

/**
 * Récupère l'ID du profil actif
 * @returns {string|null} L'ID du profil actif ou null
 */
export const getActiveProfile = () => {
  try {
    return localStorage.getItem(ACTIVE_PROFILE_KEY);
  } catch (error) {
    console.error('Erreur lors de la récupération du profil actif:', error);
    return null;
  }
};

/**
 * Récupère le profil actif complet
 * @returns {Object|null} Le profil actif ou null
 */
export const getActiveProfileData = () => {
  const activeProfileId = getActiveProfile();
  if (!activeProfileId) return null;
  
  return getProfileById(activeProfileId);
};

export default {
  getProfiles,
  saveProfile,
  updateProfile,
  deleteProfile,
  getProfileById,
  setActiveProfile,
  getActiveProfile,
  getActiveProfileData
};
