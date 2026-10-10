import React from 'react';
import { PageId } from '../types';
import { SCIENTIFIC_SOURCES, METHODOLOGY_NOTES } from '../data/sources';
import { ExternalLink, Database, Info, FileText, ShieldCheck, ArrowRight } from 'lucide-react';

interface SourcesPageProps {
  onNavigate: (page: PageId) => void;
}

export const SourcesPage: React.FC<SourcesPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16">
      {/* Page Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#55DDF5] bg-[#0B1024] px-3 py-1 rounded-full border border-slate-800">
          <Database className="w-3.5 h-3.5" />
          <span>Scientific Provenance & Citations</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
          Evidence Behind the Echo
        </h1>

        <p className="text-base sm:text-lg text-[#DCE5F2] max-w-3xl leading-relaxed">
          A transparent directory of primary NASA mission documentation, ILRS international archives, and peer-reviewed scientific literature underpinning Team LUNAR ECHO.
        </p>

        {/* Mandatory Prominent Source Notice */}
        <div className="bg-[#0B1024] p-4 rounded-xl border border-slate-800 flex items-start gap-3 text-xs text-slate-300 max-w-3xl">
          <Info className="w-4 h-4 text-[#FFC56B] shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white block mb-0.5">
              Access & Archive Integration Disclosure
            </span>
            <p className="text-slate-400 leading-relaxed">
              Source links provide direct access to the original scientific material hosted by NASA, ILRS, and scientific publishers. The presence of a source link does not mean that this educational website has automatically downloaded or integrated the entire external dataset in real-time.
            </p>
          </div>
        </div>
      </div>

      {/* Primary Sources Directory */}
      <section className="space-y-6">
        <div className="border-b border-slate-800 pb-3">
          <span className="text-xs font-mono uppercase tracking-wider text-[#55DDF5]">
            Verified References
          </span>
          <h2 className="font-display text-2xl font-bold text-white mt-1">
            Official Data Centers & Mission Documentation
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SCIENTIFIC_SOURCES.map((src) => (
            <div
              key={src.id}
              className="bg-[#0B1024] rounded-2xl border border-slate-800 p-6 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#55DDF5]">{src.organization}</span>
                  <span className="px-2 py-0.5 rounded bg-[#111A30] text-slate-300 border border-slate-700">
                    {src.verifiedStatus.replace(/_/g, ' ')}
                  </span>
                </div>

                <h3 className="font-display text-base font-bold text-white">
                  {src.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  <strong>Role in Project:</strong> {src.roleInProject}
                </p>

                <div className="text-[11px] font-mono text-slate-400 space-y-1 pt-2 border-t border-slate-800/80">
                  <div>
                    <span className="text-slate-400">Coverage: </span>
                    <span className="text-slate-300">{src.temporalCoverage}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Formats: </span>
                    <span className="text-slate-300">{src.dataFormats.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Processing & Limitations: </span>
                    <span className="text-slate-300 font-sans block mt-0.5">
                      {src.limitationsAndProcessing}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80">
                <a
                  href={src.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#55DDF5] hover:text-[#75E3B0] font-mono transition-colors"
                >
                  <span>Open Primary Source</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Methodology Notes */}
      <section className="bg-[#0B1024] rounded-3xl border border-slate-800 p-6 sm:p-10 space-y-6">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-[#75E3B0]">
            Physics Standards & Conventions
          </span>
          <h2 className="font-display text-2xl font-bold text-white">
            Project Methodology & Simulation Constants
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
          <div className="bg-[#111A30] p-5 rounded-2xl border border-slate-800 space-y-2 font-mono">
            <span className="text-[#55DDF5] font-bold block text-sm">
              Speed of Light Constant (c)
            </span>
            <p className="text-slate-300 font-sans">
              {METHODOLOGY_NOTES.speedOfLight} This universal physical constant guarantees exact conversion between measured round-trip time and spatial distance.
            </p>
          </div>

          <div className="bg-[#111A30] p-5 rounded-2xl border border-slate-800 space-y-2 font-mono">
            <span className="text-[#75E3B0] font-bold block text-sm">
              Ranging Travel Time Equation
            </span>
            <p className="text-slate-300 font-sans">
              {METHODOLOGY_NOTES.rangingFormula} In our educational simulators, light travel times reflect this fundamental relationship.
            </p>
          </div>

          <div className="bg-[#111A30] p-5 rounded-2xl border border-slate-800 space-y-2 font-mono md:col-span-2">
            <span className="text-[#FFC56B] font-bold block text-sm">
              Simulation Assumptions vs. Observational Realities
            </span>
            <p className="text-slate-300 font-sans">
              {METHODOLOGY_NOTES.simulationAssumptions}
            </p>
          </div>
        </div>
      </section>

      {/* CTA To Glossary */}
      <section className="bg-gradient-to-r from-[#0B1024] to-[#111A30] rounded-3xl border border-slate-800 p-8 text-center space-y-4">
        <h3 className="font-display text-2xl font-bold text-white">
          Explore the Complete Scientific Glossary
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Need definitions for terms like Normal Point, Libration, CRD format, or Tidal Dissipation? Visit our searchable glossary.
        </p>
        <button
          onClick={() => onNavigate('glossary')}
          className="px-6 py-3 rounded-xl bg-[#55DDF5] text-[#050816] hover:bg-[#75E3B0] font-semibold text-sm inline-flex items-center gap-2 transition-colors"
        >
          <span>Open Scientific Glossary</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
