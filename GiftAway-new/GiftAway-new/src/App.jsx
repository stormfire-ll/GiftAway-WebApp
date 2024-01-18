import { useState } from 'react'
import './App.css'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from './pages/Registration';
import GiftAway from './pages/GiftAway';



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/giftaway" element={<GiftAway />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
