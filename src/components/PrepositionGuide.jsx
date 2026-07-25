// src/components/PrepositionGuide.jsx
import React, { useState } from 'react';
import { PREPOSITION_CATEGORIES, PREPOSITION_LIST, PREPOSITION_NUANCES } from '../services/prepositionData';
import { 
  Compass, 
  Search, 
  ArrowUpRight, 
  BookOpen, 
  Sparkles, 
  HelpCircle, 
  Layers,
  CheckCircle2,
  X,
  Volume2,
  ExternalLink
} from 'lucide-react';

/**
 * Generates direct dictionary links for a given preposition word.
 * Each dictionary provides preposition-specific example-rich pages.
 */
function getDictionaryLinks(word) {
  const encoded = encodeURIComponent(word);
  return [
    {
      name: '네이버 사전',
      shortName: 'NAVER',
      color: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20',
      flag: '🇰🇷',
      url: `https://en.dict.naver.com/#/search?query=${encoded}&range=word`,
    },
    {
      name: 'Cambridge Dictionary',
      shortName: 'Cambridge',
      color: 'bg-sky-500/10 text-sky-300 border-sky-500/30 hover:bg-sky-500/20',
      flag: '🇬🇧',
      url: `https://dictionary.cambridge.org/dictionary/english/${encoded}`,
    },
    {
      name: 'Merriam-Webster',
      shortName: 'M-Webster',
      color: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30 hover:bg-indigo-500/20',
      flag: '🇺🇸',
      url: `https://www.merriam-webster.com/dictionary/${encoded}`,
    },
    {
      name: 'Oxford Learner\'s',
      shortName: 'Oxford',
      color: 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20',
      flag: '📖',
      url: `https://www.oxfordlearnersdictionaries.com/definition/english/${encoded}`,
    },
  ];
}

