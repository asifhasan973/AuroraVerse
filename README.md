# 🌟 Solar Storms to Auroras: Space Weather Web Platform

An engaging educational web platform that teaches space weather concepts through storytelling, real-time NASA data and gamified learning experiences.

## 🎮 [Live Demo](https://exo-visionaries.vercel.app/)

## 📖 Overview

This space weather education platform combines hands-on storytelling with real NASA data to teach users about solar storms, auroras and space weather phenomena. Features include 3D simulations, real-time data visualization, playful mini-experiences and comprehensive learning modules.

## 🗺️ Features

* **Home** (`/`) – Space video background with Astronaut Stelly introduction
* **Start Journey** (`/start`) – Story path with NASA imagery vocabulary cards
* **Story Chapters** (`/story2`, `/story3`, `/story4`) – Progressive solar storm narrative with animations
* **Aurora Lab** (`/aurora`) – 3D Earth simulation with controllable aurora curtains and NASA DONKI data
* **Aurora Forecast** (`/forecast`) – Live aurora predictions with 24-hour animations and heatmaps
* **K-Index Dashboard** (`/kindex`) – Kid-friendly space weather monitoring with “Space Mood” visualization
* **Electron Forecast** (`/electrons`) – Radiation storm predictions and satellite safety data
* **Quiz System** (`/quiz`) – Playful assessment with lifelines, scoring and educational feedback
* **StormSafe Game** (`/stormsafe`) – Find-the-shelter challenge with time-based gameplay
* **Space Defense Game** (`/space-defense`) – Defend Earth from space threats with survival missions
* **AI Q&A** (`/ai-qa`) – Conversational learning assistant powered by Grok AI
* **Data Hub** (`/data`) – NASA policy documents, research papers and educational resources
* **Finale** (`/finale`) – Achievement celebration with completion certificates

## 🛠️ Technology Stack

* **Frontend**: React
* **Styling**: Tailwind
* **3D Graphics**: Three.js with React Three Fiber
* **UI Components**: Radix UI
* **State Management**: Zustand
* **Deployment**: Vercel
* **AI Integration**: Grok

## 🌐 NASA & NOAA Data Sources

* **NASA Images**: [https://www.nasa.gov/images/](https://www.nasa.gov/images/) – Educational imagery for vocabulary cards and stories
* **NASA Science**: [https://science.nasa.gov/](https://science.nasa.gov/) – Heliophysics research and educational content
* **Space Place**: [https://spaceplace.nasa.gov/](https://spaceplace.nasa.gov/) – Kid-friendly space weather explanations
* **Aurora Forecast**: [https://services.swpc.noaa.gov/json/ovation_aurora_latest.json](https://services.swpc.noaa.gov/json/ovation_aurora_latest.json) – Live aurora probability predictions
* **Aurora Animations**: [https://services.swpc.noaa.gov/products/animations/](https://services.swpc.noaa.gov/products/animations/) – 24-hour aurora activity animations
* **K-Index Data**: [https://services.swpc.noaa.gov/json/boulder_k_index_1m.json](https://services.swpc.noaa.gov/json/boulder_k_index_1m.json) – Real-time geomagnetic activity measurements
* **Electron Forecast**: [https://services.swpc.noaa.gov/json/electron_fluence_forecast.json](https://services.swpc.noaa.gov/json/electron_fluence_forecast.json) – Radiation storm predictions
* **Heliophysics Data Portal**: [https://science.nasa.gov/heliophysics/data/](https://science.nasa.gov/heliophysics/data/) – Comprehensive heliophysics datasets and modeling tools
* **NASA YouTube**: [https://www.youtube.com/@NASAgovVideo](https://www.youtube.com/@NASAgovVideo) – Educational videos for story explanations and space content

## 🤖 AI Tools Used

* **ChatGPT** – Idea generation and concept development
* **Cursor AI** – Code development and programming assistance
* **Google Gemini** – Image generation for educational content
* **Grok AI API** – Website AI chat bot functionality for `/ai-qa` feature

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
│   ├── components/
│   │   ├── ui/
│   │   ├── Earth3D.jsx
│   │   ├── Navbar.jsx
│   │   ├── VocabularyCard.jsx
│   │   └── VocabularySlider.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Start.jsx
│   │   ├── Story2.jsx
│   │   ├── Story3.jsx
│   │   ├── Story4.jsx
│   │   ├── AuroraLab.jsx
│   │   ├── AuroraForecast.jsx
│   │   ├── KIndexDashboard.jsx
│   │   ├── ElectronFluenceForecast.jsx
│   │   ├── Quiz.jsx
│   │   ├── Games.jsx
│   │   ├── StormSafe.jsx
│   │   ├── SpaceDefense.jsx
│   │   ├── AIQuestionAnswer.jsx
│   │   ├── Data.jsx
│   │   ├── Finale.jsx
│   │   └── DialogueBox.jsx
│   ├── data/
│   │   ├── quiz.json
│   │   └── vocabulary.js
│   ├── hooks/
│   │   ├── useImagePreload.js
│   │   └── useVocabulary.js
│   ├── services/
│   │   └── aiService.js
│   └── assets/
├── public/
│   ├── aurora-lab/
│   │   ├── scripts/
│   │   ├── styles/
│   │   └── assets/
│   ├── images/
│   │   ├── GamePage/
│   │   ├── Story2/
│   │   ├── Story3/
│   │   └── Story4/
│   └── videos/
└── dist/
```

## 🏆 NASA Space Apps Challenge 2025

Developed for NASA Space Apps Challenge 2025, this project makes space weather education accessible through modern web technology and real NASA data integration.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make improvements
4. Submit a pull request

## 📄 License

MIT License – Open source project

---

**🌟 Made with ❤️ for space education**
