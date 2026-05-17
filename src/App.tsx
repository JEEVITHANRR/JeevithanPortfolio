import { useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import TechStackSection from './components/TechStackSection';
import ProjectsSection from './components/ProjectsSection';
import AnalyticsSection from './components/AnalyticsSection';
import ExperienceSection from './components/ExperienceSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import { usePortfolio } from './hooks/usePortfolio';

export default function App() {
  const data = usePortfolio();

  // Lenis smooth scroll
  useEffect(() => {
    let lenis: any;
    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      const raf = (time: number) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }).catch(() => {
      // Lenis unavailable - fallback to native scroll
    });

    return () => { if (lenis) lenis.destroy(); };
  }, []);

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-cream font-kanit">
        <Navbar />
        <main>
          <HeroSection profile={data.profile} />
          <AboutSection profile={data.profile} />
          <TechStackSection skills={data.skills} techIcons={data.techIcons} />
          <ProjectsSection projects={data.projects} />
          <AnalyticsSection analyticsStats={data.analyticsStats} />
          <ExperienceSection experience={data.experience} />
          <ContactSection profile={data.profile} />
        </main>
        <Footer profile={data.profile} />
      </div>
    </>
  );
}
