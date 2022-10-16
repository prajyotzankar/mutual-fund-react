import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//import Components
import Navbar from './components/Navbar/navBar'
import Graph from './components/Graph/mainGraph/navGraph'
import BasicSearch from "./components/search/basic/basicSearch";
import AdvanceSearch from "./components/search/advance/advanceSearch";
import HomePage from "./components/HomePage/HomePage";

import './App.css'
// require('dotenv').config();

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/mainGraph" exact element={<Graph />} />
        <Route path="/basicSearch" element={<BasicSearch />} />
        <Route path="/advanceSearch" element={<AdvanceSearch />} />
      </Routes>
    </Router>
  ); 
}

export default App;
