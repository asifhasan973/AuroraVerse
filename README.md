# 🌟 From Solar Storms to Auroras: Interactive Space Weather Game

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-blue?style=for-the-badge&logo=vercel)](https://space-apps-game.vercel.app)
[![NASA Space Apps Challenge](https://img.shields.io/badge/NASA-Space%20Apps%20Challenge-orange?style=for-the-badge&logo=nasa)](https://www.spaceappschallenge.org/)

> **Every Flare Tells a Story Worth Exploring** 🚀

An interactive educational game that teaches space weather concepts through engaging storytelling, real-time data visualization, and gamified learning experiences. Built for the NASA Space Apps Challenge 2024.

## 🎮 Live Demo

**🌐 [Visit the Live Application](https://space-apps-game.vercel.app)**

## 📖 Project Overview

This educational space weather game combines storytelling, interactive simulations, and real NASA data to teach users about solar storms, auroras, and space weather phenomena. The project features multiple interactive pages, games, and data visualizations that make complex space science concepts accessible to learners of all ages.

## 🗺️ Page Details & Features

### 🏠 **Home Page** (`/`)
- **Purpose**: Landing page with animated background and navigation
- **Features**: 
  - Immersive video background of space
  - Character introduction (Astronaut Stelly)
  - Journey start and Aurora Lab quick access
  - Responsive design with floating animations

### 🚀 **Start Journey** (`/start`)
- **Purpose**: Interactive story introduction with vocabulary learning
- **Features**:
  - Multi-step narrative with character dialogues
  - Integrated vocabulary cards with NASA imagery
  - Progressive story phases with animations
  - Educational content about space weather basics

### 📚 **Story Chapters**
#### **Story 2** (`/story2`)
- **Purpose**: Continuation of the space weather narrative
- **Features**: Character interactions and plot development

#### **Story 3** (`/story3`) 
- **Purpose**: Deep dive into solar storm concepts
- **Features**: 
  - Interactive sun visualization
  - Solar flare animations and effects
  - Educational content about solar activity
  - Character-driven storytelling

#### **Story 4** (`/story4`)
- **Purpose**: NASA monitoring and space weather prediction
- **Features**:
  - NASA mission overview
  - Real-time monitoring concepts
  - Interactive screen displays
  - Educational content about space weather forecasting

### 🌌 **Aurora Lab** (`/aurora` & `/aurora-lab`)
- **Purpose**: Interactive 3D aurora simulation and education
- **Features**:
  - Real-time 3D Earth visualization using Three.js
  - Interactive aurora curtain simulation
  - Solar wind parameter controls
  - Integration with NASA DONKI API for real space weather data
  - Educational content about magnetosphere and aurora formation
  - Customizable simulation parameters (solar wind speed, density, magnetic field)

### 🌍 **Aurora Forecast** (`/forecast`)
- **Purpose**: Real-time aurora prediction and visualization
- **Features**:
  - Live aurora probability data from NOAA SWPC
  - Interactive 3D Earth view and flat map projection
  - 24-hour aurora animation player (Northern & Southern hemispheres)
  - Real-time data updates every 5 minutes
  - Interactive heatmap with hover tooltips
  - Customizable opacity and visualization controls

### 📊 **K-Index Dashboard** (`/kindex`)
- **Purpose**: Kid-friendly space weather monitoring
- **Features**:
  - Real-time K-Index data from NOAA
  - "Space Mood" visualization (Sleepy, Happy, Excited, Wild, Angry Sun)
  - Interactive charts showing space weather trends
  - Auto-refresh functionality
  - Educational explanations of space weather impacts
  - Fun facts and space weather scale explanations

### ⚡ **Electron Fluence Forecast** (`/electrons`)
- **Purpose**: Electron storm prediction and monitoring
- **Features**:
  - Real-time electron fluence data from NOAA SWPC
  - Multi-day forecasting (up to 3 days ahead)
  - Interactive charts with storm level indicators
  - Solar wind speed monitoring
  - Educational content about radiation and satellite safety

### 🎯 **Quiz System** (`/quiz`)
- **Purpose**: Interactive knowledge assessment
- **Features**:
  - Multiple-choice questions about space weather
  - Lifelines system (50:50, Hint, Skip)
  - Real-time scoring and streak tracking
  - Animated feedback and educational facts
  - Keyboard shortcuts for accessibility
  - Progress tracking and final score calculation

### 🎮 **Games Hub** (`/games`)
- **Purpose**: Collection of educational mini-games
- **Features**: Gateway to interactive learning games

#### **StormSafe Game** (`/stormsafe`)
- **Purpose**: Teach space storm safety procedures
- **Features**:
  - Find the storm shelter challenge
  - Time-based gameplay with multiple rounds
  - Moving spacecraft components
  - Lives system and scoring
  - Educational content about astronaut safety

#### **Space Defense Game** (`/space-defense`)
- **Purpose**: Action-based learning about space threats
- **Features**:
  - Defend Earth from space threats
  - Arrow keys/WASD movement controls
  - Power-ups and survival challenges
  - 10-second survival missions
  - Score tracking and achievements

### 🤖 **AI Question & Answer** (`/ai-qa`)
- **Purpose**: Interactive AI-powered learning assistant
- **Features**: Conversational learning about space weather topics

### 📋 **Data Resources** (`/data`)
- **Purpose**: Comprehensive collection of NASA and space weather resources
- **Features**:
  - Curated NASA policy documents
  - Heliophysics data management resources
  - Scientific research papers and publications
  - Interactive document browser with search functionality
  - Direct links to NASA official resources

### 🏆 **Finale** (`/finale`)
- **Purpose**: Quiz completion and achievement celebration
- **Features**:
  - Final score display and performance analysis
  - Achievement badges and completion certificates
  - Encouragement for continued learning

## 🛠️ Technology Stack

- **Frontend Framework**: React 19.1.1 with Vite
- **Routing**: React Router DOM 7.8.2
- **Styling**: Tailwind CSS 4.1.12
- **3D Graphics**: Three.js 0.180.0 with React Three Fiber 9.3.0
- **UI Components**: Radix UI components
- **Animations**: Lottie React for smooth animations
- **State Management**: Zustand 5.0.8
- **Icons**: Lucide React
- **Deployment**: Vercel

## 🌐 NASA & NOAA Data Sources

This project integrates multiple real-time NASA and NOAA data sources to provide authentic space weather information:

### **NASA Data Sources**

1. **NASA DONKI (Database Of Notifications, Knowledge, Information)**
   - **URL**: `https://kauai.ccmc.gsfc.nasa.gov/DONKI/WS/get`
   - **Usage**: Real-time coronal mass ejection (CME) analysis data
   - **Purpose**: Powers the Aurora Lab's real-time space weather mode
   - **Data Type**: Solar wind measurements, CME tracking, space weather events

2. **NASA Image and Video Library**
   - **Base URL**: `https://images-assets.nasa.gov/`
   - **Usage**: Educational imagery for vocabulary cards and story elements
   - **Content**: ISS photography, space weather visualizations, solar phenomena
   - **Examples**:
     - Aurora Borealis time-lapse imagery
     - Solar flare photographs
     - International Space Station views
     - Satellite and spacecraft imagery

3. **NASA Science Mission Directorate**
   - **URL**: `https://science.nasa.gov/`
   - **Usage**: Educational content and scientific imagery
   - **Content**: Heliophysics research, space weather explanations, solar activity data
   - **Resources**: 
     - Solar storm and flare documentation
     - Magnetosphere and aurora science
     - Space radiation research
     - Heliophysics mission data

4. **NASA Educational Resources**
   - **Space Place**: `https://spaceplace.nasa.gov/`
   - **NASA Learning**: `https://www.nasa.gov/learning-resources/`
   - **Usage**: Kid-friendly explanations and educational content
   - **Content**: Space weather basics, satellite information, solar system education

### **NOAA Space Weather Prediction Center (SWPC) Data Sources**

1. **Aurora Forecast Data**
   - **URL**: `https://services.swpc.noaa.gov/json/ovation_aurora_latest.json`
   - **Usage**: Real-time aurora probability predictions
   - **Update Frequency**: Every 30 minutes
   - **Coverage**: Global aurora forecast with probability percentages

2. **Aurora Animation Data**
   - **Northern Hemisphere**: `https://services.swpc.noaa.gov/products/animations/ovation_north_24h.json`
   - **Southern Hemisphere**: `https://services.swpc.noaa.gov/products/animations/ovation_south_24h.json`
   - **Usage**: 24-hour aurora activity animations
   - **Purpose**: Historical aurora activity visualization

3. **K-Index Data**
   - **URL**: `https://services.swpc.noaa.gov/json/boulder_k_index_1m.json`
   - **Usage**: Real-time geomagnetic activity measurements
   - **Update Frequency**: Every minute
   - **Purpose**: Space weather "mood" determination and trend analysis

4. **Electron Fluence Forecast**
   - **URL**: `https://services.swpc.noaa.gov/json/electron_fluence_forecast.json`
   - **Usage**: Electron storm predictions and radiation forecasting
   - **Coverage**: 3-day electron fluence forecasts
   - **Purpose**: Satellite safety and radiation monitoring

### **Additional NASA Resources Referenced**

1. **NASA Policy Documents**
   - SPD-41a: Scientific Information Policy for the Science Mission Directorate
   - Heliophysics Science Data Management Policy
   - NASA Data Management Handbook

2. **NASA Mission Data**
   - International Space Station (ISS) imagery and data
   - Mars 2020 Perseverance mission references
   - Solar observation mission data
   - Heliophysics fleet information

3. **Educational Content Sources**
   - NASA's Human Research Program radiation data
   - NASA navigation and GPS information
   - Climate change and satellite data
   - Space weather impact documentation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/space-apps-game.git
   cd space-apps-game
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
space-apps-game/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Base UI components (Button, Spinner, etc.)
│   │   ├── Earth3D.jsx     # 3D Earth visualization component
│   │   ├── Navbar.jsx      # Navigation component
│   │   └── Vocabulary*.jsx # Vocabulary learning components
│   ├── pages/              # Main application pages
│   │   ├── Home.jsx        # Landing page
│   │   ├── Start.jsx       # Story introduction
│   │   ├── Story*.jsx      # Story chapters
│   │   ├── AuroraLab.jsx   # Interactive aurora simulation
│   │   ├── AuroraForecast.jsx # Real-time aurora predictions
│   │   ├── KIndexDashboard.jsx # Space weather monitoring
│   │   ├── Quiz.jsx        # Interactive quiz system
│   │   ├── Games.jsx       # Games hub
│   │   └── *.jsx          # Other feature pages
│   ├── data/               # Static data and configurations
│   │   ├── quiz.json       # Quiz questions and answers
│   │   └── vocabulary.js   # Educational vocabulary content
│   ├── hooks/              # Custom React hooks
│   └── assets/             # Static assets
├── public/
│   ├── aurora-lab/         # Aurora Lab 3D simulation assets
│   ├── images/             # Game imagery and characters
│   └── videos/             # Background videos
└── dist/                   # Production build output
```

## 🎯 Educational Goals

- **Space Weather Awareness**: Understanding solar storms, auroras, and space radiation
- **NASA Mission Knowledge**: Learning about space weather monitoring and prediction
- **Scientific Literacy**: Interpreting real-time space weather data
- **Safety Education**: Understanding space weather impacts on technology and astronauts
- **Interactive Learning**: Engaging with complex concepts through games and simulations

## 🏆 NASA Space Apps Challenge 2024

This project was developed for the NASA Space Apps Challenge 2024, addressing the challenge of making space weather education accessible and engaging through interactive technology and real NASA data integration.

### Challenge Objectives Met:
- ✅ Educational content about space weather phenomena
- ✅ Real-time NASA and NOAA data integration
- ✅ Interactive simulations and visualizations
- ✅ Gamified learning experiences
- ✅ Accessibility for diverse learning styles
- ✅ Mobile-responsive design

## 🤝 Contributing

We welcome contributions to improve the educational value and technical implementation of this project. Please feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your improvements
4. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **NASA** for providing comprehensive space weather data and educational resources
- **NOAA Space Weather Prediction Center** for real-time space weather data APIs
- **NASA Space Apps Challenge** for inspiring innovative space education solutions
- **Three.js Community** for 3D visualization capabilities
- **React Community** for the robust development framework

## 📞 Contact & Support

For questions, suggestions, or support, please reach out through the project's GitHub repository or visit our live demo at [space-apps-game.vercel.app](https://space-apps-game.vercel.app).

---

**🌟 Made with ❤️ for space education and the NASA Space Apps Challenge 2025**