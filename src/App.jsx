import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './admin/AdminPanel';

function PublicSite() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-gold selection:text-bg-primary">
      <Navbar />

      <main>
        <Hero />
        <About />
        <Menu />
        <Testimonials />
        <Gallery />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/*" element={<PublicSite />} />
      <Route path="/admin/*" element={<AdminPanel />} />
    </Routes>
  );
}

export default App;
