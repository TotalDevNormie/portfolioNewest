import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import SkillsSection from "@/components/skills-section";
import ContactSection from "@/components/contact-section";
import Home from "@/components/3d-drawer/home";

export default function Portfolio() {
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
          <p>&copy; 2024 Vitaly Juhno. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
