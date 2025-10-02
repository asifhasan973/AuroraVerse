# 🌟 From Solar Storms to Auroras: Interactive Space Weather Game
An interactive educational game that teaches space weather concepts through storytelling, real-time NASA data, and gamified learning experiences.

## 🎮 [Live Demo](https://space-apps-game.vercel.app)

## 📖 Overview

This space weather education platform combines interactive storytelling with real NASA data to teach users about solar storms, auroras, and space weather phenomena. Features include 3D simulations, real-time data visualization, educational games, and comprehensive learning modules.

## 🗺️ Features

- **Home** (`/`) - Space video background with Astronaut Stelly character introduction
- **Start Journey** (`/start`) - Interactive story with NASA imagery vocabulary cards
- **Story Chapters** (`/story2`, `/story3`, `/story4`) - Progressive solar storm narrative with animations
- **Aurora Lab** (`/aurora`) - 3D Earth simulation with interactive aurora curtains and NASA DONKI data
- **Aurora Forecast** (`/forecast`) - Live aurora predictions with 24-hour animations and heatmaps
- **K-Index Dashboard** (`/kindex`) - Kid-friendly space weather monitoring with "Space Mood" visualization
- **Electron Forecast** (`/electrons`) - Radiation storm predictions and satellite safety data
- **Quiz System** (`/quiz`) - Interactive assessment with lifelines, scoring, and educational feedback
- **StormSafe Game** (`/stormsafe`) - Find storm shelter challenge with time-based gameplay
- **Space Defense Game** (`/space-defense`) - Defend Earth from space threats with survival missions
- **AI Q&A** (`/ai-qa`) - Conversational learning assistant powered by Grok AI
- **Data Hub** (`/data`) - NASA policy documents, research papers, and educational resources
- **Finale** (`/finale`) - Achievement celebration with completion certificates

## 🛠️ Technology Stack

- **Frontend**: React
- **Styling**: Tailwind 
- **3D Graphics**: Three.js with React Three Fiber
- **UI Components**: Radix UI
- **State Management**: Zustand
- **Deployment**: Vercel
- **AI Integration**: Grok

## 🌐 NASA & NOAA Data Sources

- **NASA Images**: [https://www.nasa.gov/images/](https://www.nasa.gov/images/) - Educational imagery for vocabulary cards and stories
- **NASA Science**: [https://science.nasa.gov/](https://science.nasa.gov/) - Heliophysics research and educational content
- **Space Place**: [https://spaceplace.nasa.gov/](https://spaceplace.nasa.gov/) - Kid-friendly space weather explanations
- **Aurora Forecast**: [https://services.swpc.noaa.gov/json/ovation_aurora_latest.json](https://services.swpc.noaa.gov/json/ovation_aurora_latest.json) - Live aurora probability predictions
- **Aurora Animations**: [https://services.swpc.noaa.gov/products/animations/](https://services.swpc.noaa.gov/products/animations/) - 24-hour aurora activity animations
- **K-Index Data**: [https://services.swpc.noaa.gov/json/boulder_k_index_1m.json](https://services.swpc.noaa.gov/json/boulder_k_index_1m.json) - Real-time geomagnetic activity measurements
- **Electron Forecast**: [https://services.swpc.noaa.gov/json/electron_fluence_forecast.json](https://services.swpc.noaa.gov/json/electron_fluence_forecast.json) - Radiation storm predictions
- **Heliophysics Data Portal**: [https://science.nasa.gov/heliophysics/data/](https://science.nasa.gov/heliophysics/data/) - Comprehensive heliophysics datasets and modeling tools
- **NASA YouTube**: [https://www.youtube.com/@NASAgovVideo](https://www.youtube.com/@NASAgovVideo) - Educational videos for story explanations and space content 



## 🤖 AI Tools Used

- **ChatGPT** - Idea generation and concept development
- **Cursor AI** - Code development and programming assistance  
- **Google Gemini** - Image generation for educational content
- **Grok AI API** - Website AI chat bot functionality for `/ai-qa` feature


## 🚀 Getting Started

   ```bash
# Clone and install
   git clone https://github.com/your-username/space-apps-game.git
   cd space-apps-game
   npm install

# Development
   npm run dev

# Production
   npm run build
   npm run preview
   ```

## 📁 Project Structure

```
space-apps-game/
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── ui/                 # Base UI components (Button, Spinner, LoadingOverlay)
│   │   ├── Earth3D.jsx         # 3D Earth visualization component
│   │   ├── Navbar.jsx          # Navigation component
│   │   ├── VocabularyCard.jsx  # Individual vocabulary learning cards
│   │   └── VocabularySlider.jsx # Vocabulary carousel component
│   ├── pages/                  # Main application pages
│   │   ├── Home.jsx            # Landing page with space video background
│   │   ├── Start.jsx           # Story introduction and vocabulary
│   │   ├── Story2.jsx          # Second story chapter
│   │   ├── Story3.jsx          # Solar storm concepts chapter
│   │   ├── Story4.jsx          # NASA monitoring chapter
│   │   ├── AuroraLab.jsx       # Interactive 3D aurora simulation
│   │   ├── AuroraForecast.jsx  # Real-time aurora predictions
│   │   ├── KIndexDashboard.jsx # Space weather monitoring dashboard
│   │   ├── ElectronFluenceForecast.jsx # Radiation storm predictions
│   │   ├── Quiz.jsx            # Interactive quiz system
│   │   ├── Games.jsx           # Games hub page
│   │   ├── StormSafe.jsx       # Storm shelter safety game
│   │   ├── SpaceDefense.jsx    # Earth defense action game
│   │   ├── AIQuestionAnswer.jsx # AI learning assistant
│   │   ├── Data.jsx            # NASA resources and documents
│   │   ├── Finale.jsx          # Achievement celebration
│   │   └── DialogueBox.jsx     # Story dialogue component
│   ├── data/                   # Static data and configurations
│   │   ├── quiz.json           # Quiz questions and answers
│   │   └── vocabulary.js       # Educational vocabulary content
│   ├── hooks/                  # Custom React hooks
│   │   ├── useImagePreload.js  # Image preloading hook
│   │   └── useVocabulary.js    # Vocabulary management hook
│   ├── services/               # External service integrations
│   │   └── aiService.js        # AI service integration
│   └── assets/                 # Static assets and images
├── public/
│   ├── aurora-lab/             # Aurora Lab 3D simulation assets
│   │   ├── scripts/            # Three.js simulation scripts
│   │   ├── styles/             # Aurora Lab specific styles
│   │   └── assets/             # 3D models and textures
│   ├── images/                 # Game imagery and characters
│   │   ├── GamePage/           # Game interface images
│   │   ├── Story2/             # Story 2 character images
│   │   ├── Story3/             # Solar activity images
│   │   └── Story4/             # NASA monitoring images
│   └── videos/                 # Background videos
└── dist/                       # Production build output
```


## 🏆 NASA Space Apps Challenge 2025

Developed for NASA Space Apps Challenge 2025, this project makes space weather education accessible through interactive technology and real NASA data integration.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make improvements
4. Submit a pull request

## 📄 License

MIT License - Open source project

---

**🌟 Made with ❤️ for space education**