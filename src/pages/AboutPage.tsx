import React from 'react';
import { PageId } from '../types';
import { Compass, Users, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

interface TeamMember {
  name: string;
  role: string;
  focus: string;
  initials: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Abdul Kader',
    role: 'Team Leader and Web Developer',
    focus: 'Project coordination, architecture, and core web platform development.',
    initials: 'AK'
  },
  {
    name: 'Sumsun Nagar',
    role: 'Lead Developer',
    focus: 'Simulation algorithms, data parsing engines, and interactive modules.',
    initials: 'SN'
  },
  {
    name: 'Md Jibon Farhan',
    role: 'Video Editor and Cinematographer',
    focus: 'Visual storytelling, media direction, and cinematic asset design.',
    initials: 'JF'
  },
  {
    name: 'Atik Hasan Akash',
    role: 'Executive Member',
    focus: 'Educational research, curriculum structuring, and project execution.',
    initials: 'AA'
  }
];

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16">
      {/* Page Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-[#55DDF5] bg-[#0B1024] px-3 py-1 rounded-full border border-slate-800">
          <Users className="w-3.5 h-3.5" />
          <span>NASA Space Apps Challenge 2026 Student Team</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
          Meet the Team Behind the Signal
        </h1>

        <p className="text-base sm:text-lg text-[#DCE5F2] max-w-3xl leading-relaxed">
          Team LUNAR ECHO was assembled for NASA Space Apps Challenge 2026 to illuminate how an optical instrument deployed on the Moon in 1969 continues to pioneer lunar science and fundamental physics.
        </p>
      </div>

      {/* Team Roster Grid */}
      <section className="space-y-6">
        <div className="border-b border-slate-800 pb-3">
          <span className="text-xs font-mono uppercase tracking-wider text-[#55DDF5]">
            Project Contributors
          </span>
          <h2 className="font-display text-2xl font-bold text-white mt-1">
            Team Members
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <div
              key={member.name}
              className="bg-[#0B1024] rounded-2xl border border-slate-800 p-6 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors"
            >
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-[#111A30] border border-slate-700 flex items-center justify-center font-display font-bold text-lg text-[#55DDF5]">
                  {member.initials}
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">
                    {member.name}
                  </h3>
                  <div className="text-xs font-mono text-[#55DDF5] mt-0.5">
                    {member.role}
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-slate-800/80">
                {member.focus}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Purpose */}
      <section className="bg-[#0B1024] rounded-3xl border border-slate-800 p-6 sm:p-10 space-y-6">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-[#75E3B0]">
            Our Educational Purpose
          </span>
          <h2 className="font-display text-2xl font-bold text-white">
            Space Science Meets Interactive Technology
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Our goal is to combine rigorous space science, interactive technology, authentic data visualization, cinematic storytelling, and student education into an open, accessible digital resource.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed">
          <div className="bg-[#111A30] p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="font-mono font-bold text-[#55DDF5] block text-sm">
              Authentic Data Integrity
            </span>
            <p className="text-slate-300">
              We uphold strict transparency: real observations cite official NASA CDDIS and ILRS datasets, while educational simulations are visibly labeled so students understand how scientific models work.
            </p>
          </div>

          <div className="bg-[#111A30] p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="font-mono font-bold text-[#75E3B0] block text-sm">
              Pedagogical Clarity
            </span>
            <p className="text-slate-300">
              Complex concepts like picosecond timing, single-photon detection, and lunar physical librations are broken down with interactive visual simulations and hands-on challenges.
            </p>
          </div>

          <div className="bg-[#111A30] p-5 rounded-2xl border border-slate-800 space-y-2">
            <span className="font-mono font-bold text-[#8A7CFF] block text-sm">
              Honoring Apollo Heritage
            </span>
            <p className="text-slate-300">
              We celebrate the timeless elegance of passive instruments—demonstrating how thoughtful physical design outlived electronics and continues to benefit modern space exploration.
            </p>
          </div>
        </div>
      </section>

      {/* Scientific Acknowledgment & Disclaimer */}
      <section className="bg-[#050816] rounded-2xl border border-slate-800 p-6 space-y-4 text-xs leading-relaxed text-slate-400">
        <div className="flex items-center gap-2 text-slate-300 font-bold font-mono text-sm">
          <ShieldCheck className="w-4 h-4 text-[#75E3B0]" />
          <span>Scientific Acknowledgments & Independence Notice</span>
        </div>
        <p>
          We gratefully acknowledge the scientists, engineers, and data curators at NASA Goddard Space Flight Center, the NASA Crustal Dynamics Data Information System (CDDIS), the International Laser Ranging Service (ILRS), McDonald Observatory, Observatoire de la Côte d’Azur, and the Apache Point APOLLO collaboration whose multidecadal dedication makes lunar laser ranging possible.
        </p>
        <p className="text-slate-400 italic">
          Disclaimer: LUNAR ECHO is an independent educational project created for NASA Space Apps Challenge 2026. It is not an official NASA website and does not imply NASA endorsement.
        </p>
      </section>
    </div>
  );
};
