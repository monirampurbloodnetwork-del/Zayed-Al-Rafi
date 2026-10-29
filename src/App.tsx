import React, { useEffect, useState } from 'react';
import { LanguageCode } from './config/portfolioConfig';
import { useScrollVideoController } from './hooks/useScrollVideoController';
import { BackgroundVideoStage } from './components/BackgroundVideoStage';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { EducationSection } from './components/EducationSection';
import { SkillsInterestsSection } from './components/SkillsInterestsSection';
import { FutureGoalsSection } from './components/FutureGoalsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [lang, setLang] = useState<LanguageCode>('en');
  const videoController = useScrollVideoController();

  useEffect(() => {
    document.documentElement.lang = lang === 'bn' ? 'bn' : 'en';
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'bn' : 'en'));
  };

  return (
    <div className="relative min-h-screen min-h-[100dvh] text-[#F5F7FC]">
      {/* Accessible Skip Link */}
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-xl focus:bg-[#77D9FF] focus:px-4 focus:py-2.5 focus:text-sm focus:font-bold focus:text-[#080D18]"
      >
        Skip to content
      </a>

      {/* Persistent Fixed Full-Viewport Scroll-Activated Background Video Stage */}
      <BackgroundVideoStage controller={videoController} />

      {/* Foreground Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar
          activeSection={videoController.activeSection}
          lang={lang}
          onToggleLang={toggleLang}
          progressBarRef={videoController.progressBarRef}
        />

        <main className="flex-1">
          <HeroSection lang={lang} />
          <AboutSection lang={lang} />
          <EducationSection lang={lang} />
          <SkillsInterestsSection lang={lang} />
          <FutureGoalsSection lang={lang} />
          <ContactSection lang={lang} />
        </main>

        <Footer lang={lang} />
      </div>
    </div>
  );
};

export default App;
