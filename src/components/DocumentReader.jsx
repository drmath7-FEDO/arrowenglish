import React, { useState } from 'react';
import { parseTextToParagraphs } from '../utils/textParser';
import { ArrowTranslator } from './ArrowTranslator';
import { BookOpen, X, FileText, Sparkles, Info } from 'lucide-react';

const SAMPLE_ARROW_KOREAN = `나는 떠났다. 대구에서, 아침식사 전에, 엄마와 함께.
우리는 갔다. 동대구역으로, 택시를 타고.
나는 섰다. 매표기 앞에, 유리벽을 통해, 내 앞에서.
기차는 왔다. 부산에서, 몇 분 동안 플랫폼에 멈추었다.
나는 앉았다. 창가 옆 좌석에, 우리에게서 멀어지는 도시를 보면서.
내 언니는 보냈다. 연세대 간호학과에서 공부하는, 나에게 메시지를. 우리 여행에 대해.
나는 기뻤다. 방학 동안 그녀와 함께 지낼 것이기 때문에.`;

export function DocumentReader({ apiKey, onOpenSettings }) {
  const [rawText, setRawText] = useState('');
  const [paragraphs, setParagraphs] = useState([]);
  const [isParsed, setIsParsed] = useState(false);
  const [activeSentence, setActiveSentence] = useState(null);

  const handleParse = () => {
    if (!rawText.trim()) return;
    const parsed = parseTextToParagraphs(rawText);
    setParagraphs(parsed);
    setIsParsed(true);
    setActiveSentence(null);
  };

  const handleLoadSample = () => {
    setRawText(SAMPLE_ARROW_KOREAN);
    const parsed = parseTextToParagraphs(SAMPLE_ARROW_KOREAN);
    setParagraphs(parsed);
    setIsParsed(true);
    setActiveSentence(null);
  };

  const handleReset = () => {
    setIsParsed(false);
    setParagraphs([]);
    setActiveSentence(null);
  };

  const handleSentenceClick = (sentence) => {
    setActiveSentence(sentence);
  };

  const closeBottomSheet = () => {
    setActiveSentence(null);
  };

  return (
    <div className="relative min-h-[calc(100vh-8rem)] pb-24">
      {/* Header Area */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <BookOpen className="text-sky-400" />
            독해 & 집중 분석 모드
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            영어식 어순 한글(또는 영어) 장문을 한 줄씩 문장 단위로 분리하여 집중 분석합니다.
          </p>
        </div>
        {isParsed && (
          <button 
            onClick={handleReset}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm transition-colors"
          >
            다른 글 입력하기
          </button>
        )}
      </div>

      {!isParsed ? (
        <div className="bg-slate-900/50 rounded-2xl border border-slate-800/60 p-6 shadow-xl backdrop-blur-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-slate-300 text-sm font-medium">
              💡 **영어식 어순 한글 텍스트**(예: <span className="text-sky-400">나는 떠났다. 대구에서, 엄마와 함께.</span>) 또는 **영문 일기/기사**를 붙여넣으세요.
            </p>
            <button
              onClick={handleLoadSample}
              className="px-3.5 py-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Sparkles size={14} />
              <span>Seoul Trip Diary 예시 불러오기</span>
            </button>
          </div>

          {/* ⚠️ 줄바꿈(Enter) 기준 문장 구분 안내 띠 */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs leading-relaxed flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300 font-semibold block mb-0.5">
                ⚠️ 입력 작성 필수 규칙 (줄바꿈 = 1개 문장 구분)
              </strong>
              <p className="text-slate-300">
                <strong className="text-amber-300">`Enter` 키(줄바꿈)</strong>를 누를 때마다 하나의 독립된 문장 단위로 분리됩니다.
                긴 문장을 작성하실 때는 문장 중간에 <span className="underline decoration-amber-400 font-medium">`Enter` 키를 치지 마시고 한 줄로 자연스럽게 이어 작성해 주세요!</span>
              </p>
            </div>
          </div>

          <textarea
            className="w-full h-96 bg-slate-950 text-slate-200 p-4 rounded-xl border border-slate-700/50 focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all resize-none font-sans text-base leading-relaxed"
            placeholder={`📌 입력 규칙: 1줄(Enter 줄바꿈) = 1개 문장 단위 변환
(※ 하나의 긴 문장을 쓸 때 문장 중간에서 Enter 키를 치지 마세요!)

예시 (영어식 어순 한글 일기):
나는 떠났다. 대구에서, 아침식사 전에, 엄마와 함께.
우리는 갔다. 동대구역으로, 택시를 타고.
나는 섰다. 매표기 앞에, 유리벽을 통해, 내 앞에서.
기차는 왔다. 부산에서, 몇 분 동안 플랫폼에 멈추었다.`}
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
          />

          <div className="flex justify-end gap-3">
            <button
              onClick={handleParse}
              disabled={!rawText.trim()}
              className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white font-semibold rounded-xl shadow-lg shadow-sky-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              텍스트 분석 및 문장 분리 시작
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900/50 rounded-2xl border border-slate-800/60 p-6 shadow-xl backdrop-blur-sm">
          <div className="mb-4 text-xs text-sky-400 font-medium flex items-center gap-1.5">
            <Info size={14} />
            <span>학습하고 싶은 문장을 터치(클릭)하면 하단에서 애로우 잉글리시 어순 변환 및 AI 분석 패널이 나타납니다.</span>
          </div>
          <div className="max-w-3xl mx-auto font-sans leading-relaxed text-slate-200 space-y-4 text-lg">
            {paragraphs.map((p) => (
              <div key={p.id} className="block">
                {p.sentences.map((s) => {
                  const isActive = activeSentence?.id === s.id;
                  return (
                    <div
                      key={s.id}
                      onClick={() => handleSentenceClick(s)}
                      className={`cursor-pointer transition-all duration-200 p-3 my-1.5 rounded-xl border ${
                        isActive 
                          ? 'bg-sky-500/20 text-sky-100 border-sky-400/60 shadow-lg shadow-sky-500/10 font-medium' 
                          : 'bg-slate-950/40 border-slate-800/60 hover:bg-slate-800/60 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      <span className="text-slate-500 text-xs font-mono mr-2">#{s.id.split('-')[1]}</span>
                      {s.text}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Sheet for ArrowTranslator */}
      <div 
        className={`fixed inset-x-0 bottom-0 z-50 bg-slate-950 border-t border-slate-700 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-in-out transform ${
          activeSentence ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ maxHeight: '85vh', overflowY: 'auto' }}
      >
        {activeSentence && (
          <div className="relative pt-6 pb-12 px-4 max-w-5xl mx-auto">
            <button 
              onClick={closeBottomSheet}
              className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-full transition-colors z-10"
              title="닫기"
            >
              <X size={20} />
            </button>
            <ArrowTranslator 
              apiKey={apiKey} 
              onOpenSettings={onOpenSettings}
              initialInput={activeSentence.text}
              hidePresets={true}
              hideHeader={true}
            />
          </div>
        )}
      </div>

      {/* Backdrop for bottom sheet */}
      {activeSentence && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm transition-opacity"
          onClick={closeBottomSheet}
        ></div>
      )}
    </div>
  );
}
