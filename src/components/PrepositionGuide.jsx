// src/components/PrepositionGuide.jsx
import React, { useState } from 'react';
import { PREPOSITION_DICTIONARY } from '../services/arrowEngine';
import { Compass, ArrowUpRight, Search } from 'lucide-react';

export function PrepositionGuide() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPrepositions = PREPOSITION_DICTIONARY.filter(item =>
    item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.arrowMeaning.includes(searchTerm) ||
    item.coreConcept.includes(searchTerm)
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Header Banner */}
      <section className="glass-panel p-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>전치사의 시각적 이미지화 (Visual Preposition Map)</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          애로우 잉글리시 전치사 직관 지도
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
          전치사를 한국어 뜻(~에, ~의, ~에 대해)으로 암기하지 않고, 주인공에서 출발한 <strong className="text-amber-300 font-semibold">시선과 동작의 화살표 이미지</strong>로 직접 파악합니다.
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto relative pt-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="전치사 검색 (예: on, at, around, 접촉)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 text-sm transition-all"
          />
        </div>
      </section>

      {/* Grid of Preposition Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrepositions.map((item, idx) => (
          <div
            key={idx}
            className="glass-panel p-6 space-y-4 hover:border-amber-500/40 transition-all duration-300 group hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{item.visualIcon}</span>
                <div>
                  <h3 className="text-xl font-extrabold text-white font-brand group-hover:text-amber-400 transition-colors">
                    {item.word}
                  </h3>
                  <span className="text-xs font-semibold text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                    {item.arrowMeaning}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              {item.coreConcept}
            </p>

            <div className="pt-2 border-t border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 block mb-1 uppercase tracking-wider">대표 예문</span>
              <p className="text-xs font-semibold text-sky-300 font-brand flex items-center justify-between">
                <span>"{item.example}"</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400 transition-colors" />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
