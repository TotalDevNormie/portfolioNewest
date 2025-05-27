import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import SkillsSection from "./components/SkillsSection";
import ContactSection from "./components/ContactSection";
import Home from "./components/3d-drawer/Home";

function App() {
  return (
    <main className="min-h-screen">
      <Navigation />

      <section id="hero">
        <HeroSection />
      </section>

      <section id="skills">
        <SkillsSection />
      </section>

      <section id="projects" className="min-h-screen">
        <div className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Interactive Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Explore my work through this interactive 3D filing cabinet made
              with CSS. Click and drag to rotate, then open the drawers to
              discover my projects.
            </p>
          </div>
          <Home />
        </div>
      </section>

      <section id="contact">
        <ContactSection />
      </section>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Vitaly Vlad Juhno</p>
        </div>
      </footer>
    </main>
  );
}

export default App;
