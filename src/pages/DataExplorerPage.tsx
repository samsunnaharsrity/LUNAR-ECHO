import React from 'react';
import { PageId } from '../types';
import { DataExplorerView } from '../components/DataExplorerView';
import { Database, ExternalLink, ShieldCheck, ArrowRight, BookOpen } from 'lucide-react';

interface DataExplorerPageProps {
  onNavigate: (page: PageId) => void;
}

export const DataExplorerPage: React.FC<DataExplorerPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-14">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#55DDF5] bg-[#0B1024] px-3 py-1 rounded-full border border-slate-800">
          <Database className="w-3.5 h-3.5" />
          <span>Authentic Scientific Repository</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
          Explore the Real Science Behind the Signal
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          Access verified Lunar Laser Ranging observations from the NASA Crustal Dynamics Data Information System (CDDIS) and the International Laser Ranging Service (ILRS). Inspect authentic records, timing residuals, target comparisons, and import custom observation files.
        </p>

        {/* Official Data Repositories Direct Links */}
        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
          <a
            href="https://data.nasa.gov/dataset/cddis-llr-data"
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B1024] border border-slate-800 text-slate-300 hover:text-[#55DDF5] transition-colors"
          >
            <span>NASA Open Data Portal (CDDIS LLR)</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          <a
            href="https://ilrs.gsfc.nasa.gov/science/scienceContributions/lunar_data.html"
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B1024] border border-slate-800 text-slate-300 hover:text-[#55DDF5] transition-colors"
          >
            <span>ILRS Lunar Laser Ranging Data Availability</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          <a
            href="https://cddis.nasa.gov/"
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B1024] border border-slate-800 text-slate-300 hover:text-[#55DDF5] transition-colors"
          >
            <span>NASA CDDIS Geodesy Archive</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>

      {/* Main Data Explorer Interactive Workspace */}
      <DataExplorerView />

      {/* Section 7: Data Methodology & Provenance Disclosure */}
      <section className="bg-[#0B1024] rounded-3xl border border-slate-800 p-6 sm:p-10 space-y-6">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-[#55DDF5]">
            Transparent Scientific Provenance
          </span>
          <h2 className="font-display text-2xl font-bold text-white">
            Data Methodology & Processing Pipeline
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            How raw photon arrival detections become standardized ILRS Normal Point records.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
          <div className="bg-[#111A30] p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="font-mono font-bold text-white block text-sm">
              From Raw Pulses to Normal Points
            </span>
            <p className="text-slate-300">
              During an observation session lasting 5 to 15 minutes, a station emits hundreds of thousands of laser pulses. The detector registers individual photon arrivals with timestamp tags. Raw timestamps are filtered against predicted orbit ephemerides to isolate genuine coherent retroreflections from ambient background photons (scattered sunlight/starlight).
            </p>
          </div>

          <div className="bg-[#111A30] p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="font-mono font-bold text-white block text-sm">
              Standard Formatting (Pre-CRD & CRD/CRD2)
            </span>
            <p className="text-slate-300">
              The historical archive (1969–2012) utilized fixed-column ASCII records containing station ID, target code, UTC epoch, two-way transit time, and meteorological data. Since 2012, all stations report in the ILRS Consolidated Range Data (CRD) format, incorporating advanced system calibration and high-rate meteorological telemetry.
            </p>
          </div>
        </div>

        <div className="bg-[#050816] p-4 rounded-xl border border-slate-800 flex items-start gap-3 text-xs text-slate-300">
          <ShieldCheck className="w-4 h-4 text-[#75E3B0] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white block mb-0.5">Scientific Citation Policy</span>
            <p className="text-slate-400">
              All astronomical calculations on this platform adhere to the CODATA recommended values of fundamental constants and the International Earth Rotation and Reference Systems Service (IERS) Conventions.
            </p>
          </div>
        </div>
      </section>

      {/* CTA To Science & Discoveries */}
      <section className="bg-gradient-to-r from-[#0B1024] to-[#111A30] rounded-3xl border border-slate-800 p-8 text-center space-y-4">
        <h3 className="font-display text-2xl font-bold text-white">
          What Do These Numbers Reveal About the Universe?
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Explore how 55 years of ranging records have unlocked revolutionary insights into tidal physics, lunar core geophysics, and general relativity.
        </p>
        <button
          onClick={() => onNavigate('science')}
          className="px-6 py-3 rounded-xl bg-[#55DDF5] text-[#050816] hover:bg-[#75E3B0] font-semibold text-sm inline-flex items-center gap-2 transition-colors"
        >
          <span>Explore Science & Discoveries</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
