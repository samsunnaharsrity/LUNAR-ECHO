import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { MissionPage } from './pages/MissionPage';
import { ReflectorPage } from './pages/ReflectorPage';
import { LaserLabPage } from './pages/LaserLabPage';
import { DataExplorerPage } from './pages/DataExplorerPage';
import { SciencePage } from './pages/SciencePage';
import { LearnPage } from './pages/LearnPage';
import { QuizPage } from './pages/QuizPage';
import { AboutPage } from './pages/AboutPage';
import { SourcesPage } from './pages/SourcesPage';
import { GlossaryPage } from './pages/GlossaryPage';

export default function App() {
  // Sync state with URL hash
  const getInitialPage = (): PageId => {
    const hash = window.location.hash.replace('#', '') as PageId;
    const validPages: PageId[] = [
      'home',
      'mission',
      'reflector',
      'laser-lab',
      'data-explorer',
      'science',
      'learn',
      'quiz',
      'about',
      'sources',
      'glossary'
    ];
    return validPages.includes(hash) ? hash : 'home';
  };

  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    return (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      localStorage.getItem('lunar_echo_reduced_motion') === 'true'
    );
  });

  // Handle URL hash changes (browser forward/back)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      if (hash && hash !== currentPage) {
        setCurrentPage(getInitialPage());
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentPage]);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  const handleToggleReducedMotion = () => {
    setReducedMotion((prev) => {
      const next = !prev;
      localStorage.setItem('lunar_echo_reduced_motion', String(next));
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#050816] text-[#F5F7FF] flex flex-col font-sans selection:bg-[#55DDF5]/20 selection:text-[#55DDF5]">
      {/* Global Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={handleToggleReducedMotion}
      />

      {/* Main Page Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {currentPage === 'home' && (
          <HomePage onNavigate={handleNavigate} reducedMotion={reducedMotion} />
        )}
        {currentPage === 'mission' && (
          <MissionPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'reflector' && (
          <ReflectorPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'laser-lab' && (
          <LaserLabPage onNavigate={handleNavigate} reducedMotion={reducedMotion} />
        )}
        {currentPage === 'data-explorer' && (
          <DataExplorerPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'science' && (
          <SciencePage onNavigate={handleNavigate} />
        )}
        {currentPage === 'learn' && (
          <LearnPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'quiz' && (
          <QuizPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'sources' && (
          <SourcesPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'glossary' && (
          <GlossaryPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
