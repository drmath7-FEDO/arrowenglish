import React, { useEffect, useState } from 'react';
import { downloadMarkdown, exportToPDF } from '../services/exportService';
import { ArrowRight, BookOpen, Key, Sparkles, Sun, Moon, HelpCircle, FileText, Printer, FolderOpen } from 'lucide-react';
import { getVaultItems, subscribeToVaultChanges } from '../services/vaultService';

export function Navbar({ activeTab, setActiveTab, onOpenSettings, onOpenGuide, theme, toggleTheme, currentResult }) {
  const [vaultCount, setVaultCount] = useState(() => getVaultItems().length);

  useEffect(() => {
    setVaultCount(getVaultItems().length);

    return subscribeToVaultChanges((snapshot) => {
      setVaultCount(snapshot.items.length);
    });
  }, []);

  return (
    <header className="glass-panel sticky top-4 z-40 mx-4 my-4 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('translator')}>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-sky-400 to-emerald-400 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
            <ArrowRight className="w-5 h-5 text-sky-400 animate-pulse" />
          </div>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight gradient-text">
            Arrow English AI
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            영어를 들으면서 바로 이해하는 뇌 구조 혁신
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="flex items-center gap-2 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800">
        <button
          onClick={() => setActiveTab('translator')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'translator'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>어순 변환 & AI 해설</span>
        </button>

        <button
          onClick={() => setActiveTab('practice')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'practice'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>어순 연습실</span>
        </button>

        <button
          onClick={() => setActiveTab('dictionary')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'dictionary'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>전치사 지도</span>
        </button>

        <button
          onClick={() => setActiveTab('vault')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all relative ${
            activeTab === 'vault'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <FolderOpen className="w-4 h-4 text-amber-400" />
          <span>📚 학습자료실</span>
          {vaultCount > 0 && (
            <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 ml-0.5">
              {vaultCount}
            </span>
          )}
        </button>
      </nav>

      {/* Right Controls: Save Buttons (Top Line of Screen) + Settings & Theme */}
      <div className="flex items-center gap-2.5">
        {/* Top Line Export Buttons */}
        {currentResult && activeTab === 'translator' && (
          <div className="flex items-center gap-2 mr-2 bg-slate-900/90 p-1 rounded-xl border border-slate-800 shadow-inner">
            <button
              onClick={() => downloadMarkdown(currentResult)}
              className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-sm"
              title="디자인 없는 텍스트 마크다운(.md) 저장"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>MD 저장</span>
            </button>

            <button
              onClick={() => exportToPDF(currentResult)}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-md shadow-indigo-600/30"
              title="디자인 적용 PDF 리포트 저장"
            >
              <Printer className="w-3.5 h-3.5 text-amber-300" />
              <span>PDF 저장</span>
            </button>
          </div>
        )}

        <button
          onClick={onOpenGuide}
          className="btn-secondary text-xs bg-sky-500/10 border-sky-500/30 text-sky-300 hover:bg-sky-500/20"
          title="이용 가이드 & 필독 안내"
        >
          <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
          <span className="hidden sm:inline">이용 가이드</span>
        </button>

        <button
          onClick={onOpenSettings}
          className="btn-secondary text-xs"
          title="Gemini API 키 설정"
        >
          <Key className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">AI 키 설정</span>
        </button>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-700 transition-all"
          title="테마 전환"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-indigo-300" />}
        </button>
      </div>
    </header>
  );
}
