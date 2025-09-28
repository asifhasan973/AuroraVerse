import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AuroraLab from "./pages/AuroraLab";
import Quiz from "./pages/Quiz";
import AboutUs from "./pages/AboutUs";
import Start from "./pages/Start";
import Finale from "./pages/Finale";
import Story2 from "./pages/Story2"; // Story 2 route
import Story3 from "./pages/Story3"; // Story 3 route

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aurora" element={<AuroraLab />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/finale" element={<Finale />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/start" element={<Start />} />
          <Route path="/story2" element={<Story2 />} />
          <Route path="/story3" element={<Story3 />} />
        </Routes>
      </main>
      
    </div>

  );
}