import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import WatchPage from './pages/WatchPage'
import ApplyPage from './pages/ApplyPage'
import AboutPage from './pages/AboutPage'
import PartnersPage from './pages/PartnersPage'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#050505]">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/watch" element={<WatchPage />} />
          <Route path="/apply" element={<ApplyPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/partners" element={<PartnersPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
