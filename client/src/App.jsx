import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import viteLogo from '/vite.svg'
import './index.css'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './pages/Signup';

function App() {
  return (
    <>
        <BrowserRouter>

         <Routes>
        <Route path="/" element={<Home />} />
                <Route path="/login" element={<Signup />} />
         </Routes>
         </BrowserRouter>
    </>
  );
}

export default App
