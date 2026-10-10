import React, { useState } from 'react';
import { PageId } from '../types';
import { CornerCubeViewer } from '../components/CornerCubeViewer';
import {
  ExternalLink,
  Layers,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ShieldAlert,
  Info
} from 'lucide-react';

import reflectorImage from '../assets/images/apollo_11_reflector_1791636704426.jpg';
import opticsImage from '../assets/images/corner_cube_optics_1791636727441.jpg';

interface ReflectorPageProps {
  onNavigate: (page: PageId) => void;
}

interface MythFactItem {
  id: number;
  statement: string;
  isFact: boolean;
  explanation: string;
}

const MYTH_FACTS: MythFactItem[] = [
  {
    id: 1,
    statement: 'The Apollo 11 retroreflector generates and transmits a laser beam or radio signal by itself.',
    isFact: false,
    explanation: 'MYTH: The retroreflector is an entirely passive optical target with zero power, batteries, or transmitters. It only reflects laser light fired at it from high-power telescopes on Earth.'
  },
  {
    id: 2,
    statement: 'A single successful laser pulse measurement is enough to answer every question about lunar orbit and gravity.',
    isFact: false,
    explanation: 'MYTH: A single pulse provides only one instant of distance. To detect tiny effects like lunar recession (3.8 cm/year) or rotational librations, scientists require tens of thousands of measurements over multiple decades.'
  },
  {
    id: 3,
    statement: 'A computer simulation of laser light travel is scientifically identical to an observational measurement.',
    isFact: false,
    explanation: 'MYTH: Simulations are mathematical calculations based on assumed physical laws. Observations are physical empirical detections that capture the real universe—including unexpected phenomena, equipment noise, and scientific anomalies.'
  },
  {
    id: 4,
    statement: 'A completely passive optical instrument on the Moon can remain scientifically valuable for more than 50 years.',
    isFact: true,
    explanation: 'FACT: Because there are no moving parts, batteries, or degradable electronic chips, the quartz prisms continue to return laser photons over half a century after Armstrong and Aldrin placed them on the Moon.'
  }
];

