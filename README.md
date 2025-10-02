# 🌟 From Solar Storms to Auroras: Interactive Space Weather Game

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue?style=for-the-badge&logo=vercel)](https://space-apps-game.vercel.app)
[![NASA Space Apps Challenge](https://img.shields.io/badge/NASA-Space%20Apps%20Challenge-orange?style=for-the-badge&logo=nasa)](https://www.spaceappschallenge.org/)

An interactive educational game that teaches space weather concepts through storytelling, real-time NASA data, and gamified learning experiences.

## 🎮 [Live Demo](https://space-apps-game.vercel.app)

## 📖 Overview

This space weather education platform combines interactive storytelling with real NASA data to teach users about solar storms, auroras, and space weather phenomena. Features include 3D simulations, real-time data visualization, educational games, and comprehensive learning modules.

## 🗺️ Complete Feature Overview

### **🏠 Home Page** (`/`)
- Immersive space video background with floating animations
- Character introduction featuring Astronaut Stelly
- Quick access to Aurora Lab and journey start
- Responsive design with smooth transitions

### **🚀 Start Journey** (`/start`)
- Interactive story introduction with character dialogues
- Integrated vocabulary cards featuring NASA imagery from ISS and space missions
- Progressive story phases with educational content about space weather basics
- Multi-step narrative with animations and character interactions

### **📚 Story Chapters**

#### **Story 2** (`/story2`)
- Continuation of space weather narrative
- Character interactions and plot development
- Educational content about solar activity

#### **Story 3** (`/story3`) 
- Deep dive into solar storm concepts
- Interactive sun visualization with solar flare animations
- Educational content about solar activity and CMEs
- Character-driven storytelling with visual effects

#### **Story 4** (`/story4`)
- NASA monitoring and space weather prediction overview
- Real-time monitoring concepts and mission data
- Interactive screen displays simulating NASA control rooms
  - Educational content about space weather forecasting

### **🌌 Aurora Lab** (`/aurora` & `/aurora-lab`)
- **3D Earth Visualization**: Real-time Three.js Earth with atmospheric effects
- **Interactive Aurora Simulation**: Customizable aurora curtain effects
- **NASA DONKI Integration**: Live solar wind data from NASA's Database of Notifications
- **Solar Wind Controls**: Adjustable parameters (speed, density, magnetic field)
- **Educational Content**: Magnetosphere and aurora formation explanations
- **Real-time Data Mode**: Updates with actual space weather conditions

### **🌍 Aurora Forecast** (`/forecast`)
- **Live NOAA Data**: Real-time aurora probability from SWPC
- **3D Earth View**: Interactive globe with aurora visualization
- **24-Hour Animations**: Northern and Southern hemisphere aurora activity
- **Interactive Heatmap**: Hover tooltips with probability percentages
- **Auto-refresh**: Updates every 5 minutes with latest data
- **Customizable Controls**: Opacity and visualization settings

### **📊 K-Index Dashboard** (`/kindex`)
- **Real-time K-Index**: Live geomagnetic activity from NOAA
- **"Space Mood" Visualization**: Kid-friendly sun emotions (Sleepy, Happy, Excited, Wild, Angry)
- **Interactive Charts**: Space weather trends and historical data
- **Auto-refresh**: Updates every minute
- **Educational Explanations**: Space weather impacts and scale explanations
- **Fun Facts**: Engaging space weather information

### **⚡ Electron Fluence Forecast** (`/electrons`)
- **Radiation Monitoring**: Real-time electron fluence data from NOAA SWPC
- **Multi-day Forecasting**: Up to 3 days ahead predictions
- **Storm Level Indicators**: Visual alerts for radiation storms
- **Solar Wind Speed**: Real-time solar wind monitoring
- **Educational Content**: Radiation safety and satellite protection

### **🎯 Quiz System** (`/quiz`)
- **Multiple Choice Questions**: Comprehensive space weather knowledge assessment
- **Lifelines System**: 50:50, Hint, and Skip options
- **Real-time Scoring**: Streak tracking and performance metrics
- **Animated Feedback**: Educational facts after each question
- **Keyboard Shortcuts**: Accessibility features for all users
- **Progress Tracking**: Final score calculation and performance analysis

### **🎮 Educational Games**

#### **StormSafe Game** (`/stormsafe`)
- **Storm Shelter Challenge**: Find safe locations during space storms
- **Time-based Gameplay**: Multiple rounds with increasing difficulty
- **Moving Components**: Dynamic spacecraft elements
- **Lives System**: Challenge progression with scoring
- **Educational Content**: Astronaut safety procedures and protocols

#### **Space Defense Game** (`/space-defense`)
- **Earth Defense**: Protect Earth from space threats
- **Movement Controls**: Arrow keys/WASD navigation
- **Power-ups**: Survival enhancement items
- **10-Second Missions**: Quick survival challenges
- **Score Tracking**: Achievement system and high scores

### **🤖 AI Question & Answer** (`/ai-qa`)
- **Conversational Learning**: Interactive AI assistant for space weather topics
- **Real-time Responses**: Instant answers to user questions
- **Educational Focus**: Space weather and NASA mission information

### **📋 Data Resources** (`/data`)
- **NASA Policy Documents**: SPD-41a and Heliophysics data management policies
- **Research Papers**: Scientific publications and studies
- **Interactive Browser**: Search functionality for documents
- **Direct NASA Links**: Official NASA resources and mission data
- **Educational Materials**: Comprehensive learning resources

### **🏆 Finale** (`/finale`)
- **Achievement Celebration**: Final score display and performance analysis
- **Completion Certificates**: Digital badges for learning milestones
- **Encouragement System**: Motivation for continued learning

## 🛠️ Technology Stack

- **Frontend**: React 19.1.1 with Vite
- **Styling**: Tailwind CSS 4.1.12
- **3D Graphics**: Three.js with React Three Fiber
- **UI Components**: Radix UI
- **State Management**: Zustand
- **Deployment**: Vercel

## 🌐 NASA & NOAA Data Integration

This project integrates multiple real-time NASA and NOAA data sources to provide authentic space weather information:

### **NASA Data Sources**


**NASA Image and Video Library**
- **Base URL**: `https://www.nasa.gov/images/`
   - **Usage**: Educational imagery for vocabulary cards and story elements
- **Content**:
  - International Space Station (ISS) photography
     - Aurora Borealis time-lapse imagery
  - Solar flare photographs and visualizations
     - Satellite and spacecraft imagery
  - Space weather phenomena documentation

**NASA Science Mission Directorate**
   - **URL**: `https://science.nasa.gov/`
   - **Usage**: Educational content and scientific imagery
- **Content**:
  - Heliophysics research and mission data
     - Solar storm and flare documentation
     - Magnetosphere and aurora science
     - Space radiation research
  - Solar observation mission data

**NASA Educational Resources**
   - **Space Place**: `https://spaceplace.nasa.gov/`
   - **NASA Learning**: `https://www.nasa.gov/learning-resources/`
   - **Usage**: Kid-friendly explanations and educational content
   - **Content**: Space weather basics, satellite information, solar system education

### **NOAA Space Weather Prediction Center (SWPC) Data Sources**

**Aurora Forecast Data**
   - **URL**: `https://services.swpc.noaa.gov/json/ovation_aurora_latest.json`
   - **Usage**: Real-time aurora probability predictions
   - **Update Frequency**: Every 30 minutes
   - **Coverage**: Global aurora forecast with probability percentages
- **Integration**: Powers the Aurora Forecast page with live data

**Aurora Animation Data**
   - **Northern Hemisphere**: `https://services.swpc.noaa.gov/products/animations/ovation_north_24h.json`
   - **Southern Hemisphere**: `https://services.swpc.noaa.gov/products/animations/ovation_south_24h.json`
   - **Usage**: 24-hour aurora activity animations
   - **Purpose**: Historical aurora activity visualization

**K-Index Data**
   - **URL**: `https://services.swpc.noaa.gov/json/boulder_k_index_1m.json`
   - **Usage**: Real-time geomagnetic activity measurements
   - **Update Frequency**: Every minute
- **Purpose**: Powers the K-Index Dashboard "Space Mood" visualization
- **Integration**: Auto-refresh functionality for live space weather monitoring

**Electron Fluence Forecast**
   - **URL**: `https://services.swpc.noaa.gov/json/electron_fluence_forecast.json`
   - **Usage**: Electron storm predictions and radiation forecasting
   - **Coverage**: 3-day electron fluence forecasts
- **Purpose**: Powers the Electron Fluence Forecast page
- **Integration**: Satellite safety and radiation monitoring

### **Additional NASA Resources**

**NASA Policy Documents**
   - SPD-41a: Scientific Information Policy for the Science Mission Directorate
   - Heliophysics Science Data Management Policy
   - NASA Data Management Handbook

**NASA Mission Data**
   - International Space Station (ISS) imagery and data
   - Mars 2020 Perseverance mission references
   - Solar observation mission data
   - Heliophysics fleet information

**Educational Content Sources**
   - NASA's Human Research Program radiation data
   - NASA navigation and GPS information
   - Climate change and satellite data
   - Space weather impact documentation

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

## 🎯 Educational Goals

### **Space Weather Awareness**
- Understanding solar storms, auroras, and space radiation phenomena
- Learning about Coronal Mass Ejections (CMEs) and solar flares
- Comprehending the Earth's magnetosphere and its protective role

### **NASA Mission Knowledge**
- Learning about space weather monitoring and prediction systems
- Understanding NASA's role in space weather research
- Exploring real-time data from NASA missions and satellites

### **Scientific Literacy**
- Interpreting real-time space weather data and visualizations
- Understanding the impact of space weather on technology and communications
- Learning about radiation safety and satellite protection

### **Interactive Learning**
- Engaging with complex space science concepts through games and simulations
- Hands-on experience with 3D visualizations and real-time data
- Gamified learning experiences that make education fun and memorable

### **Safety Education**
- Understanding space weather impacts on astronauts and spacecraft
- Learning about storm shelter procedures and safety protocols
- Comprehending the importance of space weather forecasting

## 🏆 NASA Space Apps Challenge 2024

Developed for NASA Space Apps Challenge 2024, this project makes space weather education accessible through interactive technology and real NASA data integration.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make improvements
4. Submit a pull request

## 📄 License

MIT License - Open source project

---

**🌟 Made with ❤️ for space education**