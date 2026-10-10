import React, { useState } from 'react';
import { PageId } from '../types';
import {
  Calendar,
  Compass,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  Radio,
  Clock
} from 'lucide-react';

interface MissionPageProps {
  onNavigate: (page: PageId) => void;
}

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  significance: string;
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: '1969',
    title: 'Apollo 11 Deploys the First Lunar Retroreflector',
    description: 'On July 21, 1969, Neil Armstrong and Buzz Aldrin deployed the Lunar Laser Ranging Retroreflector (LRRR) in Mare Tranquillitatis during Apollo 11 EVA.',
    significance: 'First passive optical target left on the surface of another celestial body.'
  },
  {
    year: '1969',
    title: 'First Laser Returns at McDonald Observatory',
    description: 'On August 1, 1969, the 2.7-meter telescope at McDonald Observatory in Texas successfully detected the first reflected laser echo from the Apollo 11 array.',
    significance: 'Verified the optical functionality and began the continuous lunar ranging historical record.'
  },
  {
    year: '1971',
    title: 'Apollo 14 and Apollo 15 Expand the Lunar Network',
    description: 'Apollo 14 (Fra Mauro) and Apollo 15 (Hadley-Apennine) deployed additional retroreflector arrays. The Apollo 15 array features 300 corner cubes, providing 3x higher optical signal return.',
    significance: 'Creating a multi-station geometric network on the Moon enabled measuring lunar physical librations (wobbles) in all three spatial dimensions.'
  },
  {
    year: '2006',
    title: 'APOLLO at Apache Point Reaches Millimeter Precision',
    description: 'The Apache Point Observatory Lunar Laser-ranging Operation (APOLLO) in New Mexico began using a 3.5-meter telescope and avalanche photodiode arrays.',
    significance: 'Pushed timing precision down to 15 picoseconds, allowing millimeter-level determination of the Moon’s orbit.'
  },
  {
    year: '2010',
    title: 'Lunokhod 1 Re-discovered After 40 Years',
    description: 'Using high-resolution photography from NASA’s Lunar Reconnaissance Orbiter (LRO), the APOLLO team pinpointed the lost Soviet Lunokhod 1 rover and successfully shot laser pulses at its French corner-cube array.',
    significance: 'Added a fifth functional retroreflector site to the global lunar network after four decades of obscurity.'
  },
  {
    year: 'Present',
    title: 'Open Data Repositories at NASA CDDIS & ILRS',
    description: 'Decades of calibrated observations are archived permanently in the ILRS Consolidated Range Data (CRD) format at NASA CDDIS, freely accessible to celestial mechanics and relativity researchers globally.',
    significance: 'Demonstrates the unprecedented long-term value of open scientific data.'
  }
];

