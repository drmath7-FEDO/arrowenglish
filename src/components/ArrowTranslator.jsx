// src/components/ArrowTranslator.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Volume2, Sparkles, RefreshCw, Info, CheckCircle2, Compass, Layers, ExternalLink, Image as ImageIcon, Sparkle, Edit3, Edit2, BookOpen, Bookmark, BookmarkCheck } from 'lucide-react';
import { saveToVault, isItemSaved, subscribeToVaultChanges } from '../services/vaultService';
import { getEducationalGoogleImageSearchUrl } from '../services/imageSearchService';
import { getHomonymSuggestions } from '../services/homonymService';
import { getNativeRecommendations, getVocabNuances } from '../services/recommendationService';
import { buildUpdatedTranslationResult } from '../services/resultService';
import { speakEnglishText } from '../services/speechService';
import { convertArrowKorean, PRESET_SENTENCES } from '../services/translationService';

export function ArrowTranslator({ apiKey, onResultChange, onOpenSettings }) {
  const [inputSentence, setInputSentence] = useState(PRESET_SENTENCES[0].arrowKorean);
  const [selectedPresetId, setSelectedPresetId] = useState(PRESET_SENTENCES[0].id);
  const [result, setResult] = useState(PRESET_SENTENCES[0]);
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSavedInVault, setIsSavedInVault] = useState(false);
  const [vaultToastMsg, setVaultToastMsg] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const recommendations = useMemo(() => (result ? getNativeRecommendations(result) : []), [result]);
  const vocabNuances = useMemo(() => (result ? getVocabNuances(result) : []), [result]);
  const vocabCards = useMemo(() => {
    if (!result) return [];

    return result.vocabCards || result.chunks.map((chunk) => ({
      korean: chunk.text,
      english: chunk.english,
      role: chunk.role,
      searchUrl: getEducationalGoogleImageSearchUrl(chunk.english)
    }));
  }, [result]);

  // Sync result to parent & check vault status
  useEffect(() => {
    if (!result) return undefined;

    if (onResultChange) onResultChange(result);
    setIsSavedInVault(isItemSaved(result));

    return subscribeToVaultChanges(() => {
      setIsSavedInVault(isItemSaved(result));
    });
  }, [result, onResultChange]);

  const handleToggleVault = async () => {
    if (!result) return;
    const res = await saveToVault(result);
    setIsSavedInVault(res.isSaved);
    if (res.isSaved) {
      setVaultToastMsg('✨ [학습자료실]에 성공적으로 보관되었습니다! 언제든지 되돌아보며 복습하실 수 있습니다.');
      setTimeout(() => setVaultToastMsg(''), 3500);
    } else {
      setVaultToastMsg('🗑️ [학습자료실]에서 보관 해제되었습니다.');
      setTimeout(() => setVaultToastMsg(''), 3500);
    }
  };

  // Handler for quick word edit / homonym override
  const handleUpdateChunkEnglish = (chunkIdx, newEnWord) => {
    const nextResult = buildUpdatedTranslationResult(result, chunkIdx, newEnWord);
    setResult(nextResult);
    if (onResultChange) onResultChange(nextResult);
  };

  // Run conversion
  const handleConvert = async (textToConvert = inputSentence) => {
    if (!textToConvert.trim()) return;
    setLoading(true);
    setErrorMessage('');

    try {
      const nextResult = await convertArrowKorean(textToConvert, apiKey);
      setResult(nextResult);
      if (onResultChange) onResultChange(nextResult);
    } catch (e) {
      console.error(e);
      setResult(null);
      if (onResultChange) onResultChange(null);
      setErrorMessage(e.message || 'Gemini API 키가 작동하지 않거나 변환 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // Preset click handler
  const handlePresetSelect = (preset) => {
    setSelectedPresetId(preset.id);
    setInputSentence(preset.arrowKorean);
    setResult(preset);
    setErrorMessage('');
    if (onResultChange) onResultChange(preset);
  };

  // Text-to-speech audio player
  const handleSpeak = (text) => {
    const didSpeak = speakEnglishText(text, {
      onStart: () => setSpeaking(true),
      onEnd: () => setSpeaking(false),
      onError: () => setSpeaking(false)
    });

    if (!didSpeak) {
      alert('이 브라우저는 음성 합성을 지원하지 않습니다.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8 animate-fade-in">
      {/* Hero Header Banner */}
      <section className="glass-panel p-8 text-center relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-4">
          <Compass className="w-4 h-4 text-indigo-400" />
          <span>애로우 잉글리시 (Arrow English) 직관 원리 시각화 시스템</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
          뇌 구조를 <span className="gradient-text">영문의 순서 그대로</span> 다듬으세요
        </h2>
        <p className="text-slate-300 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed mb-6">
          거꾸로 되돌아가지 않고, <strong className="text-amber-300 font-semibold">주인공(주어) ➔ 동작 ➔ 가까운 대상 ➔ 전치사 ➔ 장소 ➔ 시간</strong> 순서로 뻗어나가는 직관적 영어 번역 및 초등 안심 비주얼 학습 시스템입니다.
        </p>

        {/* 🚀 6단계 영어식 어순 뻗어나가기 안내 띠 (6-Step Sequence Visual Bar) */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-indigo-500/30 max-w-4xl mx-auto text-xs">
          <span className="text-[11px] font-extrabold text-amber-400 uppercase tracking-wider block mb-2">
            🎯 원어민 뇌속 화살표 카메라 뻗어나가기 순서 (6단계)
          </span>
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/40">1. 주인공(주어)</span>
            <span className="text-slate-500 font-bold">➔</span>
            <span className="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 font-bold border border-blue-500/40">2. 동작</span>
            <span className="text-slate-500 font-bold">➔</span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">3. 가까운 대상</span>
            <span className="text-slate-500 font-bold">➔</span>
            <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">4. 전치사</span>
            <span className="text-slate-500 font-bold">➔</span>
            <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40">5. 장소</span>
            <span className="text-slate-500 font-bold">➔</span>
            <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 font-bold border border-purple-500/40">6. 시간</span>
          </div>
        </div>
      </section>

      {/* Preset Sentence Pills */}
      <section className="glass-panel p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-300">
            <Layers className="w-4 h-4 text-sky-400" />
            <span>연습 예문 9가지 (1-클릭 테스트)</span>
          </div>
          <span className="text-xs text-slate-400">클릭하면 즉시 어순 교정 & 이미지 학습이 표시됩니다</span>
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
        <div className="flex items-center justify-between">
          <label className="block text-sm font-bold text-slate-200">
            학습자 단어 배열 (한글/영단어/전치사) 입력
          </label>
          <span className="text-xs text-sky-400 font-medium">
            💡 초등생도 자유롭게 생각나는 단어를 순서대로 입력해보세요!
          </span>
        </div>

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
                  <span>영어식 어순 교정 & 단어 공부</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* API Key Error Warning Banner */}
      {errorMessage && (
        <section className="glass-panel p-6 border-rose-500/40 bg-rose-950/40 text-rose-200 space-y-4 animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div className="space-y-1.5 flex-1">
              <h4 className="text-base font-extrabold text-white flex items-center gap-2">
                <span>⚠️ AI 영어 변환 중단 (Gemini API 키 확인 필요)</span>
              </h4>
              <p className="text-xs sm:text-sm text-rose-200 leading-relaxed font-medium">
                {errorMessage.replace(/^(API_KEY_REQUIRED:|GEMINI_API_ERROR:)\s*/, '')}
              </p>
              <p className="text-xs text-rose-300/70 pt-0.5">
                ※ 어색한 1:1 직역 문장을 방지하기 위해 AI 번역 작동이 안 될 경우 변환 프로세스를 중단합니다.
              </p>

              {onOpenSettings && (
                <div className="pt-2">
                  <button
                    onClick={onOpenSettings}
                    className="btn-primary bg-rose-600 hover:bg-rose-500 text-white text-xs gap-1.5 font-bold shadow-lg"
                  >
                    <span>⚙️ Google Gemini API 키 설정하기</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Translation & Visual Breakdown Result Area */}
      {result && (
        <div className="space-y-8 animate-fade-in">
          {/* 🌟 1. Exact English Sentence & Arrow Flow Mapping */}
          <section className="glass-panel p-8 relative overflow-hidden border-indigo-500/30 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                Exact Natural Standard English
              </span>

              <div className="flex items-center gap-2 flex-wrap">
                {/* Save to Study Vault Button */}
                <button
                  onClick={handleToggleVault}
                  className={`btn-secondary text-xs gap-1.5 transition-all ${
                    isSavedInVault
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                      : 'hover:border-indigo-500/50 text-slate-300'
                  }`}
                  title={isSavedInVault ? '학습자료실에 보관됨' : '나만의 학습자료실에 보관하여 복습하기'}
                >
                  {isSavedInVault ? (
                    <>
                      <BookmarkCheck className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span>⭐ 학습자료실에 보관됨</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-4 h-4 text-slate-400" />
                      <span>⭐ 학습자료실에 보관</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleSpeak(result.english)}
                  className={`btn-secondary text-xs gap-1.5 transition-all ${speaking ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500' : ''}`}
                  title="영문 발음 듣기"
                >
                  <Volume2 className={`w-3.5 h-3.5 ${speaking ? 'animate-bounce text-indigo-400' : 'text-slate-400'}`} />
                  <span className="font-semibold">{speaking ? '재생 중...' : '원어민 발음 듣기'}</span>
                </button>
              </div>
            </div>

            {/* Toast popup */}
            {vaultToastMsg && (
              <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-200 text-xs font-bold flex items-center gap-2 animate-bounce">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{vaultToastMsg}</span>
              </div>
            )}

            <h3 className="text-xl sm:text-3xl font-extrabold text-white font-brand leading-snug">
              "{result.english}"
            </h3>

            {/* Visual Arrow Sequence Cards with Quick Word Edit Mode */}
            <div className="pt-4 border-t border-slate-800 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-indigo-400" />
                  <span>6단계 화살표 어순 매핑 (Arrow Flow Sequence)</span>
                </h4>

                <button
                  onClick={() => setIsEditMode(!isEditMode)}
                  className={`btn-secondary text-xs gap-1.5 transition-all ${isEditMode ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold' : ''}`}
                  title="단어 영문 교체 및 동음이의어(다리=bridge/legs 등) 수정 모드"
                >
                  <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isEditMode ? '✏️ 수정 완료 (Done)' : '✏️ 단어/뉘앙스 수정 모드'}</span>
                </button>
              </div>

              {isEditMode && (
                <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200 leading-relaxed flex items-center gap-2 animate-fade-in">
                  <Sparkle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    💡 <strong>가벼운 수정 모드 활성화:</strong> 각 단어 조각의 영문 입력 상자를 클릭하여 원하는 단어로 바꾸거나, 추천 버튼(🌉 bridge / 🦵 legs 등)을 누르면 전체 문장, 발음, 이미지 단어장이 실시간으로 즉시 반영됩니다.
                  </span>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {result.chunks.map((chunk, index) => {
                  const suggestions = getHomonymSuggestions(chunk.text, chunk.english);

                  return (
                    <React.Fragment key={index}>
                      <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 shadow-sm min-w-[140px] transition-all">
                        <span className="text-[11px] font-medium text-slate-400 flex items-center justify-between gap-1">
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                            {chunk.role}
                          </span>
                          {!isEditMode && (
                            <button
                              onClick={() => setIsEditMode(true)}
                              className="text-slate-500 hover:text-amber-300 text-[10px]"
                              title="단어 수정"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                          )}
                        </span>

                        <span className="text-sm font-bold text-slate-100">{chunk.text}</span>

                        {isEditMode ? (
                          <div className="space-y-1.5 pt-1">
                            <div className="flex items-center gap-1">
                              <span className="text-xs font-bold text-sky-400">➔</span>
                              <input
                                type="text"
                                value={chunk.english}
                                onChange={(e) => handleUpdateChunkEnglish(index, e.target.value)}
                                className="w-full px-2 py-1 rounded bg-slate-950 border border-indigo-500/60 text-xs font-bold text-sky-200 focus:outline-none focus:border-amber-400"
                                placeholder="영단어 입력"
                              />
                            </div>

                            {/* Candidate chips (e.g. bridge vs legs) */}
                            {suggestions.length > 0 && (
                              <div className="flex flex-wrap gap-1 pt-0.5">
                                {suggestions.map((sug, sIdx) => {
                                  const isSelected = chunk.english.toLowerCase().trim() === sug.toLowerCase().trim();
                                  let label = sug;
                                  if (sug.includes('bridge')) label = '🌉 ' + sug;
                                  else if (sug.includes('leg')) label = '🦵 ' + sug;
                                  else if (sug.includes('house')) label = '🏠 ' + sug;
                                  else if (sug.includes('boat')) label = '⛵ ' + sug;

                                  return (
                                    <button
                                      key={sIdx}
                                      onClick={() => handleUpdateChunkEnglish(index, sug)}
                                      className={`text-[10px] px-2 py-0.5 rounded-full border transition-all ${
                                        isSelected
                                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold'
                                          : 'bg-slate-950/80 text-slate-400 border-slate-800 hover:text-amber-300 hover:border-amber-400'
                                      }`}
                                    >
                                      {label}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-sky-400 font-brand">➔ {chunk.english}</span>
                            {suggestions.length > 0 && (
                              <button
                                onClick={() => setIsEditMode(true)}
                                className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 hover:bg-amber-500/20"
                                title="다른 다의어/뜻으로 교체"
                              >
                                {chunk.english.includes('leg') ? '🌉 bridge로 수정' : '🔄 뜻 수정'}
                              </button>
                            )}
                          </div>
                        )}
                      </div>

                      {index < result.chunks.length - 1 && (
                        <ArrowRight className="w-5 h-5 text-indigo-400/80 shrink-0 arrow-pulse hidden sm:block" />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Sentence Breakdown Card */}
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3 text-xs">
                <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 font-sans">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Sentence Breakdown (문장 구조 & 의미 조각 상세 분석)</span>
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-200">
                  {result.chunks.map((c, cIdx) => (
                    <div key={cIdx} className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-2">
                      <span className="font-extrabold text-sky-300 font-brand text-xs">{c.english}</span>
                      <span className="text-slate-400 text-xs font-medium">: {c.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 🌟 2. 💡 상황별 원어민 추천 표현 (Native Speaker Recommendations) */}
          {recommendations.length > 0 && (
            <section className="glass-panel p-8 space-y-6 border-sky-500/40 bg-slate-900/90 relative overflow-hidden shadow-2xl">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 font-bold shrink-0">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <span>💡 상황별 원어민 추천 표현 (Native Speaker Recommendations)</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                      {recommendations.length > 1 ? `추천 ${recommendations.length}종 세트` : '직관적 표준 표현'}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-300">
                    {recommendations.length > 1
                      ? '학습자님의 입력 상황에 맞춰 가장 자연스러운 원어민 구어체·뉘앙스별 추천 표현을 정통 정리해 드립니다.'
                      : '원어민이 일상에서 가장 직관적이고 정확하게 사용하는 표준 구어체 표현입니다.'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {recommendations.map((rec, rIdx) => {
                  const badgeColors = [
                    'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
                    'bg-sky-500/10 text-sky-300 border-sky-500/30',
                    'bg-purple-500/10 text-purple-300 border-purple-500/30'
                  ];
                  const borderColors = [
                    'hover:border-emerald-500/50',
                    'hover:border-sky-500/50',
                    'hover:border-purple-500/50'
                  ];

                  return (
                    <div key={rIdx} className={`p-5 rounded-2xl bg-slate-950/90 border border-slate-800 ${borderColors[rIdx % 3]} transition-all space-y-2.5 shadow-lg group`}>
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className={`text-xs font-bold px-3 py-1 rounded-lg border ${badgeColors[rIdx % 3]}`}>
                          {rec.label}
                        </span>
                        <button
                          onClick={() => handleSpeak(rec.english)}
                          className="btn-secondary text-xs gap-1.5 opacity-90 group-hover:opacity-100"
                          title="이 추천 표현 발음 듣기"
                        >
                          <Volume2 className="w-3.5 h-3.5 text-sky-400" />
                          <span>원어민 발음 듣기</span>
                        </button>
                      </div>

                      <h4 className="text-base sm:text-lg font-extrabold text-white font-brand leading-snug select-all group-hover:text-amber-200 transition-colors pt-1">
                        "{rec.english}"
                      </h4>

                      <p className="text-xs sm:text-sm text-slate-300 font-medium">
                        ({rec.korean})
                      </p>

                      {rec.keyChange && (
                        <div className="pt-1">
                          <span className="text-[11px] font-semibold text-amber-300/90 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20 inline-block">
                            {rec.keyChange}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* 🌟 3. [요구사항 ㄱ] 학습자 입력 어순 vs 올바른 영어식 사고 순서 재배열 섹션 */}
          <section className="glass-panel p-8 space-y-6 border-sky-500/30 bg-slate-900/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>학습자 입력 어순 ➔ 영어식 사고 순서 재배열</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-normal">어순 교정</span>
                </h3>
                <p className="text-xs text-slate-300">
                  학습자님이 쏟아 놓은 배열을 거꾸로 번역하지 않는 영문의 시선 순서로 올바르게 다듬었습니다.
                </p>
              </div>
            </div>

            {/* 어순 비교 2D 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 내 입력 어순 */}
              <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block">
                  📝 학습자가 입력한 단어 배열 (Original Input)
                </span>
                <p className="text-sm font-semibold text-amber-100 font-mono">
                  "{result.arrowKorean}"
                </p>
                <p className="text-xs text-slate-400 pt-1">
                  💡 전치사가 어색하거나 한국어식 순서가 섞여 있을 수 있습니다.
                </p>
              </div>

              {/* 올바른 애로우 잉글리시 어순 */}
              <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                  ✨ 올바른 영어식 사고 순서 (Arrow English Brain Order)
                </span>
                <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold text-emerald-200 pt-1">
                  {result.chunks.map((c, idx) => (
                    <span key={idx} className="px-2 py-1 rounded bg-emerald-500/20 border border-emerald-500/30">
                      {c.text} ({c.english})
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 초등 눈높이 어순 교정 해설 */}
            <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2 text-xs">
              <strong className="text-amber-300 font-bold block flex items-center gap-1.5">
                <Sparkle className="w-4 h-4 text-amber-400" />
                <span>👶 초등 눈높이 어순 이해 가이드: 왜 순서를 바꿔야 할까요?</span>
              </strong>
              <p className="text-slate-300 leading-relaxed">
                한국어는 <strong className="text-amber-200">"어디서(장소)"</strong>나 <strong className="text-amber-200">"어떻게(방법)"</strong>가 먼저 나오지만, 영어식 뇌는 주인공이 출발해서 <strong className="text-sky-300">손과 시선이 닿는 동작과 가까운 대상부터</strong> 먼저 떠올립니다! 그래서 <strong className="text-emerald-300">주인공 ➔ 동작 ➔ 대상 ➔ 전치사 ➔ 장소 ➔ 시간</strong> 순서로 말하면 머릿속에서 되돌아가서 번역할 필요가 전혀 없어집니다.
              </p>
            </div>
          </section>

          {/* 🌟 3. 한글-영어 실생활 이미지 단어장 */}
          <section className="glass-panel p-8 space-y-6 border-indigo-500/30">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>🎨 1:1 한글-영어 실생활 이미지 단어장</span>
                  </h3>
                  <p className="text-xs text-slate-300">
                    실제 수업 방식처럼 해당 영단어(English Word)의 실생활 사물·장면 이미지를 구글 안심 검색으로 연동합니다.
                  </p>
                </div>
              </div>

              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                🔒 Google SafeSearch Active (실생활 안심 이미지)
              </span>
            </div>

            {/* Vocab Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {vocabCards.map((card, idx) => (
                <a
                  key={idx}
                  href={card.searchUrl || getEducationalGoogleImageSearchUrl(card.english)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 hover:border-indigo-500 transition-all space-y-2 group shadow-md block"
                  title={`클릭하면 영단어 '${card.english}'의 실생활 구글 이미지가 열립니다`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                      {card.role || `조각 ${idx + 1}`}
                    </span>
                    <span className="text-xs text-sky-400 group-hover:text-sky-300 flex items-center gap-1 font-semibold">
                      <span>📷 영단어 실사 이미지</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <span className="text-xs text-slate-400 block font-medium">한글: {card.korean}</span>
                    <span className="text-sm font-extrabold text-white font-brand block group-hover:text-amber-300 transition-colors">
                      영어: {card.english}
                    </span>
                  </div>

                  <div className="pt-2 text-[11px] text-slate-500 group-hover:text-slate-400 flex items-center gap-1">
                    <ImageIcon className="w-3 h-3 text-emerald-400" />
                    <span>Google Image ('{card.english}' 실생활 연동)</span>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* 🌟 4. Arrow English Principles & Physical Eye-Movement Explanation */}
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
                  <div>
                    {step.split(/\*\*(.*?)\*\*/g).map((part, pIdx) =>
                      pIdx % 2 === 1
                        ? <strong key={pIdx} className="text-sky-300 font-semibold">{part}</strong>
                        : <span key={pIdx}>{part}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </section>

          {/* 🌟 5. Preposition Visual Map */}
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
                      <a
                        href={getEducationalGoogleImageSearchUrl(`preposition ${prep.word}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 border border-amber-500/20 flex items-center gap-1 transition-all"
                        title="전치사 교육용 이미지 보기"
                      >
                        <span>{prep.meaning}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{prep.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 🌟 6. AI Learner Expression Refinement & Native Coaching */}
          {result.correction && (
            <section className="glass-panel p-8 space-y-6 border-emerald-500/40 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500/30 to-sky-500/30 flex items-center justify-center text-emerald-300 border border-emerald-500/40 shadow-lg shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
                    <span>학습자 표현 다듬기 & 1:1 원어민 뉘앙스 완성 코칭</span>
                  </h3>
                  <p className="text-xs text-slate-300">
                    영어식 사고를 익혀가는 학습자님을 위해 뇌속 3D 그림 차이와 듣기·말하기 직관 팁으로 표현을 근사하게 업그레이드해 드립니다.
                  </p>
                </div>
              </div>

              {result.correction.coachGreeting && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/80 to-slate-900/90 border border-emerald-500/30 text-xs sm:text-sm text-emerald-200 leading-relaxed space-y-1">
                  <p className="font-medium">{result.correction.coachGreeting}</p>
                </div>
              )}

              {/* 💡 원어민 추천 표현 (Native Recommendation Variations) */}
              {recommendations.length > 0 && (
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/95 border border-sky-500/30 space-y-4 shadow-xl">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-sky-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>💡 상황별 원어민 추천 표현 다듬기 (Native Speaker Recommendations)</span>
                  </h4>

                  <div className="space-y-3">
                    {recommendations.map((rec, rIdx) => {
                      const badgeColors = [
                        'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
                        'bg-sky-500/10 text-sky-300 border-sky-500/30',
                        'bg-purple-500/10 text-purple-300 border-purple-500/30'
                      ];
                      return (
                        <div key={rIdx} className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-1.5 hover:border-sky-500/40 transition-colors">
                          <span className={`text-xs font-bold px-2.5 py-0.5 rounded border inline-block ${badgeColors[rIdx % 3]}`}>
                            {rec.label}
                          </span>
                          <p className="text-sm sm:text-base font-extrabold text-white font-brand select-all pt-0.5">"{rec.english}"</p>
                          <p className="text-xs text-slate-300 font-medium">({rec.korean})</p>
                          {rec.keyChange && (
                            <div className="pt-1">
                              <span className="text-[11px] font-semibold text-amber-300/90 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20 inline-block">
                                {rec.keyChange}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 🔍 주요 어휘 & 뉘앙스 정리 (Key Vocab & Nuances) */}
              {vocabNuances.length > 0 && (
                <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/95 border border-indigo-500/30 space-y-4 shadow-xl">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-400" />
                    <span>🔍 주요 어휘 & 원어민 뉘앙스 정리 (Key Vocab & Nuance Breakdown)</span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {vocabNuances.map((v, vIdx) => (
                      <div key={vIdx} className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-1 text-xs hover:border-indigo-500/40 transition-colors">
                        <span className="text-amber-300 font-bold block">📌 {v.korean}</span>
                        <span className="text-sky-300 font-extrabold font-brand block text-sm">{v.english}</span>
                        <p className="text-slate-300 text-[11px] pt-1 leading-relaxed">{v.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Point-by-Point Coaching */}
              {result.correction.points && result.correction.points.length > 0 && (
                <div className="space-y-4 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>5D 마스터클래스 심층 표현 업그레이드 (3D 이미지 · 직청직해 · 입근육 훈련)</span>
                  </h4>

                  <div className="space-y-4">
                    {result.correction.points.map((pt, pIdx) => (
                      <div key={pIdx} className="p-5 sm:p-6 rounded-2xl bg-slate-900/95 border border-slate-800 space-y-4 text-xs shadow-xl">
                        <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-800/80">
                          <span className="font-extrabold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/30 text-xs">
                            📌 {pt.category}
                          </span>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="line-through text-rose-400 opacity-80 bg-rose-500/10 px-2.5 py-1 rounded-md font-mono">{pt.original}</span>
                            <span className="text-slate-500 font-bold">➔</span>
                            <span className="text-emerald-300 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 font-brand text-sm">{pt.corrected}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {pt.imageDifference && (
                            <div className="p-3.5 rounded-xl bg-indigo-950/60 border border-indigo-500/30 text-indigo-200 leading-relaxed font-medium space-y-1">
                              <span className="font-bold text-indigo-300 block text-[11px]">🧠 1. 원어민 뇌속 3D 시각 이미지</span>
                              <p>{pt.imageDifference.replace(/🧠 뇌 속 그림 차이:\s*/, '').replace(/🧠 원어민 뇌속 3D 시각 이미지:\s*/, '')}</p>
                            </div>
                          )}

                          {pt.listeningTip && (
                            <div className="p-3.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-200 leading-relaxed font-medium space-y-1">
                              <span className="font-bold text-purple-300 block text-[11px]">🎧 2. 듣기(Listening) 직청직해 훈련</span>
                              <p>{pt.listeningTip.replace(/🎧 듣기\(Listening\) 직청직해 훈련:\s*/, '')}</p>
                            </div>
                          )}

                          {pt.speakingTip && (
                            <div className="p-3.5 rounded-xl bg-sky-950/60 border border-sky-500/30 text-sky-200 leading-relaxed font-medium space-y-1">
                              <span className="font-bold text-sky-300 block text-[11px]">🗣️ 3. 말하기(Speaking) 입근육 결합 패턴</span>
                              <p>{pt.speakingTip.replace(/🗣️ 말하기\(Speaking\) 입근육 결합 패턴:\s*/, '').replace(/🗣️ 듣기\/말하기 팁:\s*/, '')}</p>
                            </div>
                          )}

                          {pt.misconception && (
                            <div className="p-3.5 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-200 leading-relaxed font-medium space-y-1">
                              <span className="font-bold text-amber-300 block text-[11px]">🔄 4. ❌ vs ⭕ 한국어 직역 오해 vs 원어민 뉘앙스</span>
                              <p>{pt.misconception.replace(/🔄 ❌ vs ⭕ 한국어 직역 오해 vs 원어민 뉘앙스:\s*/, '')}</p>
                            </div>
                          )}
                        </div>

                        {pt.practiceExamples && pt.practiceExamples.length > 0 && (
                          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
                            <span className="font-bold text-emerald-400 block text-[11px] flex items-center gap-1.5">
                              💬 5. 실전 입소리 응용 예문 (따라 읽어 보세요!)
                            </span>
                            <ul className="space-y-1 text-slate-300 font-medium">
                              {pt.practiceExamples.map((ex, exIdx) => (
                                <li key={exIdx} className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                                  <span>{ex}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="text-slate-300 leading-relaxed pt-1 border-t border-slate-800/80">
                          <strong className="text-slate-200 block mb-0.5 font-bold text-[11px]">📖 선생님의 마스터클래스 해설:</strong>
                          <p>{pt.reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Rhythmic Speaking Practice */}
              {result.correction.rhythmChunks && result.correction.rhythmChunks.length > 0 && (
                <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-sky-400" />
                    <span>🗣️ 듣고 바로 뱉는 뇌 구조 순차 말하기 훈련 (Rhythmic Speaking Practice)</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    뒤로 되돌아가서 번역하지 말고, 아래 덩어리 순서대로 말하고 들으세요!
                  </p>

                  <div className="flex flex-wrap items-center gap-2">
                    {result.correction.rhythmChunks.map((rc, rIdx) => (
                      <div key={rIdx} className="p-2.5 px-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-0.5">
                        <span className="font-extrabold text-sky-300 font-brand block">{rc.en}</span>
                        <span className="text-[11px] text-slate-400 block">→ {rc.kr}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}
        </div>
      )}
    </div>
  );
}
