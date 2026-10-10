import React, { useState } from 'react';
import { PageId } from '../types';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  ArrowRight,
  BookOpen,
  Sparkles,
  Info
} from 'lucide-react';

interface QuizPageProps {
  onNavigate: (page: PageId) => void;
}

export const QuizPage: React.FC<QuizPageProps> = ({ onNavigate }) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIdx];

  const handleSelectOption = (optionIdx: number) => {
    if (quizSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [currentQ.id]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const handleRestart = () => {
    setUserAnswers({});
    setCurrentQuestionIdx(0);
    setQuizSubmitted(false);
  };

  const score = calculateScore();
  const total = QUIZ_QUESTIONS.length;
  const percentage = Math.round((score / total) * 100);

  const getRecommendation = () => {
    if (percentage >= 90) {
      return {
        title: 'Master of Lunar Geodesy!',
        body: 'Exceptional command of lunar laser ranging physics, data provenance, and instrumental design. You are ready to explore the NASA CDDIS raw archives.',
        suggestedPage: 'data-explorer' as PageId,
        btnText: 'Dive into Data Explorer'
      };
    } else if (percentage >= 70) {
      return {
        title: 'Proficient Science Navigator',
        body: 'Strong grasp of foundational principles! Review module 2 and 3 to sharpen your understanding of photon budgets and atmospheric delay modeling.',
        suggestedPage: 'learn' as PageId,
        btnText: 'Review Learning Modules'
      };
    } else {
      return {
        title: 'Curious Space Explorer',
        body: 'A great beginning! To master the concepts, try running simulated trials in the Laser Lab and read through The Reflector optical guide.',
        suggestedPage: 'laser-lab' as PageId,
        btnText: 'Practice in Laser Lab'
      };
    }
  };

  const recommendation = getRecommendation();

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Quiz Header */}
      <div className="space-y-3 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#55DDF5] bg-[#0B1024] px-3 py-1 rounded-full border border-slate-800">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Interactive Student Knowledge Assessment</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Can You Decode the Lunar Echo?
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Test your mastery across 10 verified questions covering Apollo 11 history, retroreflector optics, photon travel math, and CDDIS data standards.
        </p>

        {/* Disclaimer */}
        <div className="text-[11px] text-slate-400 bg-[#0B1024] p-2.5 rounded-lg border border-slate-800 inline-block font-mono">
          Note: This educational quiz is an independent student learning assessment for Space Apps 2026, not an official NASA grading tool.
        </div>
      </div>

      {!quizSubmitted ? (
        /* Active Question Card */
        <div className="bg-[#0B1024] rounded-3xl border border-slate-800 p-6 sm:p-10 space-y-6 shadow-xl">
          {/* Progress Ribbon */}
          <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800 pb-4">
            <span className="text-[#55DDF5] font-bold">
              QUESTION {currentQuestionIdx + 1} OF {total}
            </span>
            <span className="text-slate-400">Category: {currentQ.category}</span>
          </div>

          {/* Question Text */}
          <h2 className="font-display text-lg sm:text-xl font-bold text-white leading-snug">
            {currentQ.question}
          </h2>

          {/* Options List */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((option, idx) => {
              const isSelected = userAnswers[currentQ.id] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#111A30] border-[#55DDF5] text-white font-medium shadow-md'
                      : 'bg-[#050816] border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#111A30] text-slate-400 font-mono text-xs flex items-center justify-center shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>
                  {isSelected && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#55DDF5]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => setCurrentQuestionIdx((p) => Math.max(0, p - 1))}
              disabled={currentQuestionIdx === 0}
              className="px-4 py-2 rounded-xl bg-[#111A30] text-slate-300 hover:text-white text-xs disabled:opacity-40 disabled:cursor-not-allowed font-mono"
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              {currentQuestionIdx < total - 1 ? (
                <button
                  onClick={() => setCurrentQuestionIdx((p) => p + 1)}
                  disabled={userAnswers[currentQ.id] === undefined}
                  className="px-5 py-2 rounded-xl bg-[#55DDF5] text-[#050816] hover:bg-[#75E3B0] font-semibold text-xs transition-colors disabled:opacity-40 disabled:cursor-not-allowed font-mono"
                >
                  Next Question
                </button>
              ) : (
                <button
                  onClick={() => setQuizSubmitted(true)}
                  disabled={Object.keys(userAnswers).length < total}
                  className="px-6 py-2 rounded-xl bg-[#75E3B0] text-[#050816] font-bold text-xs hover:bg-[#55DDF5] transition-colors disabled:opacity-40 disabled:cursor-not-allowed font-mono shadow-md"
                >
                  Submit Final Quiz
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Quiz Results Dashboard */
        <div className="space-y-8">
          <div className="bg-[#0B1024] rounded-3xl border border-slate-800 p-8 sm:p-12 text-center space-y-6 shadow-xl">
            <div className="w-16 h-16 rounded-2xl bg-[#111A30] border border-[#55DDF5]/40 flex items-center justify-center text-[#55DDF5] mx-auto shadow-lg">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#55DDF5]">
                Quiz Score Summary
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white tabular-nums">
                {score} / {total}
              </h2>
              <div className="text-sm font-mono text-[#75E3B0]">
                {percentage}% Accuracy
              </div>
            </div>

            {/* Recommendation Box */}
            <div className="bg-[#111A30] p-6 rounded-2xl border border-slate-800 text-left space-y-3 max-w-xl mx-auto">
              <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#55DDF5]" />
                <span>{recommendation.title}</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {recommendation.body}
              </p>
              <button
                onClick={() => onNavigate(recommendation.suggestedPage)}
                className="mt-2 px-4 py-2 rounded-lg bg-[#55DDF5] text-[#050816] font-semibold text-xs flex items-center gap-1.5 hover:bg-[#75E3B0] transition-colors"
              >
                <span>{recommendation.btnText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={handleRestart}
                className="px-5 py-2.5 rounded-xl bg-[#111A30] hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs flex items-center gap-2 transition-colors font-mono"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>

          {/* Full Answers Review Breakdown */}
          <div className="bg-[#0B1024] rounded-3xl border border-slate-800 p-6 sm:p-10 space-y-6">
            <h3 className="font-display text-xl font-bold text-white border-b border-slate-800 pb-3">
              Detailed Answer Explanations
            </h3>

            <div className="space-y-6">
              {QUIZ_QUESTIONS.map((q, idx) => {
                const userChoice = userAnswers[q.id];
                const isCorrect = userChoice === q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className="p-5 rounded-2xl bg-[#050816] border border-slate-800 space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">QUESTION {idx + 1}</span>
                      <span
                        className={`flex items-center gap-1 font-bold ${
                          isCorrect ? 'text-[#75E3B0]' : 'text-rose-400'
                        }`}
                      >
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" /> Correct
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4" /> Incorrect
                          </>
                        )}
                      </span>
                    </div>

                    <h4 className="text-sm font-semibold text-white">
                      {q.question}
                    </h4>

                    <div className="text-xs space-y-1">
                      <div className="text-slate-300">
                        <strong className="text-slate-400">Your Answer: </strong>
                        {userChoice !== undefined ? q.options[userChoice] : 'Not answered'}
                      </div>
                      {!isCorrect && (
                        <div className="text-emerald-400">
                          <strong>Correct Answer: </strong>
                          {q.options[q.correctAnswer]}
                        </div>
                      )}
                    </div>

                    <div className="bg-[#111A30] p-3 rounded-lg text-[11px] text-slate-300 border border-slate-800 leading-relaxed">
                      <strong className="text-[#55DDF5] block font-mono mb-0.5">
                        Scientific Explanation:
                      </strong>
                      {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
