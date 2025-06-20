import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import VisualArt from "./components/VisualArt";
import Experience from "./components/Experience";

// Individual work components
import WhereAreYouFrom from "./components/works/WhereAreYouFrom";
import LettersToMyMom from "./components/works/LettersToMyMom";
import DiffusionMe from "./components/works/DiffusionMe";
import Prl from "./components/works/Prl";
import PrlMobile from "./components/works/PrlMobile";
import Tangent from "./components/works/Tangent";
import StyleScape from "./components/works/StyleScape";

import "./App.css";

// Main App component
function App() {
  return (
    <Router>
      <div
        className="min-h-screen"
        // style={{
        //   background: "linear-gradient(135deg, #FFFFFF 0%, #FFF5F0 63%, #F3F3F3 100%)",
        // }}
      >
        <div className="mx-auto px-8 py-12">
          <div className="grid grid-cols-3 lg:grid-cols-5 gap-12">
            {/* Left Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-12">
                <Navigation />
              </div>
            </aside>

            {/* Main Content */}
            <main className="col-span-2 lg:col-span-4">
              <Routes>
                <Route path="/" element={<Home />} />

                {/* Individual work routes */}
                <Route path="/work/where-are-you-from" element={<WhereAreYouFrom />} />
                <Route path="/work/letters-to-my-mom" element={<LettersToMyMom />} />
                <Route path="/work/diffusion-me" element={<DiffusionMe />} />
                <Route path="/work/prl" element={<Prl />} />
                <Route path="/work/prl-mobile" element={<PrlMobile />} />
                <Route path="/work/tangent" element={<Tangent />} />
                <Route path="/work/stylescape" element={<StyleScape />} />

                {/* Other routes */}
                <Route path="/experience" element={<Experience />} />
                <Route path="/art" element={<VisualArt />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
