import './App.css'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from './pages/Registration';
import GiftAway from './pages/GiftAway';
import Navbar from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {

  return (
    <BrowserRouter>
    <Navbar />
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
