import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Gold from "./pages/Gold";
import Forex from "./pages/Forex";
import Crypto from "./pages/Crypto";
import Settings from "./pages/Settings";
import Layout from "./components/Layout";
import About from "./pages/About"; 

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="gold" element={<Gold />} />
          <Route path="forex" element={<Forex />} />
          <Route path="crypto" element={<Crypto />} />
          <Route path="settings" element={<Settings />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
