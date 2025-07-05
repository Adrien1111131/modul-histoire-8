# Générateur d'Histoires Sensuelles

Application React qui génère des histoires érotiques personnalisées avec support audio.

## Déploiement

Cette application est configurée pour être déployée sur GitHub Pages. Pour déployer l'application:

1. Créez un dépôt GitHub et poussez votre code
2. Installez gh-pages: `npm install --save-dev gh-pages`
3. Ajoutez ces scripts à votre package.json:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
4. Déployez avec: `npm run deploy`

**Note importante**: Assurez-vous que le fichier `.env` contenant la clé API est correctement configuré sur votre environnement de déploiement, ou utilisez des variables d'environnement fournies par votre service d'hébergement.

## Fonctionnalités

- Génération d'histoires personnalisées basées sur :
  - Profil personnel (genre, orientation)
  - Préférences sensorielles (visuel, auditif, kinesthésique)
  - Type d'excitation (émotionnel, imaginatif, etc.)
  - Tonalité souhaitée (doux, passionné, mystérieux, dominant)
  - Contexte initial (rencontre, retrouvailles, fantasme, quotidien)

- Support des balises audio pour le ton et le rythme :
  - `[sensuel]` - ton sensuel et séduisant
  - `[excite]` - ton excité et passionné
  - `[jouissance]` - ton d'extase
  - `[murmure]` - ton doux et intime
  - `[intense]` - ton intense et profond
  - `[doux]` - ton tendre et délicat
  - `(...)` - pause naturelle

## Installation

```bash
# Installation des dépendances
npm install

# Lancement du serveur de développement
npm run dev
```

## Utilisation

1. Accédez à l'application via `http://localhost:3000`
2. Remplissez le questionnaire en plusieurs étapes :
   - Informations personnelles
   - Profil sensoriel
   - Préférences d'excitation
3. L'histoire générée inclura automatiquement les balises audio appropriées
4. Copiez l'histoire avec les balises pour l'utiliser dans le générateur audio

## Technologies utilisées

- React 18
- Vite
- React Router
- Tailwind CSS
- API Grok pour la génération de texte

## Structure du projet

```
src/
  components/
    HomePage.jsx             # Page d'accueil
    PersonalInfoForm.jsx     # Formulaire d'informations personnelles
    SensoryQuestionnaire.jsx # Questionnaire sensoriel
    ExcitationQuestionnaire.jsx # Questionnaire d'excitation
    StoryResult.jsx         # Affichage de l'histoire générée
    ProgressBar.jsx         # Barre de progression
  services/
    grokApi.js             # Service d'API pour la génération d'histoires
  styles/
    index.css              # Styles globaux et Tailwind
```

## Notes sur les balises audio

Les balises sont utilisées pour indiquer le ton et le rythme dans le texte généré. Elles peuvent être combinées pour créer des effets variés. Par exemple :

```
[doux]Je te regarde depuis l'autre côté de la pièce...[/doux]
[murmure]Viens plus près de moi (...) encore plus près[/murmure]
[sensuel]Je sens la chaleur de ton corps qui m'attire irrésistiblement[/sensuel]
```

Les balises sont automatiquement stylisées dans l'interface pour une meilleure lisibilité, mais sont préservées lors de la copie du texte.
