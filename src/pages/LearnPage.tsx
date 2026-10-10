import React, { useState } from 'react';
import { PageId } from '../types';
import { LEARNING_MODULES } from '../data/learningModules';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Lightbulb,
  Award
} from 'lucide-react';

interface LearnPageProps {
  onNavigate: (page: PageId) => void;
}

export const LearnPage: React.FC<LearnPageProps> = ({ onNavigate }) => {
  const [activeModuleId, setActiveModuleId] = useState<string>('module-1');
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});

  const currentModule =
    LEARNING_MODULES.find((m) => m.id === activeModuleId) || LEARNING_MODULES[0];

  const handleSelectAnswer = (qIndex: number, optionIndex: number) => {
    const key = `${currentModule.id}-q${qIndex}`;
    setSelectedAnswers((prev) => ({ ...prev, [key]: optionIndex }));
  };

  const handleCompleteModule = (id: string) => {
    if (!completedModules.includes(id)) {
      setCompletedModules((prev) => [...prev, id]);
    }
    // Advance to next module if available
    const curIdx = LEARNING_MODULES.findIndex((m) => m.id === id);
    if (curIdx < LEARNING_MODULES.length - 1) {
      setActiveModuleId(LEARNING_MODULES[curIdx + 1].id);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const progressPercent = Math.round(
    (completedModules.length / LEARNING_MODULES.length) * 100
  );

  return (
    <div className="space-y-12">
      {/* Page Header with Progress Ribbon */}
      <div className="bg-[#0B1024] rounded-3xl border border-slate-800 p-6 sm:p-10 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#55DDF5] bg-[#111A30] px-3 py-1 rounded-full border border-slate-700">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Student Curriculum & Interactive Lessons</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Learn Lunar Science, One Signal at a Time
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Explore four comprehensive educational learning modules. Complete review checks to master retroreflector optics, photon travel math, and scientific data analysis.
            </p>
          </div>

          {/* Session Progress Card */}
          <div className="bg-[#111A30] p-4 rounded-2xl border border-slate-800 min-w-[240px] space-y-2 font-mono text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Session Progress:</span>
              <span className="text-[#55DDF5] font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#55DDF5] to-[#75E3B0] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-400 flex items-center justify-between">
              <span>{completedModules.length} of 4 Modules Completed</span>
              {completedModules.length === 4 && (
                <span className="text-[#75E3B0] flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" /> Ready for Quiz!
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Module Selection Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-slate-800/80">
          {LEARNING_MODULES.map((mod, idx) => {
            const isActive = mod.id === activeModuleId;
            const isDone = completedModules.includes(mod.id);
            return (
              <button
                key={mod.id}
                onClick={() => setActiveModuleId(mod.id)}
                className={`p-3.5 rounded-xl border text-left transition-colors font-mono ${
                  isActive
                    ? 'bg-[#111A30] border-[#55DDF5] text-white shadow-md'
                    : 'bg-[#050816] border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-[#55DDF5]">MODULE 0{idx + 1}</span>
                  {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-[#75E3B0]" />}
                </div>
                <div className="text-xs font-semibold text-white truncate font-sans">
                  {mod.title}
                </div>
                <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{mod.estimatedTime}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Module Content Canvas */}
      <div className="bg-[#0B1024] rounded-3xl border border-slate-800 p-6 sm:p-10 space-y-8">
        {/* Module Header */}
        <div className="space-y-3 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-2 text-xs font-mono text-[#55DDF5]">
            <span>{currentModule.estimatedTime}</span>
            <span>·</span>
            <span>Self-Paced Exploration</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
            {currentModule.title}
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            {currentModule.description}
          </p>

          {/* Learning Objectives Box */}
          <div className="bg-[#111A30] p-4 rounded-xl border border-slate-800 space-y-2 mt-3">
            <span className="text-xs font-mono font-bold text-[#75E3B0] block uppercase tracking-wider">
              Learning Objectives:
            </span>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-5">
              {currentModule.objectives.map((obj, i) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Lesson Sections */}
        <div className="space-y-8">
          {currentModule.contentSections.map((sec, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="font-display text-lg font-bold text-white">
                {sec.heading}
              </h3>
              <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {sec.body.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>

              {sec.keyTakeaway && (
                <div className="bg-[#050816] p-4 rounded-xl border border-slate-800 flex items-start gap-2.5 text-xs text-slate-300 mt-2">
                  <Lightbulb className="w-4 h-4 text-[#FFC56B] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white font-mono block text-[11px] mb-0.5">
                      KEY TAKEAWAY:
                    </span>
                    <p>{sec.keyTakeaway}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Interactive Module Review Questions */}
        <div className="pt-6 border-t border-slate-800 space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#55DDF5]" />
            <h3 className="font-display text-xl font-bold text-white">
              Knowledge Check: Review Questions
            </h3>
          </div>

          <div className="space-y-6">
            {currentModule.reviewQuestions.map((q, qIdx) => {
              const selectedIdx = selectedAnswers[`${currentModule.id}-q${qIdx}`];
              const isAnswered = selectedIdx !== undefined;
              const isCorrect = isAnswered && selectedIdx === q.correctIndex;

              return (
                <div
                  key={qIdx}
                  className="bg-[#111A30] p-5 rounded-2xl border border-slate-800 space-y-3"
                >
                  <div className="text-xs font-mono text-slate-400">
                    QUESTION {qIdx + 1} OF 3
                  </div>
                  <h4 className="text-sm font-semibold text-white">
                    {q.question}
                  </h4>

                  <div className="space-y-2 pt-1">
                    {q.options.map((opt, optIdx) => {
                      const isOptionSelected = selectedIdx === optIdx;
                      let btnStyle = 'bg-[#0B1024] border-slate-700 text-slate-300 hover:border-slate-600';

                      if (isAnswered) {
                        if (optIdx === q.correctIndex) {
                          btnStyle = 'bg-emerald-950/70 border-emerald-600 text-emerald-200 font-medium';
                        } else if (isOptionSelected) {
                          btnStyle = 'bg-rose-950/70 border-rose-600 text-rose-200';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectAnswer(qIdx, optIdx)}
                          className={`w-full text-left p-3 rounded-xl border text-xs transition-colors flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isAnswered && optIdx === q.correctIndex && (
                            <CheckCircle2 className="w-4 h-4 text-[#75E3B0] shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswered && (
                    <div
                      className={`p-3 rounded-lg border text-xs leading-relaxed ${
                        isCorrect
                          ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
                          : 'bg-slate-900 border-slate-700 text-slate-300'
                      }`}
                    >
                      <span className="font-bold block mb-0.5">
                        {isCorrect ? 'Correct!' : 'Scientific Explanation:'}
                      </span>
                      {q.feedback}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Module Complete Action */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => handleCompleteModule(currentModule.id)}
              className="px-6 py-3 rounded-xl bg-[#55DDF5] text-[#050816] hover:bg-[#75E3B0] font-semibold text-xs flex items-center gap-2 transition-colors shadow-md"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {completedModules.includes(currentModule.id)
                  ? 'Marked as Completed · Next Module'
                  : 'Complete Module & Continue'}
              </span>
            </button>

            <button
              onClick={() => onNavigate('quiz')}
              className="px-5 py-3 rounded-xl bg-[#111A30] hover:bg-slate-800 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <span>Take Full 10-Question Knowledge Quiz</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
