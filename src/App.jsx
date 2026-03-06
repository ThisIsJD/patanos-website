import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
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

export default App;