export function PrepositionGuide() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPreposition, setSelectedPreposition] = useState(null);
  const [showNuancesOnly, setShowNuancesOnly] = useState(false);

  // Filter logic
  const filteredPrepositions = PREPOSITION_LIST.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = 
      item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.arrowMeaning.includes(searchTerm) ||
      item.coreConcept.includes(searchTerm) ||
      item.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredNuances = PREPOSITION_NUANCES.filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    n.summary.includes(searchTerm) ||
    n.tag.includes(searchTerm)
  );

  const getCategoryBadgeClass = (category) => {
    switch (category) {
      case 'time':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
      case 'place':
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
      case 'direction':
        return 'bg-sky-500/10 border-sky-500/30 text-sky-400';
      case 'other':
        return 'bg-purple-500/10 border-purple-500/30 text-purple-400';
      default:
        return 'bg-slate-500/10 border-slate-500/30 text-slate-400';
    }
  };

  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Top Banner Header */}
      <section className="glass-panel p-8 text-center space-y-4 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <Compass className="w-4 h-4 text-indigo-400" />
          <span>애로우 잉글리시 시각적 이미지 사전 (Visual Preposition Map)</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          영문법의 핵심, <span className="gradient-text">전치사 4대 카테고리 직관 지도</span>
        </h2>

        <p className="text-slate-300 text-sm max-w-3xl mx-auto leading-relaxed">
          전치사를 한국어 뜻(<span className="text-slate-400 underline decoration-indigo-500/50">~에, ~의, ~를 위해</span>)으로 암기하지 마세요!
          주인공에서 출발한 <strong className="text-amber-300 font-semibold">시선과 물리적 동작의 화살표 그림</strong>으로 단 한 번에 직관 이해합니다.
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto relative pt-2">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-5 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="전치사, 한국어 의미, 뉘앙스 검색 (예: at, on, 시간, 기한, 접촉)..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm transition-all shadow-inner"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-4 text-xs text-slate-400 hover:text-white bg-slate-800 px-2 py-1 rounded-md"
            >
              지우기
            </button>
          )}
        </div>
      </section>

      {/* Category Tabs & Nuance Toggle */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none w-full sm:w-auto">
            {PREPOSITION_CATEGORIES.map((cat) => {
              const count = cat.id === 'all' 
                ? PREPOSITION_LIST.length 
                : PREPOSITION_LIST.filter(p => p.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setShowNuancesOnly(false);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                    selectedCategory === cat.id && !showNuancesOnly
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400/40'
                      : 'glass-panel text-slate-300 hover:text-white hover:bg-slate-800/80 border-slate-700/60'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                    selectedCategory === cat.id && !showNuancesOnly
                      ? 'bg-indigo-700 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Toggle Nuance Comparison View */}
          <button
            onClick={() => setShowNuancesOnly(!showNuancesOnly)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              showNuancesOnly
                ? 'bg-amber-500 text-slate-950 font-extrabold shadow-lg shadow-amber-500/30'
                : 'glass-panel text-amber-300 border-amber-500/30 hover:bg-amber-500/10'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>💡 뉘앙스 찰떡 비교 ({PREPOSITION_NUANCES.length})</span>
          </button>
        </div>

        {/* Selected Category Description Banner */}
        {!showNuancesOnly && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-center justify-between text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <span className="text-lg">
                {PREPOSITION_CATEGORIES.find(c => c.id === selectedCategory)?.icon}
              </span>
              <span className="font-semibold text-white">
                {PREPOSITION_CATEGORIES.find(c => c.id === selectedCategory)?.englishName}:
              </span>
              <span className="text-slate-400">
                {PREPOSITION_CATEGORIES.find(c => c.id === selectedCategory)?.desc}
              </span>
            </div>
            <span className="text-slate-500 font-mono hidden sm:inline">
              총 {filteredPrepositions.length}개 항목 표시 중
            </span>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {showNuancesOnly ? (
        /* NUANCE COMPARISON CARDS VIEW */
        <div className="space-y-6 animate-fade-in">
          <div className="glass-panel p-6 border-amber-500/30 bg-amber-500/5 space-y-2">
            <h3 className="text-lg font-bold text-amber-300 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span>전치사 뉘앙스 비교 꿀팁 (Nuance Comparison Guide)</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              영어 시험과 실제 회화에서 가장 많이 헷갈리는 전치사 쌍(in vs at, by vs until, for vs during 등)의 핵심 차이를 그림과 함께 확실하게 잡아드립니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredNuances.map((nuance) => (
              <div
                key={nuance.id}
                className="glass-panel p-6 space-y-4 hover:border-amber-500/40 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>{nuance.title}</span>
                  </h4>
                  <span className="text-[11px] font-semibold text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                    {nuance.tag}
                  </span>
                </div>

                <p className="text-xs text-slate-300 font-medium bg-slate-950/70 p-3 rounded-xl border border-slate-800 leading-relaxed">
                  {nuance.summary}
                </p>

                <div className="space-y-2 pt-2">
                  {nuance.details.map((detail, dIdx) => (
                    <div key={dIdx} className="bg-slate-900/90 rounded-xl p-3 border border-slate-800/80 text-xs space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">
                        📌 {detail.aspect}
                      </span>
                      <div className="grid grid-cols-1 gap-1 text-slate-200">
                        <p className="flex items-center gap-1.5 text-sky-300">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-sky-400" />
                          <span>{detail.first}</span>
                        </p>
                        {detail.second && (
                          <p className="flex items-center gap-1.5 text-emerald-300">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                            <span>{detail.second}</span>
                          </p>
                        )}
                        {detail.third && (
                          <p className="flex items-center gap-1.5 text-purple-300">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-purple-400" />
                            <span>{detail.third}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <p className="text-xs font-medium text-amber-300/90 italic">
                    {nuance.tip}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* STANDARD PREPOSITION DICTIONARY GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {filteredPrepositions.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPreposition(item)}
              className="glass-panel p-6 space-y-4 hover:border-indigo-500/50 transition-all duration-300 group hover:-translate-y-1 cursor-pointer relative flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header Row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2 bg-slate-900 rounded-xl border border-slate-800 group-hover:scale-110 transition-transform">
                      {item.visualIcon}
                    </span>
                    <div>
                      <h3 className="text-xl font-extrabold text-white font-brand group-hover:text-indigo-400 transition-colors flex items-center gap-2">
                        <span>{item.word}</span>
                      </h3>
                      <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border inline-block mt-1 ${getCategoryBadgeClass(item.category)}`}>
                        {item.categoryLabel}
                      </span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeak(item.word);
                    }}
                    className="p-2 rounded-lg bg-slate-800/80 text-slate-400 hover:text-sky-300 hover:bg-slate-700 transition-all shrink-0"
                    title="발음 듣기"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Arrow Meaning Badge */}
                <div className="inline-block px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold w-full">
                  🎯 시각 이미지: {item.arrowMeaning}
                </div>

                {/* Core Concept */}
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                  {item.coreConcept}
                </p>
              </div>

              {/* Example Snippet */}
              <div className="pt-3 border-t border-slate-800/80 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  대표 예시
                </span>
                {item.examples && item.examples.length > 0 ? (
                  <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 text-xs space-y-1">
                    <p className="font-semibold text-sky-300 flex items-center justify-between">
                      <span>"{item.examples[0].en}"</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400 transition-colors" />
                    </p>
                    <p className="text-[11px] text-slate-400">
                      → {item.examples[0].kr}
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">"{item.example}"</p>
                )}

                {/* Phrasal Verbs Preview */}
                {item.phrasalVerbs && item.phrasalVerbs.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {item.phrasalVerbs.slice(0, 2).map((pv, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700">
                        {pv}
                      </span>
                    ))}
                    {item.phrasalVerbs.length > 2 && (
                      <span className="text-[10px] text-slate-500 px-1 py-0.5">
                        +{item.phrasalVerbs.length - 2} 더보기
                      </span>
                    )}
                  </div>
                )}

                {/* Dictionary Quick-Link Buttons (Card Grid) */}
                <div className="flex flex-wrap gap-1 pt-2 border-t border-slate-800/60 mt-1">
                  <span className="text-[10px] text-slate-500 font-bold w-full uppercase tracking-wider mb-0.5">📖 더 많은 예문 보기</span>
                  {getDictionaryLinks(item.word).map((dict) => (
                    <a
                      key={dict.shortName}
                      href={dict.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md border transition-colors ${dict.color}`}
                      title={`${dict.name}에서 '${item.word}' 예문 더보기`}
                    >
                      <span>{dict.flag}</span>
                      <span>{dict.shortName}</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty Search State */}
      {!showNuancesOnly && filteredPrepositions.length === 0 && (
        <div className="glass-panel p-12 text-center space-y-4 max-w-md mx-auto">
          <HelpCircle className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">검색 결과가 없습니다</h3>
          <p className="text-xs text-slate-400">
            검색어 "<span className="text-amber-400">{searchTerm}</span>"에 해당하는 전치사를 찾지 못했습니다. 카테고리를 '전체보기'로 변경하거나 다른 검색어를 입력해 보세요.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="btn-secondary text-xs"
          >
            검색 초기화
          </button>
        </div>
      )}

      {/* DETAIL MODAL FOR CLICKED PREPOSITION */}
      {selectedPreposition && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="glass-panel max-w-2xl w-full p-6 sm:p-8 space-y-6 border-indigo-500/40 relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedPreposition(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-4">
              <span className="text-4xl p-3 bg-slate-900 rounded-2xl border border-slate-800">
                {selectedPreposition.visualIcon}
              </span>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-3xl font-extrabold text-white font-brand">
                    {selectedPreposition.word}
                  </h3>
                  <button
                    onClick={() => handleSpeak(selectedPreposition.word)}
                    className="p-2 rounded-lg bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/40 transition-all"
                    title="원어민 발음 듣기"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border inline-block mt-1 ${getCategoryBadgeClass(selectedPreposition.category)}`}>
                  {selectedPreposition.categoryLabel}
                </span>
              </div>
            </div>

            {/* Arrow English Visual Concept */}
            <div className="bg-gradient-to-r from-indigo-900/40 to-sky-900/40 p-4 rounded-xl border border-indigo-500/30 space-y-2">
              <span className="text-xs font-extrabold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-indigo-400" />
                <span>애로우 잉글리시 시각적 핵심 이미지</span>
              </span>
              <p className="text-base font-bold text-white">
                "{selectedPreposition.arrowMeaning}"
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedPreposition.coreConcept}
              </p>
            </div>

            {/* Examples Breakdown */}
            <div className="space-y-3">
              <h4 className="text-sm font-extrabold text-slate-200 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-sky-400" />
                <span>실전 문장과 애로우 순차 해설</span>
              </h4>

              <div className="space-y-2">
                {selectedPreposition.examples ? (
                  selectedPreposition.examples.map((ex, idx) => (
                    <div key={idx} className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-sky-300 font-brand">
                          {ex.en}
                        </p>
                        <button
                          onClick={() => handleSpeak(ex.en)}
                          className="text-slate-400 hover:text-sky-300 p-1"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-amber-300 font-medium leading-relaxed">
                        → {ex.kr}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                    <p className="text-sm font-bold text-sky-300 font-brand">
                      {selectedPreposition.example}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* High Frequency Phrasal Verbs / Idioms */}
            {selectedPreposition.phrasalVerbs && selectedPreposition.phrasalVerbs.length > 0 && (
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-extrabold text-slate-200 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-400" />
                  <span>빈출 구동사 및 필수 숙어 팁</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPreposition.phrasalVerbs.map((pv, pIdx) => (
                    <span
                      key={pIdx}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-200 text-xs font-semibold"
                    >
                      🔥 {pv}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Dictionary Deep-Link Section */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <h4 className="text-xs font-extrabold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>📖 더 많은 예문 & 발음 — 글로벌 사전 바로가기</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {getDictionaryLinks(selectedPreposition.word).map((dict) => (
                  <a
                    key={dict.shortName}
                    href={dict.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-bold transition-all ${dict.color}`}
                    title={`${dict.name}에서 '${selectedPreposition.word}' 전치사 예문 더보기`}
                  >
                    <span className="text-xl">{dict.flag}</span>
                    <span className="text-center leading-tight">{dict.name}</span>
                    <span className="flex items-center gap-1 text-[10px] opacity-70">
                      <ExternalLink className="w-2.5 h-2.5" />
                      <span>새 탭으로 열기</span>
                    </span>
                  </a>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                💡 <strong className="text-slate-400">Cambridge</strong>는 영영 + 다양한 구어체 예문, <strong className="text-slate-400">네이버</strong>는 한국어 해석 병기, <strong className="text-slate-400">Merriam-Webster</strong>는 미국 구어 예문, <strong className="text-slate-400">Oxford Learner's</strong>는 수능/공인시험 빈출 예문 중심으로 추천합니다.
              </p>
            </div>

            {/* Bottom Modal Actions */}
            <div className="flex justify-end">
              <button
                onClick={() => setSelectedPreposition(null)}
                className="btn-primary text-xs"
              >
                확인 및 닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
