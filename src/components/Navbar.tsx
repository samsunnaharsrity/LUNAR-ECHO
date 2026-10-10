import React, { useState } from 'react';
import { PageId } from '../types';
import { Menu, X, Radio, ArrowUpRight, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  reducedMotion,
  onToggleReducedMotion
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'mission', label: 'Mission' },
    { id: 'reflector', label: 'The Reflector' },
    { id: 'laser-lab', label: 'Laser Lab' },
    { id: 'data-explorer', label: 'Data Explorer' },
    { id: 'science', label: 'Science' },
    { id: 'learn', label: 'Learn' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'about', label: 'About' },
    { id: 'sources', label: 'Sources' },
    { id: 'glossary', label: 'Glossary' }
  ];

  const handleNav = (id: PageId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#050816]/90 backdrop-blur-md border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Zone */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#55DDF5] rounded-md py-1"
          >
            {/* LUNAR ECHO custom logo: lunar horizon, reflected laser pulse, signal waves */}
            <div className="relative w-8 h-8 rounded-lg bg-[#0B1024] border border-slate-700/80 flex items-center justify-center overflow-hidden shrink-0 group-hover:border-[#55DDF5]/60 transition-colors">
              {/* Lunar horizon curve */}
              <div className="absolute -bottom-2 -left-2 -right-2 h-5 rounded-t-full bg-slate-700/60" />
              {/* Reflected laser pulse */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#55DDF5] shadow-[0_0_8px_#55DDF5]" />
              </div>
              {/* Signal wave arc */}
              <div className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full border-t border-r border-[#8A7CFF]/80" />
            </div>

            <div className="flex flex-col">
              <span className="font-display text-base font-bold tracking-tight text-[#F5F7FF] whitespace-nowrap group-hover:text-[#55DDF5] transition-colors">
                LUNAR ECHO
              </span>
              <span className="text-[10px] tracking-wider text-slate-400 font-mono hidden sm:inline">
                APOLLO 11 LRRR · 1969
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#55DDF5] ${
                    isActive
                      ? 'text-[#55DDF5] bg-[#111A30] font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Action and Utility Zone */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Motion toggle for accessibility */}
            <button
              onClick={onToggleReducedMotion}
              title={reducedMotion ? 'Enable smooth animations' : 'Reduce animations for accessibility'}
              className="p-1.5 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 text-xs hidden sm:flex items-center gap-1 font-mono transition-colors"
            >
              <Radio className={`w-3.5 h-3.5 ${reducedMotion ? 'text-amber-400' : 'text-[#75E3B0]'}`} />
              <span className="text-[11px]">{reducedMotion ? 'Reduced Motion' : 'Motion'}</span>
            </button>

            {/* Highlighted CTA */}
            <button
              onClick={() => handleNav('mission')}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#55DDF5] text-[#050816] hover:bg-[#75E3B0] transition-colors whitespace-nowrap flex items-center gap-1.5 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Explore Mission</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#55DDF5]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0B1024] border-b border-slate-800 px-4 pt-3 pb-5 shadow-2xl">
          <div className="grid grid-cols-2 gap-1.5 mb-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`text-left px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                  currentPage === link.id
                    ? 'text-[#55DDF5] bg-[#111A30] font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
            <button
              onClick={onToggleReducedMotion}
              className="flex items-center gap-1.5 hover:text-slate-200"
            >
              <Radio className={`w-3.5 h-3.5 ${reducedMotion ? 'text-amber-400' : 'text-[#75E3B0]'}`} />
              <span>{reducedMotion ? 'Reduced Motion: ON' : 'Animation: Active'}</span>
            </button>
            <span className="flex items-center gap-1 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-[#75E3B0]" />
              Space Apps 2026
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
