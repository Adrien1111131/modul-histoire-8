import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import profileService from '../services/profileService'

const StoryResult = ({ userProfile }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [savedProfile, setSavedProfile] = useState(null)
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    saveUserProfile()
  }, [])

  const saveUserProfile = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Extraire les informations pertinentes du profil
      const { personalInfo, sensoryAnswers, excitationAnswers } = userProfile
      
      // Déterminer le style dominant et le type d'excitation
      const dominantStyle = calculateDominantStyle(sensoryAnswers)
      const excitationType = calculateExcitationType(excitationAnswers)
      
      // Créer l'objet profil à sauvegarder
      const profileToSave = {
        name: personalInfo.name,
        gender: personalInfo.gender,
        orientation: personalInfo.orientation,
        dominantStyle,
        excitationType,
        tone: personalInfo.tone,
        context: personalInfo.context,
        length: personalInfo.length,
        personalInfo,
        sensoryAnswers,
        excitationAnswers
      }
      
      // Sauvegarder le profil
      const saved = profileService.saveProfile(profileToSave)
      setSavedProfile(saved)
      setSaveSuccess(true)
    } catch (err) {
      setError('Une erreur est survenue lors de la sauvegarde du profil.')
      console.error('Erreur de sauvegarde:', err)
    } finally {
      setLoading(false)
    }
  }

  // Fonction pour déterminer le style dominant (copié de grokApi.js)
  const calculateDominantStyle = (answers = {}) => {
    try {
      const answersArray = Object.values(answers)
      
      if (!answersArray.length) {
        return 'VISUEL'
      }

      const counts = answersArray.reduce((acc, answer) => {
        acc[answer] = (acc[answer] || 0) + 1
        return acc
      }, {})

      const dominant = Object.entries(counts)
        .sort(([,a], [,b]) => b - a)[0][0]

      const styleMap = {
        'A': 'VISUEL',
        'B': 'SENSORIEL',
        'C': 'AUDITIF'
      }

      return styleMap[dominant] || 'VISUEL'
    } catch (error) {
      console.error('Erreur lors du calcul du style dominant:', error)
      return 'VISUEL'
    }
  }

  // Fonction pour déterminer le type d'excitation (copié de grokApi.js)
  const calculateExcitationType = (answers = {}) => {
    try {
      const answersArray = Object.values(answers)
      
      if (!answersArray.length) {
        return 'ÉMOTIONNEL'
      }

      const typeMap = {
        'A': 'ÉMOTIONNEL',
        'B': 'IMAGINATIF',
        'C': 'DOMINANCE_DOUCE',
        'D': 'SENSORIEL'
      }

      const counts = answersArray.reduce((acc, answer) => {
        acc[answer] = (acc[answer] || 0) + 1
        return acc
      }, {})

      const dominant = Object.entries(counts)
        .sort(([,a], [,b]) => b - a)[0][0]

      return typeMap[dominant] || 'ÉMOTIONNEL'
    } catch (error) {
      console.error('Erreur lors du calcul du type d\'excitation:', error)
      return 'ÉMOTIONNEL'
    }
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="question-card text-center">
          <div className="animate-pulse space-y-4">
            <div className="w-24 h-24 mx-auto">
              <svg className="animate-spin text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold">Sauvegarde en cours...</h2>
            <p className="text-gray-600">
              Nous enregistrons votre profil personnalisé.
              <br />Cela ne prendra qu'un instant.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="question-card">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Une erreur est survenue</h2>
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <p className="text-red-700">
              Nous n'avons pas pu sauvegarder votre profil. 
              Cela peut être dû à :
            </p>
            <ul className="list-disc list-inside mt-2 text-red-600">
              <li>Un problème avec le stockage local</li>
              <li>Des données manquantes dans votre profil</li>
            </ul>
          </div>
          <div className="flex justify-between">
            <button
              onClick={() => navigate('/excitation-questionnaire')}
              className="btn-secondary"
            >
              Retour au questionnaire
            </button>
            <button
              onClick={saveUserProfile}
              className="btn-primary"
            >
              Réessayer la sauvegarde
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="question-card">
        <h2 className="text-2xl font-bold mb-6">Votre profil a été créé</h2>
        
        {saveSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
            <p className="text-green-700 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              Profil sauvegardé avec succès !
            </p>
          </div>
        )}
        
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-6">
          <h3 className="text-lg font-semibold mb-3">Résumé de votre profil</h3>
          
          <div className="space-y-4">
            <div>
              <p className="font-medium">Informations personnelles</p>
              <p className="text-gray-600">Nom : {savedProfile?.name}</p>
              <p className="text-gray-600">Genre : {savedProfile?.gender}</p>
              <p className="text-gray-600">Orientation : {savedProfile?.orientation}</p>
            </div>
            
            <div>
              <p className="font-medium">Style de narration</p>
              <p className="text-gray-600">Style dominant : {savedProfile?.dominantStyle}</p>
              <p className="text-gray-600">Type d'excitation : {savedProfile?.excitationType}</p>
              <p className="text-gray-600">Tonalité préférée : {savedProfile?.tone}</p>
            </div>
            
            <div>
              <p className="font-medium">Préférences de contenu</p>
              <p className="text-gray-600">Contexte favori : {savedProfile?.context}</p>
              <p className="text-gray-600">Longueur préférée : {savedProfile?.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
          <h3 className="text-sm font-medium text-blue-700 mb-2">Comment votre histoire sera adaptée :</h3>
          <ul className="list-disc list-inside text-blue-700 space-y-1">
            <li>Narration adaptée à votre style {savedProfile?.dominantStyle?.toLowerCase()} dominant</li>
            <li>Stimulation basée sur votre type d'excitation {savedProfile?.excitationType?.toLowerCase()}</li>
            <li>Ton {savedProfile?.tone} pour une expérience personnalisée</li>
            <li>Contexte de type "{savedProfile?.context}" comme vous le préférez</li>
          </ul>
        </div>

        <div className="flex justify-center pt-6">
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  )
}

export default StoryResult
