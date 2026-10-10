import React, { useState } from 'react';
import { PageId } from '../types';
import {
  Sparkles,
  Compass,
  ArrowRight,
  Activity,
  Layers,
  Scale,
  RefreshCw,
  Info,
  CheckCircle2
} from 'lucide-react';

interface SciencePageProps {
  onNavigate: (page: PageId) => void;
}

export const SciencePage: React.FC<SciencePageProps> = ({ onNavigate }) => {
  // Interactive Lunar Recession Calculator State
  const [recessionYears, setRecessionYears] = useState<number>(57); // Since 1969
  const recessionRateCmPerYear = 3.82; // Williams et al.
  const accumulatedRecessionMeters = (recessionYears * recessionRateCmPerYear) / 100;
  const dayLengtheningMicroseconds = recessionYears * 17; // ~1.7 ms per century = 17 microseconds per year

  // Interactive Equivalence Principle Test State
  const [etaDelta, setEtaDelta] = useState<string>('0.0000000000000'); // < 10^-13

  return (
    <div className="space-y-20">
      {/* Page Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#55DDF5] bg-[#0B1024] px-3 py-1 rounded-full border border-slate-800">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Fundamental Physics & Geodesy</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
          What Can a Laser Tell Us About the Moon?
        </h1>

        <p className="text-base sm:text-lg text-[#DCE5F2] max-w-3xl leading-relaxed">
          From measuring the 3.8 cm/year spiral of the Moon’s orbit to probing its molten core and testing Einstein’s General Relativity, explore five decades of monumental discoveries.
        </p>
      </div>

      {/* SECTION 1: MEASURE LUNAR DISTANCE */}
      <section className="bg-[#0B1024] rounded-3xl border border-slate-800 p-6 sm:p-10 space-y-6">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-[#55DDF5]">
            Principle 01: Geodesy & Timing
          </span>
          <h2 className="font-display text-2xl font-bold text-white">
            Measuring the Moon to the Millimeter
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            In standard classroom physics, distance is simply half the round-trip travel time multiplied by the speed of light ($d = ct/2$). But transforming this into sub-centimeter geodesy requires accounting for real-world physical complexities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
          <div className="bg-[#111A30] p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[#55DDF5] font-mono font-bold block text-sm">
              Classroom Idealization vs. Precision Geodesy
            </span>
            <p className="text-slate-300">
              A high school calculation uses an average distance of 384,400 km and assumes light moves in a flat vacuum between point particles. Real lunar laser ranging tracks an elliptical orbit oscillating between 363,104 km (perigee) and 405,696 km (apogee) influenced by solar and planetary gravitational perturbations.
            </p>
          </div>

          <div className="bg-[#111A30] p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[#75E3B0] font-mono font-bold block text-sm">
              Centroid Analysis & SPAD Arrays
            </span>
            <p className="text-slate-300">
              Modern facilities like APOLLO at Apache Point record hundreds of photon arrival timestamps, fitting a Gaussian response curve to find the pulse centroid with a timing precision better than 15 picoseconds—equivalent to less than 2.3 millimeters of ranging uncertainty!
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: UNDERSTAND THE LUNAR ORBIT & RECESSION CALCULATOR */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#75E3B0]">
              Planetary Evolution
            </span>
            <h2 className="font-display text-2xl font-bold text-white mt-1">
              Discovery: The Moon Is Spiraling Away (3.8 cm / year)
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Tidal Dissipation & Angular Momentum
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 bg-[#0B1024] p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="font-display text-lg font-bold text-white">
              Why Does the Moon Recede?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Earth rotates once every 24 hours, while the Moon orbits once every 27.3 days. Friction between ocean water and the continental shelves drags Earth’s tidal bulges slightly ahead of the Earth–Moon orbital line.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              This forward gravitational pull exerts a continuous torque on the Moon, transferring angular momentum from Earth’s spin into the lunar orbit. As a result, the Moon spirals outward by <strong>3.82 ± 0.07 centimeters per year</strong>, while Earth’s day lengthens by approximately 1.7 milliseconds every century.
            </p>
            <div className="bg-[#111A30] p-4 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#75E3B0] shrink-0 mt-0.5" />
              <span>
                Lunar Laser Ranging provided the world’s first direct, empirical measurement of this tidal dissipation rate, confirming geomechanical models of ocean friction.
              </span>
            </div>
          </div>

          {/* Interactive Lunar Recession Calculator */}
          <div className="lg:col-span-5 bg-[#111A30] p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4 font-mono">
            <div>
              <span className="text-slate-400 text-xs uppercase tracking-wider block mb-1">
                Interactive Recession Calculator
              </span>
              <h4 className="font-display text-base font-bold text-white font-sans">
                Extrapolate Lunar Drift
              </h4>

              <div className="mt-4 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300">Elapsed Timespan:</span>
                  <span className="text-[#55DDF5] font-bold text-sm">
                    {recessionYears} Years
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={200}
                  step={1}
                  value={recessionYears}
                  onChange={(e) => setRecessionYears(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#55DDF5]"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <button onClick={() => setRecessionYears(57)} className="underline hover:text-[#55DDF5]">
                    Apollo 11 Era (57 yrs)
                  </button>
                  <button onClick={() => setRecessionYears(100)} className="underline hover:text-[#55DDF5]">
                    1 Century
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-[#050816] p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">TOTAL ORBITAL EXPANSION</span>
                <span className="text-2xl font-bold text-[#75E3B0] tabular-nums">
                  +{accumulatedRecessionMeters.toFixed(2)} meters
                </span>
                <span className="text-slate-400 text-[10px] block">
                  ({(recessionYears * recessionRateCmPerYear).toFixed(1)} cm total drift)
                </span>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <span className="text-slate-400 block text-[10px]">EARTH DAY LENGTH INCREASE</span>
                <span className="text-base font-bold text-[#FFC56B] tabular-nums">
                  +{(dayLengtheningMicroseconds / 1000).toFixed(2)} ms
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: STUDY LUNAR ROTATION AND PHYSICAL EFFECTS */}
      <section className="bg-[#0B1024] rounded-3xl border border-slate-800 p-6 sm:p-10 space-y-6">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-[#8A7CFF]">
            Interior Geophysics & General Relativity
          </span>
          <h2 className="font-display text-2xl font-bold text-white">
            Probing the Lunar Core and Einstein’s Relativity
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            By establishing multiple reflector sites (Apollo 11, 14, 15, and Lunokhod 1 & 2), scientists unlocked a 3-dimensional coordinate system on the lunar surface.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed">
          <div className="bg-[#111A30] p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[#8A7CFF] font-mono font-bold block text-sm">
              01. The Molten Lunar Core
            </span>
            <p className="text-slate-300">
              The Moon wobbles slightly in space (physical librations) due to gravitational torques from Earth and the Sun. LLR measurements detected a specific phase lag and dissipation in this wobble that could only occur if the Moon possesses a fluid or partially molten core at its core-mantle boundary (Williams et al., 2001).
            </p>
          </div>

          <div className="bg-[#111A30] p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[#55DDF5] font-mono font-bold block text-sm">
              02. The Equivalence Principle
            </span>
            <p className="text-slate-300">
              Does a body with substantial gravitational binding energy (Earth) fall at the exact same acceleration in the Sun’s gravity as a body with much less self-energy (the Moon)? LLR confirms they fall identically to within &Delta;a / a &lt; 1.3 &times; 10<sup>-13</sup>, providing the most stringent Solar System validation of Einstein’s Strong Equivalence Principle.
            </p>
          </div>

          <div className="bg-[#111A30] p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[#75E3B0] font-mono font-bold block text-sm">
              03. Constancy of Newton’s G
            </span>
            <p className="text-slate-300">
              Some alternative cosmological theories suggest Newton’s gravitational constant G might weaken as the universe expands. By tracking the lunar orbit for over five decades, LLR limits any variation to |&Delta;G/G| &lt; 7 &times; 10<sup>-14</sup> per year—confirming G has remained constant throughout modern history.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: LONG-TERM VALUE OF SCIENTIFIC INSTRUMENTS */}
      <section className="bg-gradient-to-r from-[#0B1024] to-[#111A30] rounded-3xl border border-slate-800 p-8 sm:p-12 space-y-6">
        <div className="max-w-2xl space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-[#FFC56B]">
            Data Preservation & Future Missions
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
            The Long-Term Value of Enduring Science
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            The greatest scientific questions often cannot be solved during a single mission lifecycle. Long-term instruments and open data curation make discoveries possible across generations of scientists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="bg-[#050816] p-4 rounded-xl border border-slate-800">
            <span className="text-[#55DDF5] font-bold block mb-1">Decadal Baselines</span>
            <p className="text-slate-400 font-sans">
              Detecting subtle signals like tidal recession (3.8 cm/yr) or gravitational time variation requires 40+ years of uninterrupted data points.
            </p>
          </div>

          <div className="bg-[#050816] p-4 rounded-xl border border-slate-800">
            <span className="text-[#75E3B0] font-bold block mb-1">Open Standards</span>
            <p className="text-slate-400 font-sans">
              Standard formats like ILRS CRD ensure that a dataset recorded in 1969 can still be parsed, audited, and synthesized by graduate students in 2026.
            </p>
          </div>

          <div className="bg-[#050816] p-4 rounded-xl border border-slate-800">
            <span className="text-[#8A7CFF] font-bold block mb-1">Artemis Synergy</span>
            <p className="text-slate-400 font-sans">
              The high-precision lunar ephemerides established by Apollo 11 LRRR provide the navigational coordinate foundation for upcoming NASA Artemis crewed lunar landings.
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-center">
          <button
            onClick={() => onNavigate('learn')}
            className="px-6 py-3 rounded-xl bg-[#55DDF5] text-[#050816] hover:bg-[#75E3B0] font-semibold text-sm flex items-center gap-2 transition-colors"
          >
            <span>Start Student Learning Modules</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