export const MissionPage: React.FC<MissionPageProps> = ({ onNavigate }) => {
  const [selectedTimelineIndex, setSelectedTimelineIndex] = useState(0);

  return (
    <div className="space-y-20">
      {/* SECTION 1: MISSION HERO */}
      <section className="bg-[#0B1024] rounded-3xl border border-slate-800 p-6 sm:p-10 lg:p-14 relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#55DDF5] bg-[#111A30] px-3 py-1 rounded-full border border-slate-700">
            <Compass className="w-3.5 h-3.5" />
            <span>Mission Background & Purpose</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            The Mission Behind the Echo
          </h1>

          <p className="text-base sm:text-lg text-[#DCE5F2] leading-relaxed">
            Why does a piece of hardware placed on lunar dust in 1969 remain one of the most productive scientific instruments in human history?
          </p>

          <p className="text-sm text-slate-300 leading-relaxed">
            During the Apollo program, billions of dollars were invested in cutting-edge electronics, cameras, and radio transmitters. Yet virtually every powered device succumbed to battery depletion or extreme temperature cycling within weeks. Only the Lunar Laser Ranging Retroreflector remains operational today, silently awaiting pulses of light from Earth.
          </p>
        </div>
      </section>

      {/* SECTION 2: HISTORICAL TIMELINE */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#55DDF5]">
              Historical Chronology
            </span>
            <h2 className="font-display text-2xl font-bold text-white mt-1">
              Multidecadal Timeline of Lunar Laser Ranging
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Verified Events & Milestone Records
          </span>
        </div>

        {/* Timeline Horizontal Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {TIMELINE_EVENTS.map((item, idx) => (
            <button
              key={item.year + idx}
              onClick={() => setSelectedTimelineIndex(idx)}
              className={`p-3 rounded-xl border text-left transition-colors font-mono ${
                selectedTimelineIndex === idx
                  ? 'bg-[#111A30] border-[#55DDF5] text-white shadow-md'
                  : 'bg-[#0B1024] border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-bold text-[#55DDF5]">{item.year}</div>
              <div className="text-[11px] truncate mt-1 text-slate-300">{item.title}</div>
            </button>
          ))}
        </div>

        {/* Selected Event Card */}
        <div className="bg-[#0B1024] rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold font-mono text-[#55DDF5] px-3 py-1 bg-[#111A30] rounded-lg border border-slate-700">
              {TIMELINE_EVENTS[selectedTimelineIndex].year}
            </span>
            <h3 className="font-display text-xl font-bold text-white">
              {TIMELINE_EVENTS[selectedTimelineIndex].title}
            </h3>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {TIMELINE_EVENTS[selectedTimelineIndex].description}
          </p>

          <div className="pt-3 border-t border-slate-800/80 text-xs font-mono text-[#75E3B0] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Scientific Significance: {TIMELINE_EVENTS[selectedTimelineIndex].significance}</span>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHY WAS IT LEFT BEHIND? */}
      <section className="bg-[#0B1024] rounded-3xl border border-slate-800 p-6 sm:p-10 space-y-6">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-[#55DDF5]">
            Passive Optical Device Architecture
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Why Was It Left Behind?
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            The Apollo 11 retroreflector was deliberately conceived from the start as a permanent, passive fixture rather than an active radio transmitter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Passive Instrument */}
          <div className="bg-[#050816] p-6 rounded-2xl border border-emerald-900/40 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase">
              <CheckCircle2 className="w-4 h-4" />
              <span>Passive Retroreflector Array</span>
            </div>
            <h3 className="font-display text-base font-bold text-white">
              Zero Power. Eternal Operation.
            </h3>
            <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
              <li>
                <strong>No batteries or electronics:</strong> Immune to battery chemical exhaustion, capacitor leakage, or radiation single-event upsets.
              </li>
              <li>
                <strong>Passive reflection:</strong> Does not generate or transmit a powered signal. Light directed at it is returned via total internal reflection.
              </li>
              <li>
                <strong>Thermal resilience:</strong> Engineered to withstand harsh lunar surface swings from -130°C in night to +120°C in direct sun.
              </li>
            </ul>
          </div>

          {/* Active Radio Transmitter */}
          <div className="bg-[#050816] p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-slate-400 font-mono text-xs font-bold uppercase">
              <Radio className="w-4 h-4" />
              <span>Active Radio Transmitters (ALSEP Packages)</span>
            </div>
            <h3 className="font-display text-base font-bold text-white">
              Limited Lifespan Equipment
            </h3>
            <ul className="text-xs text-slate-400 space-y-2 leading-relaxed">
              <li>
                <strong>Requires electrical power:</strong> Depended on SNAP-27 Radioisotope Thermoelectric Generators (RTGs) or solar arrays.
              </li>
              <li>
                <strong>Active radio signals:</strong> Transmitted radio telemetry until funding and hardware were decommissioned in September 1977.
              </li>
              <li>
                <strong>No ongoing telemetry:</strong> Silent since 1977; cannot be reached by ground stations today.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE SCIENTIFIC PROBLEM */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#FFC56B]">
              Observational Challenges
            </span>
            <h2 className="font-display text-2xl font-bold text-white mt-1">
              Why Measuring Lunar Distance Is Immensely Difficult
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Overcoming the 1/r^4 Photon Deficit
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0B1024] p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="text-xs font-mono text-[#FFC56B] font-bold">01. EXTREME DISTANCE</div>
            <h3 className="font-display text-base font-bold text-white">The 768,000 km Round Trip</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Light must traverse an astronomical vacuum gulf of ~384,400 km in each direction, experiencing double diffraction divergence that dilutes the beam from a small telescope into a multi-kilometer footprint.
            </p>
          </div>

          <div className="bg-[#0B1024] p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="text-xs font-mono text-[#FFC56B] font-bold">02. PHOTON STARVATION</div>
            <h3 className="font-display text-base font-bold text-white">1 Photon out of 10^17</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Due to geometric spread, out of 100 quadrillion photons transmitted in a 100-picosecond pulse, only a solitary photon typically enters the receiver aperture and hits the detector.
            </p>
          </div>

          <div className="bg-[#0B1024] p-5 rounded-2xl border border-slate-800 space-y-2">
            <div className="text-xs font-mono text-[#FFC56B] font-bold">03. ATMOSPHERIC TURBULENCE</div>
            <h3 className="font-display text-base font-bold text-white">Tropospheric Delay</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Earth’s air slows light down, adding approximately 2 meters of apparent excess distance at zenith. Observers must model barometric pressure, water vapor, and elevation with extreme rigor.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: OUR EDUCATIONAL SOLUTION */}
      <section className="bg-[#0B1024] rounded-3xl border border-slate-800 p-6 sm:p-10 space-y-6">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-[#55DDF5]">
            Pedagogical Architecture
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
            The LUNAR ECHO Educational Approach
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            We bridge the gap between abstract physics textbooks and real astrophysics through interactive experimentation and transparent data provenance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-[#111A30] p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-[#55DDF5] font-mono block">1. Visualize the Experiment</span>
            <p className="text-slate-300">
              Interactive 2D/3D canvases show real physical scales, pulses, and corner-cube reflection geometry.
            </p>
          </div>
          <div className="bg-[#111A30] p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-[#75E3B0] font-mono block">2. Manipulate Parameters</span>
            <p className="text-slate-300">
              Students adjust distance from perigee to apogee, observe travel times, and calculate velocity vectors.
            </p>
          </div>
          <div className="bg-[#111A30] p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-[#8A7CFF] font-mono block">3. Authentic Data Transparency</span>
            <p className="text-slate-300">
              Explicit separation between idealized student models and verified NASA CDDIS / ILRS historical records.
            </p>
          </div>
          <div className="bg-[#111A30] p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-[#FFC56B] font-mono block">4. Connect to Big Discoveries</span>
            <p className="text-slate-300">
              Link simple round-trip time calculations to tidal energy loss, lunar core geophysics, and Einstein’s General Relativity.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: MISSION AND VISION */}
      <section className="bg-gradient-to-br from-[#0B1024] to-[#111A30] rounded-3xl border border-slate-800 p-8 sm:p-12 text-center space-y-6">
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-[#55DDF5]">
            Core Values & Purpose
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Mission & Vision
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
          <div className="bg-[#050816] p-6 rounded-2xl border border-slate-800 space-y-2">
            <span className="font-mono text-xs font-bold text-[#55DDF5] uppercase">Our Mission</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Make lunar laser ranging understandable through interactive visualization, hands-on simulators, and evidence-based educational experiences that inspire future scientists and engineers.
            </p>
          </div>

          <div className="bg-[#050816] p-6 rounded-2xl border border-slate-800 space-y-2">
            <span className="font-mono text-xs font-bold text-[#75E3B0] uppercase">Our Vision</span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Help students and educators discover how long-term scientific instruments and open scientific datasets can continue generating revolutionary discoveries long after a space mission has concluded.
            </p>
          </div>
        </div>

        <div className="pt-4 flex justify-center">
          <button
            onClick={() => onNavigate('reflector')}
            className="px-6 py-3 rounded-xl bg-[#55DDF5] text-[#050816] hover:bg-[#75E3B0] font-semibold text-sm flex items-center gap-2 transition-colors shadow-md"
          >
            <span>Proceed to The Reflector Page</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
