import React from 'react';
import { PageId } from '../types';
import { ExternalLink, Compass } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#070B1A] border-t border-slate-800/90 text-slate-300 text-sm mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand & Mission Statement */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#0B1024] border border-slate-700 flex items-center justify-center overflow-hidden">
                <div className="w-1.5 h-1.5 rounded-full bg-[#55DDF5] shadow-[0_0_8px_#55DDF5]" />
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-white">
                LUNAR ECHO
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Helping students and the public understand how an optical instrument left on the Moon in 1969 continues to pioneer lunar science and fundamental physics.
            </p>
            <div className="pt-2 text-xs text-slate-400 font-mono">
              NASA Space Apps Challenge 2026
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono mb-4">
              Explore Pages
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-[#55DDF5] transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('mission')} className="hover:text-[#55DDF5] transition-colors">
                  The Mission Behind the Echo
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('reflector')} className="hover:text-[#55DDF5] transition-colors">
                  The Apollo 11 Reflector (LRRR)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('laser-lab')} className="hover:text-[#55DDF5] transition-colors">
                  Laser Lab Simulator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('data-explorer')} className="hover:text-[#55DDF5] transition-colors">
                  NASA CDDIS Data Explorer
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('science')} className="hover:text-[#55DDF5] transition-colors">
                  Science & Discoveries
                </button>
              </li>
            </ul>
          </div>

          {/* Educational Modules & Reference */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono mb-4">
              Learning & Evidence
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('learn')} className="hover:text-[#55DDF5] transition-colors">
                  Student Learning Modules
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('quiz')} className="hover:text-[#55DDF5] transition-colors">
                  Interactive Knowledge Quiz
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('glossary')} className="hover:text-[#55DDF5] transition-colors">
                  Scientific Glossary
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sources')} className="hover:text-[#55DDF5] transition-colors">
                  Sources & Methodology
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#55DDF5] transition-colors">
                  Team LUNAR ECHO
                </button>
              </li>
            </ul>
          </div>

          {/* Official Scientific Repositories */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono mb-4">
              Official Data Centers
            </h4>
            <ul className="space-y-3 text-xs">
              <li>
                <a
                  href="https://data.nasa.gov/dataset/cddis-llr-data"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-1.5 text-slate-300 hover:text-[#55DDF5] transition-colors"
                >
                  <span>NASA CDDIS LLR Archive</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
                <span className="text-[11px] text-slate-400 block mt-0.5">Primary NASA geodetic repository</span>
              </li>
              <li>
                <a
                  href="https://ilrs.gsfc.nasa.gov/science/scienceContributions/lunar_data.html"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-1.5 text-slate-300 hover:text-[#55DDF5] transition-colors"
                >
                  <span>ILRS Lunar Laser Ranging</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
                <span className="text-[11px] text-slate-400 block mt-0.5">Global station network and CRD files</span>
              </li>
              <li>
                <a
                  href="https://cddis.nasa.gov/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-1.5 text-slate-300 hover:text-[#55DDF5] transition-colors"
                >
                  <span>NASA Goddard Space Flight Center</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Team Acknowledgement */}
        <div className="pt-8 border-t border-slate-800/80 space-y-4">
          <div className="bg-[#0B1024] p-4 rounded-xl border border-slate-800 text-xs text-slate-400 leading-relaxed">
            <p className="font-semibold text-slate-300 mb-1 flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#75E3B0]" />
              Independent Educational Use Disclaimer
            </p>
            <p>
              LUNAR ECHO is an independent educational project created for NASA Space Apps Challenge 2026. It is not an official NASA website and does not imply NASA endorsement. All data references cite verified public archives from NASA CDDIS and ILRS.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 font-mono gap-3 pt-2">
            <div>
              Team LUNAR ECHO: Abdul Kader · Sumsun Nagar · Md Jibon Farhan · Atik Hasan Akash
            </div>
            <div>
              © 2026 Team LUNAR ECHO. Designed for science education.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
