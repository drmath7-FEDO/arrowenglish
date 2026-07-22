// src/components/ArrowTranslator.jsx
import React, { useState, useEffect } from 'react';
import { PRESET_SENTENCES, parseArrowKoreanLocal, translateWithGemini } from '../services/arrowEngine';
import { ArrowRight, Volume2, Sparkles, RefreshCw, Info, CheckCircle2, Compass, Layers } from 'lucide-react';

export function ArrowTranslator({ apiKey }) {
  const [inputSentence, setInputSentence] = useState(PRESET_SENTENCES[0].arrowKorean);
  const [selectedPresetId, setSelectedPresetId] = useState(PRESET_SENTENCES[0].id);
  const [result, setResult] = useState(PRESET_SENTENCES[0]);
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  // Run conversion
  const handleConvert = async (textToConvert = inputSentence) => {
    if (!textToConvert.trim()) return;
    setLoading(true);

    try {
      if (apiKey) {
        const aiResult = await translateWithGemini(textToConvert, apiKey);
        setResult(aiResult);
      } else {
        const localResult = parseArrowKoreanLocal(textToConvert);
        setResult(localResult);
      }
    } catch (e) {
      console.error(e);
      setResult(parseArrowKoreanLocal(textToConvert));
    } finally {
      setLoading(false);
    }
  };

  // Preset click handler
  const handlePresetSelect = (preset) => {
    setSelectedPresetId(preset.id);
    setInputSentence(preset.arrowKorean);
    setResult(preset);
  };

  // Text-to-speech audio player
  const handleSpeak = (text) => {
    if (!('speechSynthesis' in window)) {
      alert('이 브라우저는 음성 합성을 지원하지 않습니다.');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8 animate-fade-in">
      {/* Hero Header Banner */}
      <section className="glass-panel p-8 text-center relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-4">
          <Compass className="w-3.5 h-3.5" />
          <span>애로우 잉글리시 (Arrow English) 핵심 원리 엔진</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
          뇌 구조를 <span className="gradient-text">영문의 순서 그대로</span> 다듬으세요
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          거꾸로 되돌아가지 않고, <strong className="text-slate-200 font-semibold">주인공(주어) ➔ 동작 ➔ 가까운 대상 ➔ 전치사 ➔ 장소 ➔ 시간</strong> 순서로 뻗어나가는 직관적 영어 번역 및 원리 시각화 시스템입니다.
        </p>
      </section>

      {/* Preset Sentence Pills (User Provided 9 Examples) */}
      <section className="glass-panel p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-300">
            <Layers className="w-4 h-4 text-sky-400" />
            <span>연습 예문 9가지 (1-클릭 테스트)</span>
          </div>
          <span className="text-xs text-slate-400">클릭하면 즉시 변환 해설이 표시됩니다</span>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {PRESET_SENTENCES.map((preset, idx) => (
            <button
              key={preset.id}
              onClick={() => handlePresetSelect(preset)}
              className={`preset-pill ${selectedPresetId === preset.id ? 'active' : ''}`}
            >
              <span className="font-semibold text-xs opacity-75 mr-1.5">#{idx + 1}</span>
              {preset.arrowKorean}
            </button>
          ))}
        </div>
      </section>

      {/* Input Box & Converter Action */}
      <section className="glass-panel p-6 space-y-4">
        <label className="block text-sm font-bold text-slate-200">
          애로우 잉글리시 어순(한글/전치사 조합) 입력
        </label>

        <div className="relative">
          <textarea
            value={inputSentence}
            onChange={(e) => {
              setInputSentence(e.target.value);
              setSelectedPresetId(null);
            }}
            placeholder="예: 나는 가고있다 to집에 on 내차를타고 비가 내린다 above 내차위로"
            className="w-full h-28 p-4 rounded-xl bg-slate-900/80 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-base leading-relaxed resize-none transition-all"
          />

          <div className="absolute right-3 bottom-3 flex items-center gap-2">
            <button
              onClick={() => handleConvert()}
              disabled={loading || !inputSentence.trim()}
              className="btn-primary"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>분석 중...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>영어 변환 & AI 해설</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Translation & Visual Breakdown Result Area */}
      {result && (
        <div className="space-y-8 animate-fade-in">
          {/* 1. Exact English Sentence Output */}
          <section className="glass-panel p-8 relative overflow-hidden border-indigo-500/30">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  Exact Natural English
                </span>
                <h3 className="text-xl sm:text-3xl font-extrabold text-white mt-2 font-brand leading-snug">
                  "{result.english}"
                </h3>
              </div>

              <button
                onClick={() => handleSpeak(result.english)}
                className={`btn-secondary gap-2 transition-all ${speaking ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500' : ''}`}
                title="영문 발음 듣기"
              >
                <Volume2 className={`w-5 h-5 ${speaking ? 'animate-bounce text-indigo-400' : 'text-slate-400'}`} />
                <span className="font-semibold">{speaking ? '재생 중...' : '발음 듣기'}</span>
              </button>
            </div>

            {/* Visual Arrow Sequence Cards */}
            <div className="pt-4 border-t border-slate-800">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-indigo-400" />
                <span>화살표 어순 매핑 (Arrow Flow Sequence)</span>
              </h4>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {result.chunks.map((chunk, index) => (
                  <React.Fragment key={index}>
                    <div className="flex flex-col gap-1 p-3 rounded-xl bg-slate-900/90 border border-slate-800 shadow-sm min-w-[130px]">
                      <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                        {chunk.role}
                      </span>
                      <span className="text-sm font-bold text-slate-100">{chunk.text}</span>
                      <span className="text-xs font-semibold text-sky-400 font-brand">➔ {chunk.english}</span>
                    </div>

                    {index < result.chunks.length - 1 && (
                      <ArrowRight className="w-5 h-5 text-indigo-400/80 shrink-0 arrow-pulse hidden sm:block" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </section>

          {/* 2. Arrow English Principles & Physical Eye-Movement Explanation */}
          <section className="glass-panel p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  애로우 잉글리시 시선 이동 원리 해설
                </h3>
                <p className="text-xs text-slate-400">
                  영어를 번역하지 않고 뇌에서 영상으로 곧바로 그려내는 훈련 해설
                </p>
              </div>
            </div>

            <div className="bg-slate-900/60 rounded-xl p-6 border border-slate-800/80 space-y-3">
              {result.explanation.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-slate-200 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                  <div dangerouslySetInnerHTML={{ __html: step.replace(/\*\*(.*?)\*\*/g, '<strong className="text-sky-300 font-semibold">$1</strong>') }} />
                </div>
              ))}
            </div>
          </section>

          {/* 3. Preposition Visual Map for this sentence */}
          {result.prepositions && result.prepositions.length > 0 && (
            <section className="glass-panel p-8 space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-400" />
                <span>문장 속 핵심 전치사 그림 개념 (Visual Preposition)</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.prepositions.map((prep, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-amber-400 font-brand">{prep.word}</span>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        {prep.meaning}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{prep.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
