import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar/navBar'
import Graph from'./components/Graph/mainGraph/navGraph'

import './App.css'
// require('dotenv').config();

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Graph />} />
      </Routes>
    </Router>
  ); 
}

export default App;
