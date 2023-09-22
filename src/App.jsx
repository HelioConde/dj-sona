import "./Global.css";
import "./App.css";

import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Nav from "./Nav";
import Home from "./Home";
import History from "./History";
import Wallpapers from "./Wallpapers";
import Movies from "./Movies";

function App() {
  // Seu componente React (ou função JavaScript)

  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/historia" element={<History />} />
          <Route path="/wallpapers" element={<Wallpapers />} />
          <Route path="/videos" element={<Movies />} />
        </Routes>
      </Router> 
    </>
  );
}

export default App;
