import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Graphics from "./pages/Graphics";
import About from "./pages/About";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      
      <Header />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/graphs" element={<Graphics />} />
          <Route path="/about" element={<About />} />
          
          {/* ROUTE 404 VERSIONE BASE */}
          <Route path="*" element={<h1>404 - Page non trouvée</h1>} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}




