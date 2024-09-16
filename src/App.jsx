import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Info from "./components/Info";
import MythosEins from "./components/MythosEins";
import Menu from "./components/Menu";
import MythosAuswahl from "./components/MythosAuswahl";
import Impressum from "./components/Impressum";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Home" element={<Home />} />
        <Route path="Info" element={<Info />} />
        <Route path="MythosEins" element={<MythosEins />} />
        <Route path="MythosAuswahl" element={<MythosAuswahl />} />
        <Route path="Menu" element={<Menu />} />
        <Route path="Impressum" element={<Impressum />} />
      </Routes>
    </>
  );
}

export default App;
