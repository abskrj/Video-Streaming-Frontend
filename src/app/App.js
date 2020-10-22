import React from 'react';
import Home from '../container/home';
import Navbar from "../components/navbar";
import { BrowserRouter as Router } from "react-router-dom";


function App() {
  return (

    // Please follow BAM Naming Convention

    <div className="app">
      <Router>
        <Navbar />

        <Home />
      </Router>
    </div>
  );
}

export default App;
