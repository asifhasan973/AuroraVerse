import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AuroraLab from "./pages/AuroraLab";
import Quiz from "./pages/Quiz";
import AboutUs from "./pages/AboutUs";
import Start from "./pages/Start";
import Finale from "./pages/Finale";

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
        </Routes>
      </main>
      
    </div>

  );
}