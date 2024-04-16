import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Canvas, Home, NavBar } from './components/index.js';
import Features from './components/features/Features.jsx';

const AppRouter = () => {
  return (
    <Router>
    <NavBar />
      <Routes>
        <Route path="/" element ={<Home />} />
        <Route path="/canvas" element={<Canvas/>} />
        <Route path="/features" element={<Features/>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
