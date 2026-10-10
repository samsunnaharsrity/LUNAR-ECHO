import React, { useState, useMemo } from 'react';
import { PageId } from '../types';
import { GLOSSARY_TERMS } from '../data/glossary';
import { Search, BookOpen, Compass, ExternalLink, ArrowRight } from 'lucide-react';

interface GlossaryPageProps {
  onNavigate: (page: PageId) => void;
}

export const GlossaryPage: React.FC<GlossaryPageProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', 'Optics', 'Astronomy', 'Instruments', 'Data Science', 'Relativity'];

  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter((term) => {
      const matchSearch =
        term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.relevanceToLLR.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCategory =
        selectedCategory === 'ALL' || term.category === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="space-y-14">
      {/* Page Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#55DDF5] bg-[#0B1024] px-3 py-1 rounded-full border border-slate-800">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Scientific Lexicon & Reference</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
          Scientific Glossary
        </h1>

        <p className="text-base sm:text-lg text-[#DCE5F2] max-w-3xl leading-relaxed">
          Search key terms in celestial mechanics, laser optics, astrodynamics, and data science used throughout Lunar Laser Ranging literature.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0B1024] p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search terms, concepts, definitions..."
            className="w-full bg-[#111A30] border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#55DDF5]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-slate-400 font-mono mr-1">Categories:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#55DDF5] text-[#050816] font-bold'
                  : 'bg-[#111A30] text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTerms.map((item) => (
          <div
            key={item.term}
            className="bg-[#0B1024] rounded-2xl border border-slate-800 p-6 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#111A30] text-[#55DDF5] border border-slate-800">
                  {item.category}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {item.sourceCitation}
                </span>
              </div>

              <h3 className="font-display text-lg font-bold text-white">
                {item.term}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {item.definition}
              </p>

              <div className="bg-[#111A30] p-3 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <strong className="text-[#75E3B0] block font-mono text-[11px] mb-0.5">
                  LLR Relevance:
                </strong>
                {item.relevanceToLLR}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <div className="py-16 text-center text-slate-400 font-mono text-xs">
          No glossary terms match your search &quot;{searchTerm}&quot;.
        </div>
      )}
    </div>
  );
};
