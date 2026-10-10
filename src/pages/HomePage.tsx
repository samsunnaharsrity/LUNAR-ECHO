import React from 'react';
import { PageId } from '../types';
import { InteractiveEarthMoon } from '../components/InteractiveEarthMoon';
import {
  ArrowRight,
  Sparkles,
  Calendar,
  Layers,
  Compass,
  Activity,
  Send,
  Eye,
  Cpu,
  BarChart2,
  ExternalLink,
  BookOpen
} from 'lucide-react';

// Generated asset paths
import heroImage from '../assets/images/hero_earth_moon_1791636692486.jpg';
import reflectorImage from '../assets/images/apollo_11_reflector_1791636704426.jpg';
import opticsImage from '../assets/images/corner_cube_optics_1791636727441.jpg';
import observatoryImage from '../assets/images/laser_observatory_1791636715971.jpg';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  reducedMotion: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, reducedMotion }) => {
  return (
    <div className="space-y-24">
      {/* SECTION 1: HERO */}
      <section className="relative pt-6 sm:pt-10 overflow-hidden">
        {/* Cinematic Backdrop with Measured Scrim */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-[#070B1A] min-h-[580px] lg:min-h-[640px] flex flex-col justify-end p-6 sm:p-10 lg:p-16">
          <img
            src={heroImage}
            alt="Cinematic cislunar space view showing Earth and Moon"
            className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-screen select-none pointer-events-none"
            referrerPolicy="no-referrer"
          />
          {/* Measured gradient scrim ensuring >4.5:1 text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/75 to-transparent" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-3xl space-y-5">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#55DDF5] uppercase bg-[#0B1024]/80 px-3 py-1 rounded-full border border-[#55DDF5]/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>A NASA Space Apps Challenge 2026 Project</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08] text-balance">
              THE MOON IS STILL TALKING.
            </h1>

            {/* Supporting Headline */}
            <h2 className="text-lg sm:text-xl font-medium text-[#DCE5F2] leading-snug">
              One forgotten instrument. Decades of discoveries. A signal connecting Earth and the Moon.
            </h2>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              In 1969, Apollo 11 astronauts deployed a small array of optical retroreflectors on the lunar surface. Today, lunar laser ranging experiments use reflected laser pulses to study the Earth–Moon system and test scientific models of our universe.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('mission')}
                className="px-6 py-3 rounded-xl bg-[#55DDF5] text-[#050816] hover:bg-[#75E3B0] font-semibold text-sm flex items-center gap-2 transition-colors shadow-lg shadow-[#55DDF5]/10"
              >
                <span>Explore the Mission</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('laser-lab')}
                className="px-6 py-3 rounded-xl bg-[#111A30] hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm flex items-center gap-2 transition-colors"
              >
                <span>Enter the Laser Lab</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE MISSION AT A GLANCE */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#55DDF5]">
              Documented Historical Facts
            </span>
            <h2 className="font-display text-2xl font-bold text-white mt-1">
              The Mission at a Glance
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Verified NASA Apollo 11 Mission Documentation
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1 */}
          <div className="bg-[#0B1024] p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#111A30] border border-slate-700 flex items-center justify-center text-[#55DDF5]">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="font-display text-3xl font-bold text-white tabular-nums">
              1969
            </div>
            <div className="text-xs font-bold text-slate-300">
              Apollo 11 Deployment
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Neil Armstrong and Buzz Aldrin deployed the Lunar Laser Ranging Retroreflector in Mare Tranquillitatis on July 21, 1969.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#0B1024] p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#111A30] border border-slate-700 flex items-center justify-center text-[#75E3B0]">
              <Layers className="w-5 h-5" />
            </div>
            <div className="font-display text-3xl font-bold text-white tabular-nums">
              100 Corner Cubes
            </div>
            <div className="text-xs font-bold text-slate-300">
              Optical Quartz Prisms
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The commonly documented count of optical corner cubes in the Apollo 11 array, machined from fused silica in a 10×10 pallet.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#0B1024] p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#111A30] border border-slate-700 flex items-center justify-center text-[#8A7CFF]">
              <Compass className="w-5 h-5" />
            </div>
            <div className="font-display text-3xl font-bold text-white">
              Laser Ranging
            </div>
            <div className="text-xs font-bold text-slate-300">
              Round-Trip Time-of-Flight
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The scientific technique measuring two-way transit time of short laser pulses to determine distance with millimeter accuracy.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-[#0B1024] p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#111A30] border border-slate-700 flex items-center justify-center text-[#FFC56B]">
              <Activity className="w-5 h-5" />
            </div>
            <div className="font-display text-3xl font-bold text-white">
              Decades of Science
            </div>
            <div className="text-xs font-bold text-slate-300">
              Multidecadal Record
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Lunar laser ranging observations span over 55 continuous years, forming one of the longest continuous active experiments in space history.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: INTERACTIVE EARTH-MOON VISUALIZATION */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#55DDF5]">
              Interactive Simulation
            </span>
            <h2 className="font-display text-2xl font-bold text-white mt-1">
              Earth–Moon Laser Pulse Transit
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Interactive Model · Speed of Light Simulation
          </span>
        </div>

        <InteractiveEarthMoon reducedMotion={reducedMotion} />
      </section>

      {/* SECTION 4: THE FORGOTTEN INSTRUMENT */}
      <section className="bg-[#0B1024] rounded-3xl border border-slate-800 p-6 sm:p-10 lg:p-12 space-y-8">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-[#55DDF5]">
            Engineering & Passive Optics
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
            A SMALL INSTRUMENT. AN EXTRAORDINARY LEGACY.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            While every other Apollo 11 instrument ceased operation when batteries or solar panels died, the retroreflector remains fully functional today. It houses zero electronics, zero wires, and zero batteries. Its pure optical geometry makes it an eternal mirror on the Moon.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Instrument photo card */}
          <div className="bg-[#050816] rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between">
            <div className="relative h-64 overflow-hidden">
              <img
                src={reflectorImage}
                alt="Apollo 11 Retroreflector on the Moon"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-2 left-2 bg-[#0B1024]/80 px-2 py-1 rounded text-[11px] font-mono text-slate-300">
                Apollo 11 LRRR Pallet (Mare Tranquillitatis)
              </div>
            </div>
            <div className="p-5 space-y-2">
              <h3 className="font-display text-base font-bold text-white">
                The 100-Cube Aluminum Array
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tilted at ~37° to compensate for lunar orientation, the pallet houses 100 fused-silica retroreflectors with cylindrical sunshades to minimize thermal distortion.
              </p>
              <button
                onClick={() => onNavigate('reflector')}
                className="text-xs font-semibold text-[#55DDF5] hover:text-[#75E3B0] flex items-center gap-1 pt-2 transition-colors"
              >
                <span>Read Full Instrument Technical Breakdown</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Corner-cube optics schematic card */}
          <div className="bg-[#050816] rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between">
            <div className="relative h-64 overflow-hidden">
              <img
                src={opticsImage}
                alt="Corner-Cube Prism Optical Raytrace Diagram"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-2 left-2 bg-[#0B1024]/80 px-2 py-1 rounded text-[11px] font-mono text-slate-300">
                Corner-Cube Internal Reflection Physics
              </div>
            </div>
            <div className="p-5 space-y-2">
              <h3 className="font-display text-base font-bold text-white">
                Passive Optical Retroreflection
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Three mutually perpendicular mirror surfaces bounce incoming light rays three times, returning the beam exactly 180° back along its incoming vector regardless of the incidence angle.
              </p>
              <button
                onClick={() => onNavigate('reflector')}
                className="text-xs font-semibold text-[#75E3B0] hover:text-[#55DDF5] flex items-center gap-1 pt-2 transition-colors"
              >
                <span>Open Interactive Raytracer in The Reflector</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: HOW LUNAR LASER RANGING WORKS */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-[#55DDF5]">
            Step-by-Step Scientific Process
          </span>
          <h2 className="font-display text-3xl font-bold text-white">
            How Lunar Laser Ranging Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            From Earth laser launch to picosecond detection and gravitational analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="bg-[#0B1024] p-5 rounded-2xl border border-slate-800 space-y-3 relative">
            <div className="text-xs font-mono font-bold text-[#55DDF5]">01 / TRANSMIT</div>
            <div className="w-9 h-9 rounded-xl bg-[#111A30] border border-slate-700 flex items-center justify-center text-[#55DDF5]">
              <Send className="w-4 h-4" />
            </div>
            <h3 className="font-display text-base font-bold text-white">
              Launch High-Power Pulse
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              An Earth-based observatory fires a short laser pulse (approx. 100 picoseconds, 10^17 photons) through a telescope toward the Moon.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-[#0B1024] p-5 rounded-2xl border border-slate-800 space-y-3 relative">
            <div className="text-xs font-mono font-bold text-[#8A7CFF]">02 / REFLECT</div>
            <div className="w-9 h-9 rounded-xl bg-[#111A30] border border-slate-700 flex items-center justify-center text-[#8A7CFF]">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="font-display text-base font-bold text-white">
              Retroreflection on Moon
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              The Apollo 11 retroreflector array returns light directly toward its source direction without absorbing or scattering the pulse into space.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-[#0B1024] p-5 rounded-2xl border border-slate-800 space-y-3 relative">
            <div className="text-xs font-mono font-bold text-[#75E3B0]">03 / DETECT</div>
            <div className="w-9 h-9 rounded-xl bg-[#111A30] border border-slate-700 flex items-center justify-center text-[#75E3B0]">
              <Eye className="w-4 h-4" />
            </div>
            <h3 className="font-display text-base font-bold text-white">
              Count Single Photons
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              A high-precision detector on Earth captures the returning photons (often only 1 single photon) and logs its arrival time to picosecond accuracy.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-[#0B1024] p-5 rounded-2xl border border-slate-800 space-y-3 relative">
            <div className="text-xs font-mono font-bold text-[#FFC56B]">04 / ANALYZE</div>
            <div className="w-9 h-9 rounded-xl bg-[#111A30] border border-slate-700 flex items-center justify-center text-[#FFC56B]">
              <Cpu className="w-4 h-4" />
            </div>
            <h3 className="font-display text-base font-bold text-white">
              Model Orbit & Physics
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Scientists compare observed round-trip delays against complex orbital, atmospheric, and relativistic models to deduce physical parameters.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: EXPLORE THE SCIENCE */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#55DDF5]">
              Fundamental Physics & Geodesy
            </span>
            <h2 className="font-display text-2xl font-bold text-white mt-1">
              Explore the Science
            </h2>
          </div>
          <button
            onClick={() => onNavigate('science')}
            className="text-xs text-[#55DDF5] hover:text-[#75E3B0] flex items-center gap-1 font-mono transition-colors"
          >
            <span>View All Scientific Discoveries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0B1024] p-6 rounded-2xl border border-slate-800 space-y-3 hover:border-[#55DDF5]/40 transition-colors">
            <span className="text-xs font-mono text-[#55DDF5]">01. GEODETIC PRECISION</span>
            <h3 className="font-display text-lg font-bold text-white">
              Measure Earth–Moon Distance
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              By measuring time of flight with picosecond timers, scientists track the exact distance to the Moon down to millimeter precision, discovering the 3.8 cm/year tidal recession rate.
            </p>
          </div>

          <div className="bg-[#0B1024] p-6 rounded-2xl border border-slate-800 space-y-3 hover:border-[#8A7CFF]/40 transition-colors">
            <span className="text-xs font-mono text-[#8A7CFF]">02. CELESTIAL MECHANICS</span>
            <h3 className="font-display text-lg font-bold text-white">
              Study Orbit & Librations
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Repeated multi-decade observations map the Moon’s complex gravitational wobbles (physical librations), providing evidence of a fluid or partially molten lunar core.
            </p>
          </div>

          <div className="bg-[#0B1024] p-6 rounded-2xl border border-slate-800 space-y-3 hover:border-[#75E3B0]/40 transition-colors">
            <span className="text-xs font-mono text-[#75E3B0]">03. GENERAL RELATIVITY</span>
            <h3 className="font-display text-lg font-bold text-white">
              Test Fundamental Physics
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Verifies Einstein’s Equivalence Principle: confirming Earth and the Moon accelerate toward the Sun at identical rates to within parts in 10^13.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7: DATA PREVIEW */}
      <section className="bg-[#0B1024] rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950/70 text-emerald-300 border border-emerald-800/80">
                REAL SOURCE DATA
              </span>
              <span className="text-xs text-slate-400 font-mono">NASA CDDIS / ILRS</span>
            </div>
            <h3 className="font-display text-lg font-bold text-white mt-1">
              Live Scientific Data Archive Preview
            </h3>
          </div>

          <button
            onClick={() => onNavigate('data-explorer')}
            className="px-4 py-2 rounded-xl bg-[#55DDF5] text-[#050816] hover:bg-[#75E3B0] font-semibold text-xs flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <span>Open Full Data Explorer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="bg-[#111A30] p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px]">DATA SOURCE</span>
            <span className="text-white font-bold block mt-0.5">NASA CDDIS / ILRS</span>
          </div>
          <div className="bg-[#111A30] p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px]">TARGET ARRAY</span>
            <span className="text-[#55DDF5] font-bold block mt-0.5">Apollo 11 LRRR</span>
          </div>
          <div className="bg-[#111A30] p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px]">FORMAT</span>
            <span className="text-[#75E3B0] font-bold block mt-0.5">CRD Normal Points</span>
          </div>
          <div className="bg-[#111A30] p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px]">OBSERVATIONS</span>
            <span className="text-white font-bold block mt-0.5">20 Verified Records</span>
          </div>
        </div>
      </section>

      {/* SECTION 8: STUDENT LEARNING CTA */}
      <section className="bg-gradient-to-r from-[#0B1024] via-[#111A30] to-[#0B1024] rounded-3xl border border-slate-800 p-8 sm:p-12 text-center space-y-5">
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-[#55DDF5]">
            Student Interactive Education
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
            DISCOVER THE SCIENCE. FOLLOW THE SIGNAL.
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Explore the instrument, run a laser-ranging experiment, and learn how scientific observations become discoveries.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap justify-center items-center gap-3">
          <button
            onClick={() => onNavigate('learn')}
            className="px-6 py-3 rounded-xl bg-[#55DDF5] text-[#050816] hover:bg-[#75E3B0] font-semibold text-sm flex items-center gap-2 transition-colors shadow-lg"
          >
            <BookOpen className="w-4 h-4" />
            <span>Start Learning Modules</span>
          </button>

          <button
            onClick={() => onNavigate('quiz')}
            className="px-6 py-3 rounded-xl bg-[#050816] hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm flex items-center gap-2 transition-colors"
          >
            <span>Test Your Knowledge (Quiz)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
