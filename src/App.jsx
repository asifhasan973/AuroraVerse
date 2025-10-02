import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AuroraForecast from "./pages/AuroraForecast";
import Quiz from "./pages/Quiz";
import Start from "./pages/Start";
import Finale from "./pages/Finale";
import Story2 from "./pages/Story2"; // Story 2 route
import Story3 from "./pages/Story3"; // Story 3 route
import Story4 from "./pages/Story4"; // Story 4 route
import StormSafe from "./pages/StormSafe"; // StormSafe game route
import KIndexDashboard from "./pages/KIndexDashboard"; // K-Index Dashboard route
import ElectronFluenceForecast from "./pages/ElectronFluenceForecast"; // Electron Fluence Forecast route
import AIQuestionAnswer from "./pages/AIQuestionAnswer"; // AI Question Answer route
import Data from "./pages/Data"; // Data documents route
import SpaceDefense from "./pages/SpaceDefense"; // Space Defense game route
import Games from "./pages/Games"; // Games page route
import AuroraLab from "./pages/AuroraLab"; // Aurora Lab route

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aurora" element={<AuroraLab />} />
          <Route path="/forecast" element={<AuroraForecast />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/games" element={<Games />} />
          <Route path="/stormsafe" element={<StormSafe />} />
          <Route path="/finale" element={<Finale />} />
          <Route path="/start" element={<Start />} />
          <Route path="/story2" element={<Story2 />} />
          <Route path="/story3" element={<Story3 />} />
          <Route path="/story4" element={<Story4 />} />
          <Route path="/kindex" element={<KIndexDashboard />} />
          <Route path="/electrons" element={<ElectronFluenceForecast />} />
          <Route path="/ai-qa" element={<AIQuestionAnswer />} />
          <Route path="/data" element={<Data />} />
          <Route path="/space-defense" element={<SpaceDefense />} />
          <Route path="/aurora-lab" element={<AuroraLab />} />
        </Routes>
      </main>

    </div>

  );
}