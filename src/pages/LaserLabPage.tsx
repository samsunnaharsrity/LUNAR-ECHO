import React from 'react';
import { PageId } from '../types';
import { LaserLabSimulator } from '../components/LaserLabSimulator';
import { Sparkles, Info, ArrowRight, ShieldAlert, Cpu } from 'lucide-react';

interface LaserLabPageProps {
  onNavigate: (page: PageId) => void;
  reducedMotion: boolean;
}

export const LaserLabPage: React.FC<LaserLabPageProps> = ({
  onNavigate,
  reducedMotion
}) => {
  return (
    <div className="space-y-16">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#55DDF5] bg-[#0B1024] px-3 py-1 rounded-full border border-slate-800">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Educational Laboratory</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
          Run Your Own Lunar Laser Experiment
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          Welcome to the LUNAR ECHO Laser Lab. Test the fundamental physics of laser ranging by calculating and observing the round-trip travel time of light between Earth observatories and the Apollo 11 retroreflector array.
        </p>

        {/* Educational Model Scope Notice */}
        <div className="bg-[#0B1024] p-4 rounded-xl border border-slate-800 flex items-start gap-3 text-xs text-slate-300 max-w-3xl">
          <Info className="w-4 h-4 text-[#FFC56B] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white block mb-0.5">
              Educational Simulator Model Note
            </span>
            <p className="text-slate-400 leading-relaxed">
              This interactive environment calculates idealized vacuum propagation based on the exact constant c = 299,792.458 km/s (t = 2d / c). Real NASA CDDIS observations require tropospheric delay modeling, Earth tectonic drift vectors, and gravitational relativistic corrections.
            </p>
          </div>
        </div>
      </div>

      {/* Main Simulator & Challenges Workspace */}
      <LaserLabSimulator reducedMotion={reducedMotion} />

      {/* Section 5: The Science Behind the Measurement */}
      <section className="bg-[#0B1024] rounded-3xl border border-slate-800 p-6 sm:p-10 space-y-6">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-[#55DDF5]">
            Physical Corrections & Uncertainty
          </span>
          <h2 className="font-display text-2xl font-bold text-white">
            The Science Behind Real Measurements
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Why does taking a real measurement require millions of dollars in equipment, atomic clocks, and months of data reduction?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed">
          <div className="bg-[#111A30] p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[#55DDF5] font-mono font-bold block text-sm">
              01. Atmospheric Delay Modeling
            </span>
            <p className="text-slate-300">
              As laser pulses travel through Earth’s atmosphere, the higher refractive index slows light down. Ground stations record surface pressure, temperature, and relative humidity to model tropospheric delay (typically ~2.0 to 2.5 meters excess optical path length).
            </p>
          </div>

          <div className="bg-[#111A30] p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[#75E3B0] font-mono font-bold block text-sm">
              02. Picosecond Atomic Clocks
            </span>
            <p className="text-slate-300">
              Measuring the Moon with millimeter precision requires timing accuracy below 10 picoseconds (0.000000000010 seconds). Observatories calibrate pulse counters against hydrogen masers and GPS timing signals.
            </p>
          </div>

          <div className="bg-[#111A30] p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[#8A7CFF] font-mono font-bold block text-sm">
              03. Center-of-Mass Reduction
            </span>
            <p className="text-slate-300">
              Ground stations sit on tectonic plates that move centimeters each year, while the retroreflector sits on a wobbling Moon. Scientists translate surface-to-surface time of flight into Earth-center to Moon-center vectors.
            </p>
          </div>
        </div>
      </section>

      {/* CTA To Data Explorer */}
      <section className="bg-gradient-to-r from-[#0B1024] to-[#111A30] rounded-3xl border border-slate-800 p-8 text-center space-y-4">
        <h3 className="font-display text-2xl font-bold text-white">
          Compare Simulated Math with Authentic NASA CDDIS Data
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          See the actual historical records collected by McDonald Observatory and Apache Point APOLLO spanning from 1969 to today.
        </p>
        <button
          onClick={() => onNavigate('data-explorer')}
          className="px-6 py-3 rounded-xl bg-[#55DDF5] text-[#050816] hover:bg-[#75E3B0] font-semibold text-sm inline-flex items-center gap-2 transition-colors"
        >
          <span>Open Data Explorer</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