export const ReflectorPage: React.FC<ReflectorPageProps> = ({ onNavigate }) => {
  const [revealedCardId, setRevealedCardId] = useState<number | null>(null);

  return (
    <div className="space-y-20">
      {/* SECTION 1: INSTRUMENT HERO */}
      <section className="bg-[#0B1024] rounded-3xl border border-slate-800 p-6 sm:p-10 lg:p-14 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#55DDF5] bg-[#111A30] px-3 py-1 rounded-full border border-slate-700">
              <Layers className="w-3.5 h-3.5" />
              <span>Apollo 11 Scientific Instrument Specification</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              Meet the Instrument Still Answering Earth
            </h1>

            <p className="text-base sm:text-lg text-[#DCE5F2] leading-relaxed">
              The Apollo 11 Lunar Laser Ranging Retroreflector (LRRR): A 100-prism optical array left on the dusty surface of Mare Tranquillitatis.
            </p>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Machined from high-purity Suprasil fused silica and mounted in an aluminum-beryllium pallet with cylindrical sunshades, the array was oriented at approximately 37° toward Earth to maintain optimal line-of-sight during lunar librations.
            </p>

            {/* Verified Instrument Specs Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 text-xs font-mono">
              <div className="bg-[#111A30] p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">CORNER CUBES</span>
                <span className="text-white font-bold text-base">100 Prisms</span>
              </div>
              <div className="bg-[#111A30] p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">MATERIAL</span>
                <span className="text-[#55DDF5] font-bold text-base">Suprasil Quartz</span>
              </div>
              <div className="bg-[#111A30] p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">ARRAY SIZE</span>
                <span className="text-[#75E3B0] font-bold text-base">46 × 46 cm</span>
              </div>
              <div className="bg-[#111A30] p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 block text-[10px]">TOTAL MASS</span>
                <span className="text-[#FFC56B] font-bold text-base">35 kg (77 lb)</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-[#050816]">
              <img
                src={reflectorImage}
                alt="Detailed Apollo 11 LRRR on lunar soil"
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-3 bg-[#0B1024] border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>Apollo 11 LRRR on Lunar Surface</span>
                <span className="text-[#55DDF5]">NASA SP-214 Record</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: INTERACTIVE CORNER-CUBE EXPLORER */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#55DDF5]">
              Interactive Optics Model
            </span>
            <h2 className="font-display text-2xl font-bold text-white mt-1">
              Interactive Corner-Cube Prism Raytracer
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Optical Law: Vector Antiparallel Inversion (v → -v)
          </span>
        </div>

        <CornerCubeViewer />
      </section>

      {/* SECTION 3: PASSIVE VS ACTIVE INSTRUMENTS */}
      <section className="bg-[#0B1024] rounded-3xl border border-slate-800 p-6 sm:p-10 space-y-6">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-[#55DDF5]">
            Instrumentation Comparison
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Passive Retroreflector vs. Active Transmitter
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Understanding why the passive optical design outlived every other electrical experiment placed on the Apollo lunar surface.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-[#111A30] text-slate-300">
              <tr className="border-b border-slate-800">
                <th className="py-3 px-4">ATTRIBUTE</th>
                <th className="py-3 px-4 text-[#55DDF5]">PASSIVE RETROREFLECTOR (APOLLO 11 LRRR)</th>
                <th className="py-3 px-4 text-slate-400">ACTIVE SCIENTIFIC INSTRUMENT (E.G. ALSEP)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 bg-[#070B1A]">
              <tr>
                <td className="py-3 px-4 font-bold text-white">Power Source</td>
                <td className="py-3 px-4 text-[#75E3B0]">None required (100% passive optical reflection)</td>
                <td className="py-3 px-4 text-slate-400">Radioisotope Thermoelectric Generator (RTG) or batteries</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">Signal Generation</td>
                <td className="py-3 px-4 text-[#55DDF5]">Reflects incident photon pulses from Earth telescopes</td>
                <td className="py-3 px-4 text-slate-400">Generates own radio frequency carrier transmission</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">Moving Parts / Electronics</td>
                <td className="py-3 px-4 text-white">Zero circuits, wires, transistors, or moving actuators</td>
                <td className="py-3 px-4 text-slate-400">Complex sensors, amplifiers, encoders, and transmitters</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">Operational Lifespan</td>
                <td className="py-3 px-4 text-[#75E3B0]">Indefinite (55+ years active to present day)</td>
                <td className="py-3 px-4 text-slate-400">Limited (typically shut down within 5 to 8 years)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">Target Accuracy Needed</td>
                <td className="py-3 px-4 text-slate-300">Requires ground telescope to aim within arcseconds</td>
                <td className="py-3 px-4 text-slate-400">Omnidirectional or wide-beam radio broadcast</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 4: HOW THE ARRAY CONTRIBUTES TO SCIENCE */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#55DDF5]">
              Scientific Impact
            </span>
            <h2 className="font-display text-2xl font-bold text-white mt-1">
              How the Array Contributes to Science
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            55+ Years of Empirical Geodesy
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0B1024] p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono text-[#55DDF5] font-bold">01. CENTIMETER ORBIT MAPPING</span>
            <h3 className="font-display text-base font-bold text-white">
              Continuous Ephemeris Refinement
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every normal point recorded adds to the celestial ephemerides (NASA JPL DE440/DE441), calculating lunar position with accuracy that enables future Artemis landing navigations.
            </p>
          </div>

          <div className="bg-[#0B1024] p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono text-[#75E3B0] font-bold">02. TIDAL FRICTION ENERGY</span>
            <h3 className="font-display text-base font-bold text-white">
              Planetary Dissipation Rate
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Measures tidal energy lost in Earth’s oceans (~3.7 Terawatts), linking continental shelf hydrodynamics to the 3.8 cm/year orbital expansion of the Moon.
            </p>
          </div>

          <div className="bg-[#0B1024] p-6 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-mono text-[#8A7CFF] font-bold">03. TESTING EINSTEIN’S RELATIVITY</span>
            <h3 className="font-display text-base font-bold text-white">
              Strong Equivalence Principle
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Checks whether Earth’s massive iron core and the Moon’s rocky interior fall identically toward the Sun, placing the tightest constraint on Nordtvedt effect parameters.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: HISTORICAL EVIDENCE AND CITATIONS */}
      <section className="bg-[#0B1024] rounded-3xl border border-slate-800 p-6 sm:p-10 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 className="font-display text-lg font-bold text-white">
              Historical NASA Documentation & Evidence
            </h3>
            <p className="text-xs text-slate-400">
              Citations from official NASA mission reports and technical documentation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono">
          <div className="bg-[#111A30] p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-slate-400 block text-[10px]">REPORT: NASA SP-214</span>
            <span className="text-white font-bold block">Apollo 11 Preliminary Science Report</span>
            <p className="text-slate-300 text-[11px] font-sans">
              Chapter 7: &quot;Lunar Laser Ranging Experiment&quot; by C.O. Alley et al. Documents array deployment coordinates and optical testing.
            </p>
            <a
              href="https://cddis.nasa.gov/"
              target="_blank"
              rel="noreferrer noopener"
              className="text-[#55DDF5] hover:text-[#75E3B0] flex items-center gap-1 text-[11px] pt-1"
            >
              <span>NASA CDDIS Mission Archive</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="bg-[#111A30] p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-slate-400 block text-[10px]">PAPER: SCIENCE 166</span>
            <span className="text-white font-bold block">First Optical Returns at McDonald</span>
            <p className="text-slate-300 text-[11px] font-sans">
              Bender et al. (1969): Confirmed the first return signals from Apollo 11 array with the 107-inch telescope in Texas.
            </p>
            <a
              href="https://ilrs.gsfc.nasa.gov/science/scienceContributions/lunar.html"
              target="_blank"
              rel="noreferrer noopener"
              className="text-[#55DDF5] hover:text-[#75E3B0] flex items-center gap-1 text-[11px] pt-1"
            >
              <span>ILRS Science Overview</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="bg-[#111A30] p-4 rounded-xl border border-slate-800 space-y-2">
            <span className="text-slate-400 block text-[10px]">ARCHIVE: ILRS / CDDIS</span>
            <span className="text-white font-bold block">Consolidated Range Data Repositories</span>
            <p className="text-slate-300 text-[11px] font-sans">
              Contains daily calibrated normal point files for Apollo 11, 14, 15, and Lunokhod 1 & 2 targets.
            </p>
            <a
              href="https://data.nasa.gov/dataset/cddis-llr-data"
              target="_blank"
              rel="noreferrer noopener"
              className="text-[#55DDF5] hover:text-[#75E3B0] flex items-center gap-1 text-[11px] pt-1"
            >
              <span>Open Data Portal Link</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 6: MYTH VS FACT */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-[#55DDF5]">
            Critical Thinking & Science Literacy
          </span>
          <h2 className="font-display text-3xl font-bold text-white">
            Myth vs. Scientific Fact
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Select a card to examine common misconceptions regarding the Apollo 11 retroreflector and lunar laser ranging.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {MYTH_FACTS.map((item) => {
            const isRevealed = revealedCardId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setRevealedCardId(isRevealed ? null : item.id)}
                className={`p-6 rounded-2xl border text-left transition-all ${
                  isRevealed
                    ? 'bg-[#111A30] border-[#55DDF5] shadow-lg'
                    : 'bg-[#0B1024] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-xs font-mono font-bold text-slate-400">
                    CLAIM #{item.id}
                  </span>
                  <span className="text-xs text-[#55DDF5] font-mono flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{isRevealed ? 'Hide Analysis' : 'Click to Reveal'}</span>
                  </span>
                </div>

                <div className="text-sm font-semibold text-white mb-3">
                  &ldquo;{item.statement}&rdquo;
                </div>

                {isRevealed && (
                  <div
                    className={`mt-4 pt-4 border-t text-xs leading-relaxed ${
                      item.isFact
                        ? 'border-emerald-800/80 text-emerald-200'
                        : 'border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-mono font-bold text-xs uppercase mb-1">
                      {item.isFact ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-[#75E3B0]" />
                          <span className="text-[#75E3B0]">Scientifically Verified Fact</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-rose-400" />
                          <span className="text-rose-400">Common Misconception (Myth)</span>
                        </>
                      )}
                    </div>
                    <p className="mt-1">{item.explanation}</p>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* CTA To Laser Lab */}
      <section className="bg-gradient-to-r from-[#0B1024] to-[#111A30] rounded-3xl border border-slate-800 p-8 text-center space-y-4">
        <h3 className="font-display text-2xl font-bold text-white">
          Ready to Test the Math Yourself?
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Take what you’ve learned about the Apollo 11 retroreflector and run your own simulated laser pulse in the Laser Lab simulator.
        </p>
        <button
          onClick={() => onNavigate('laser-lab')}
          className="px-6 py-3 rounded-xl bg-[#55DDF5] text-[#050816] hover:bg-[#75E3B0] font-semibold text-sm inline-flex items-center gap-2 transition-colors"
        >
          <span>Launch Laser Lab Simulator</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
